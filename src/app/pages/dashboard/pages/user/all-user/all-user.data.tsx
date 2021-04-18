import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { showNotify } from 'app/partials/pr-notify'
import moment from 'moment'
import { UserInfo } from 'models/user-info'

export interface TableColumn extends UserInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'id', title: 'ID' },
  { enable: true, field: 'fullname', title: 'Họ và tên' },
  { enable: true, field: 'birthday', title: 'Ngày sinh' },
  { enable: true, field: 'email', title: 'Email' },
  { enable: true, field: 'phone', title: 'Điện thoại' },
  { enable: true, field: 'type', title: 'Loại' },
  { enable: true, field: 'typeAccount', title: 'Loại tài khoản' },
  { enable: true, field: 'verify', title: 'Xác thực' },
  { enable: true, field: 'status', title: 'Trạng thái' },
  { enable: true, field: 'createdAt', title: 'Ngày tạo' },
  { enable: true, field: 'updatedAt', title: 'Ngày cập nhật' },
  { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/users`,
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
    const { items, page, size, totalItems, totalPages } = data

    if (!success) {
      showNotify.error(error.message)
      throw Error(error.message)
    }

    const result: Pagination<UserInfo> = {
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

    const {
      status,
      fullname,
      birthday,
      gender,
      email,
      phone,
      username,
      id,
      type,
      typeAccount,
      createdAt,
      updatedAt,
      verify,
      avatar
    } = data

    switch (field) {
      case 'id':
        return <span>{id}</span>

      case 'fullname':
        return <span>{fullname}</span>

      case 'birthday':
        return <span>{moment(birthday).format('DD/MM/YYYY')}</span>

      case 'email':
        return <span>{email}</span>

      case 'phone':
        return <span>{phone}</span>

      case 'type':
        return <span>{type}</span>

      case 'typeAccount':
        return <span>{typeAccount}</span>

      case 'verify':
        return <span>{verify}</span>

      case 'status':
        return <span>{status}</span>

      case 'createdAt':
        return <span>{moment(createdAt).format('DD/MM/YYYY')}</span>

      case 'updatedAt':
        return <span>{moment(updatedAt).format('DD/MM/YYYY')}</span>

      case 'action':
        return <span>ducnh</span>

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
