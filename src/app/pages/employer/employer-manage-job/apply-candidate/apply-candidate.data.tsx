import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { BasicCvInfo, DateTime } from 'app/partials/table-columns'
import axios from 'axios'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CandidateInfo } from 'models/candidate-info'
import { slugURL } from 'utils/helper'
import { Action } from './apply-candidate.action'

export interface TableColumn extends CandidateInfo {
  appliedAt?: Date
  jobId?: string
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'cvId', title: 'Mã hồ sơ' },
  { enable: true, field: 'avatar', title: 'Thông tin ứng viên' },
  { enable: true, field: 'appliedAt', title: 'Ngày ứng tuyển' },
  { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: '',
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

    const result: Pagination<CandidateInfo> = {
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

    const { cvId, avatar, fullname, gender, appliedAt, jobId } = data

    switch (field) {
      case 'cvId':
        return (
          <a
            href={`/cv-public/${slugURL(fullname)}.${cvId}`}
            target="_blank"
            className="font-medium"
            rel="noopener noreferrer"
          >
            {cvId ? cvId.slice(cvId.length - 5, cvId.length) : ''}
          </a>
        )

      case 'avatar':
        return <BasicCvInfo id={cvId} avatar={avatar} fullname={fullname} gender={gender} />

      case 'appliedAt':
        return <DateTime timestamp={appliedAt} format="DD/MM/YYYY" />

      case 'action':
        return <Action cvId={cvId} name={fullname} jobId={jobId} />

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
