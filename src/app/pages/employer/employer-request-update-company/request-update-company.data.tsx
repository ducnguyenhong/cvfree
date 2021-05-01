import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { BasicCompanyInfo, BasicUserInfo, DateTime, Status } from 'app/partials/table-columns'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { RequestUpdateCompanyInfo } from 'models/request-update-company-info'
import { Action } from './request-update-company.action'

export interface TableColumn extends RequestUpdateCompanyInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: '_id', title: 'ID' },
  { enable: true, field: 'userRequest', title: 'Người gửi yêu cầu' },
  { enable: true, field: 'content', title: 'Yêu cầu chỉnh sửa' },
  { enable: true, field: 'processStatus', title: 'Trạng thái xử lý' },
  { enable: true, field: 'createdAt', title: 'Ngày yêu cầu' },
  { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/request-update-company/one-company`,
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

    const result: Pagination<RequestUpdateCompanyInfo> = {
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

    const { userRequest, _id, createdAt, processStatus } = data

    switch (field) {
      case '_id':
        return <span className="font-medium">{_id ? _id.slice(_id.length - 5, _id.length) : ''}</span>

      case 'content':
        return (
          <a
            href={`/request-update-company/${_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 whitespace-nowrap font-medium px-4 py-2 rounded text-white duration-300 hover:bg-blue-600"
          >
            Xem yêu cầu
          </a>
        )

      case 'userRequest':
        return (
          <div>
            <span className="block font-semibold mb-0.5">{userRequest?.fullname}</span>
            <span className="block opacity-50 text-sm">{userRequest?.email}</span>
          </div>
        )

      case 'processStatus':
        return <span>{processStatus}</span>

      case 'createdAt':
        return <DateTime timestamp={createdAt} />

      case 'action':
        return <Action id={_id} processStatus={processStatus} />

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
