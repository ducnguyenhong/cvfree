import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { DateTime, Status, TableLink } from 'app/partials/table-columns'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { FeedbackInfo } from 'models/feedback-info'
import { Action } from './feedback.action'

export interface TableColumn extends FeedbackInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'id', title: 'ID' },
  { enable: true, field: 'fullname', title: 'Người gửi' },
  { enable: true, field: 'contact', title: 'Thông tin liên hệ' },
  { enable: true, field: 'content', title: 'Nội dung' },
  { enable: true, field: 'status', title: 'Trạng thái' },
  { enable: true, field: 'createdAt', title: 'Ngày tạo' },
  { enable: true, field: 'updatedAt', title: 'Ngày cập nhật' }
  // { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/feedbacks`,
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

    const result: Pagination<FeedbackInfo> = {
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

    const { status, id, _id, fullname, content, contact, createdAt, updatedAt } = data

    switch (field) {
      case 'id':
        return <TableLink to={`/dashboard/feedbacks/${_id}`} title={id} className="font-semibold" />

      case 'fullname':
        return <span className="whitespace-nowrap">{fullname}</span>

      case 'contact':
        return <span className="whitespace-nowrap">{contact}</span>

      case 'content':
        return <span>{content}</span>

      case 'status':
        return <Status status={status} />

      case 'createdAt':
        return <DateTime timestamp={createdAt} />

      case 'updatedAt':
        return <DateTime timestamp={updatedAt} />

      case 'action':
        return <Action id={id} status={status} />

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
