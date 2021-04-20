import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CandidateManageInfo } from '../../../../models/candidate-manage-info'
import { showNotify } from '../../../partials/pr-notify/pr-notify'
import moment from 'moment'

export interface TableColumn extends CandidateManageInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'candidateId', title: 'Mã ứng viên' },
  { enable: true, field: 'candidateFullname', title: 'Ứng viên' },
  { enable: true, field: 'jobId', title: 'Việc làm' },
  { enable: true, field: 'isDone', title: 'Trạng thái' },
  { enable: true, field: 'createdAt', title: 'Ngày duyệt ứng viên' },
  { enable: true, field: 'action', title: 'Cập nhật trạng thái' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/candidate-manage`,
  fetch: async (input) => {
    const accessToken = Cookies.get('token')
    const response = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      url: input.url,
      params: {
        page: input.page,
        size: input.size
      }
    })

    const { success, data, error } = response.data
    const { items, pagination } = data
    const { page, size, totalItems, totalPages } = pagination

    if (!success) {
      showNotify.error(error.message)
      throw Error(error.message)
    }

    const result: Pagination<CandidateManageInfo> = {
      data: items,
      pagination: {
        currentPage: page,
        perPage: size,
        totalItems,
        totalPages
      }
    }

    return result
  },
  render: (data, field) => {
    if (!data) {
      return <></>
    }

    const { cvId, candidateFullname, jobId, jobName, isDone, candidateId, createdAt } = data

    switch (field) {
      case 'candidateId':
        return <span>{candidateId.slice(candidateId.length - 5, candidateId.length)}</span>

      case 'candidateFullname':
        return <span>{candidateFullname}</span>

      case 'jobId':
        return <span>{jobName}</span>

      case 'isDone':
        return <span>{`${isDone}`}</span>

      case 'createdAt':
        return <span>{moment(createdAt).format('DD/MM/YYYY')}</span>

      case 'action':
        return <span>ducnh</span>

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
