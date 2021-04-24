import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ApplyManageInfo } from 'models/apply-manage-info'
import { showNotify } from 'app/partials/pr-notify'
import moment from 'moment'
import { slugURL } from 'utils/helper'
import { DataStatusApply } from './candidate-manage-apply'

export interface TableColumn extends ApplyManageInfo {
  action?: string
}

export interface TableFilter {}

const renderStatusApply = (status?: string) => {
  const dataStatus = DataStatusApply.find((item) => item.status === status)
  return (
    <span
      className={`${dataStatus?.textColor} ${dataStatus?.bgColor} text-sm uppercase px-3 py-1.5 rounded font-semibold w-32 block text-center`}
    >
      {dataStatus?.title}
    </span>
  )
}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'jobId', title: 'Mã việc làm' },
  { enable: true, field: 'jobName', title: 'Tên việc làm' },
  { enable: true, field: 'cvName', title: 'Hồ sơ ứng tuyển' },
  { enable: true, field: 'status', title: 'Trạng thái' },
  { enable: true, field: 'createdAt', title: 'Ngày ứng tuyển' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/apply-manage`,
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

    const result: Pagination<ApplyManageInfo> = {
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

    const { cvId, jobId, jobName, status, createdAt, cvName, cvFullname } = data

    switch (field) {
      case 'jobId':
        return (
          <a
            href={`/jobs/${slugURL(jobName)}.${jobId}`}
            target="_blank"
            className="font-medium"
            rel="noopener noreferrer"
          >
            {jobId.slice(jobId.length - 5, jobId.length)}
          </a>
        )

      case 'jobName':
        return (
          <a
            href={`/jobs/${slugURL(jobName)}.${jobId}`}
            target="_blank"
            className="font-medium"
            rel="noopener noreferrer"
          >
            {jobName}
          </a>
        )

      case 'cvName':
        return (
          <a
            href={`/cv-public/${slugURL(cvFullname)}.${cvId}`}
            target="_blank"
            className="font-medium"
            rel="noopener noreferrer"
          >
            {cvFullname.toUpperCase()}
            <span className="block opacity-50">{cvName}</span>
          </a>
        )

      case 'status':
        return <>{renderStatusApply(status)}</>

      case 'createdAt':
        return <span>{moment(createdAt).format('DD/MM/YYYY')}</span>

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
