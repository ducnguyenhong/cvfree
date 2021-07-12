import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { BasicUserInfo, Status } from 'app/partials/table-columns'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { UserInfo } from 'models/user-info'
import { Action } from './employer-manage-staff.action'

export interface TableColumn extends UserInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { field: '_id', title: 'ID' },
  { field: 'fullname', title: 'Họ và tên' },
  { field: 'email', title: 'Thông tin liên hệ' },
  { field: 'isAdminOfCompany', title: 'Chức vụ' },
  { field: 'status', title: 'Trạng thái' },
  { field: 'action', title: 'Hành động' }
]

export const getTableLoader = (companyId?: string) => {
  const TableLoader: Loader<TableColumn, TableFilter> = {
    fetch: async (input) => {
      const accessToken = Cookies.get('token')
      const response = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        url: `${SERVER_URL}/companies/${companyId}/staffs`,
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

      const { _id, fullname, avatar, gender, status, isAdminOfCompany, email, phone, address } = data

      switch (field) {
        case '_id':
          return <span className="font-medium">{_id ? _id.slice(_id.length - 5, _id.length) : ''}</span>

        case 'fullname':
          return <BasicUserInfo id={_id} name={fullname} avatar={avatar} gender={gender} />

        case 'isAdminOfCompany':
          return <span>{isAdminOfCompany ? 'ADMIN' : 'STAFF'}</span>

        case 'email':
          return (
            <div>
              <div className="flex items-center">
                <i className="fas fa-phone mr-2 text-gray-500"></i>
                <a href={`tel:${phone}`} className="hover:text-blue-600 duration-300">
                  {phone}
                </a>
              </div>
              <div className="flex items-center mt-1">
                <i className="fas fa-envelope mr-2 text-gray-500"></i>
                <a href={`mailto:${email}`} className="hover:text-blue-600 duration-300">
                  {email}
                </a>
              </div>
              {address?.label && (
                <div className="flex items-center mt-1">
                  <i className="fas fa-map-marker-alt mr-2.5 text-gray-500"></i>
                  {address?.label}
                </div>
              )}
            </div>
          )

        case 'status':
          return <Status status={status} />

        case 'action':
          return <Action id={_id} />

        default:
          return <span>{get(data, 'field')}</span>
      }
    }
  }
  return TableLoader
}
