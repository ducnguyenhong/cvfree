import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { showNotify } from 'app/partials/pr-notify'
import { Action } from './employer.action'
import { UserInfo } from 'models/user-info'
import { BasicUserInfo, Email, Phone, DateTime, Status, Active, TableLink } from 'app/partials/table-columns'

export interface TableColumn extends UserInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { field: 'id', title: 'ID' },
  { field: 'fullname', title: 'Họ và tên' },
  { field: 'birthday', title: 'Ngày sinh' },
  { field: 'email', title: 'Email' },
  { field: 'phone', title: 'Điện thoại' },
  { field: 'verify', title: 'Xác thực' },
  { field: 'status', title: 'Trạng thái' },
  { field: 'createdAt', title: 'Ngày tạo' },
  { field: 'updatedAt', title: 'Ngày cập nhật' },
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
      url: `${SERVER_URL}/users`,
      params: {
        page: input.page,
        size: input.size,
        type: 'EMPLOYER'
      }
    })

    const { success, data, error } = response.data
    const { items, pagination } = data
    const { page, size, totalItems, totalPages } = pagination

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
      _id,
      status,
      fullname,
      birthday,
      gender,
      email,
      phone,
      username,
      id,
      createdAt,
      updatedAt,
      verify,
      avatar
    } = data

    switch (field) {
      case 'id':
        return <TableLink to={`/dashboard/users/${_id}`} title={id} className="font-semibold" />

      case 'fullname':
        return <BasicUserInfo id={_id} avatar={avatar} name={fullname} username={username} gender={gender} />

      case 'birthday':
        return birthday ? (
          <DateTime timestamp={birthday} format="DD/MM/YYYY" isAge />
        ) : (
          <span className="text-gray-300">N/A</span>
        )

      case 'email':
        return <Email email={email} />

      case 'phone':
        return phone ? <Phone phone={phone} /> : <span className="text-gray-300">N/A</span>

      case 'verify':
        return <Active active={verify} />

      case 'status':
        return <Status status={status} />

      case 'createdAt':
        return <DateTime timestamp={createdAt} />

      case 'updatedAt':
        return <DateTime timestamp={updatedAt} />

      case 'action':
        return <Action id={_id} status={status} />

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
