import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { showNotify } from 'app/partials/pr-notify'
import { Action } from './request-update-company.action'
import {
  BasicCompanyInfo,
  Email,
  Phone,
  DateTime,
  Status,
  Active,
  TableLink,
  BasicUserInfo
} from 'app/partials/table-columns'
import { RequestUpdateCompanyInfo } from 'models/request-update-company-info'

export interface TableColumn extends RequestUpdateCompanyInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: '_id', title: 'ID' },
  { enable: true, field: 'rootInfo', title: 'Công ty' },
  { enable: true, field: 'userRequest', title: 'Người gửi yêu cầu' },
  { enable: true, field: 'userAdmin', title: 'Admin của công ty' },
  { enable: true, field: 'content', title: 'Yêu cầu chỉnh sửa' },
  { enable: true, field: 'processStatus', title: 'Trạng thái xử lý' },
  { enable: true, field: 'status', title: 'Trạng thái' },
  { enable: true, field: 'createdAt', title: 'Ngày yêu cầu' },
  { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/request-update-company`,
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

    const { status, userRequest, userAdmin, rootInfo, _id, createdAt, processStatus } = data

    switch (field) {
      case '_id':
        return <span className="font-medium">{_id ? _id.slice(_id.length - 5, _id.length) : ''}</span>

      case 'content':
        return (
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 whitespace-nowrap font-medium px-4 py-2 rounded text-white duration-300 hover:bg-blue-600"
          >
            Xem yêu cầu
          </a>
        )

      case 'rootInfo':
        return <BasicCompanyInfo id={rootInfo?.id} logo={rootInfo?.logo} name={rootInfo?.name} />

      case 'userRequest':
        return (
          <BasicUserInfo
            id={userRequest?.id}
            avatar={userRequest?.avatar}
            name={userRequest?.fullname}
            username={userRequest?.email}
          />
        )

      case 'userAdmin':
        return (
          <BasicUserInfo
            id={userAdmin?.id}
            avatar={userAdmin?.avatar}
            name={userAdmin?.fullname}
            username={userAdmin?.email}
          />
        )

      case 'processStatus':
        return <span>{processStatus}</span>

      case 'status':
        return <Status status={status || ''} />

      case 'createdAt':
        return <DateTime timestamp={createdAt} />

      case 'action':
        return (
          <Action
            id={_id}
            status={status}
            emailRequest={userRequest?.email}
            emailTo={userAdmin?.email}
            helloName={userAdmin?.fullname}
            isLoginNow
          />
        )

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
