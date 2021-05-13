import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { BasicCompanyInfo, BasicUserInfo, DateTime, Status } from 'app/partials/table-columns'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { RequestUpdateCompanyInfo } from 'models/request-update-company-info'
import { Action } from './request-update-company.action'
import moment from 'moment'

export interface TableColumn extends RequestUpdateCompanyInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { field: '_id', title: 'ID' },
  { field: 'rootInfo', title: 'Công ty' },
  { field: 'userRequest', title: 'Người gửi yêu cầu' },
  { field: 'userAdmin', title: 'Admin của công ty' },
  { field: 'content', title: 'Yêu cầu chỉnh sửa' },
  { field: 'processStatus', title: 'Trạng thái xử lý' },
  { field: 'status', title: 'Trạng thái' },
  { field: 'createdAt', title: 'Ngày yêu cầu' },
  { field: 'expiredAt', title: 'Ngày hết hạn' },
  { field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  fetch: async (input) => {
    const accessToken = Cookies.get('token')
    const response = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      url: `${SERVER_URL}/request-update-company`,
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

    const { status, userRequest, userAdmin, rootInfo, _id, createdAt, processStatus, expiredAt } = data

    const renderExpiredAt = () => {
      if (!expiredAt) {
        return <></>
      }
      return moment(expiredAt).valueOf() > moment().valueOf() ? (
        <DateTime timestamp={expiredAt} />
      ) : (
        <span>Đã hết hạn</span>
      )
    }

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

      case 'expiredAt':
        return renderExpiredAt()

      case 'action':
        return (
          <Action
            id={_id}
            expiredAt={expiredAt}
            status={status}
            emailRequest={userRequest?.email}
            emailTo={userAdmin?.email}
            helloName={userAdmin?.fullname}
            isLoginNow
            employerRequestedId={userRequest?.id}
          />
        )

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
