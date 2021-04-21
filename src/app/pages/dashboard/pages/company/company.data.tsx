import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { showNotify } from 'app/partials/pr-notify'
import { Action } from './company.action'
import { CompanyInfo } from 'models/company-info'
import { BasicCompanyInfo, Email, Phone, DateTime, Status, Active, TableLink } from 'app/partials/table-columns'

export interface TableColumn extends CompanyInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'id', title: 'ID' },
  { enable: true, field: 'name', title: 'Tên' },
  { enable: true, field: 'taxCode', title: 'Mã số thuế' },
  { enable: true, field: 'email', title: 'Email' },
  { enable: true, field: 'phone', title: 'Điện thoại' },
  { enable: true, field: 'address', title: 'Địa chỉ' },
  { enable: true, field: 'personnelSize', title: 'Quy mô' },
  { enable: true, field: 'status', title: 'Trạng thái' },
  { enable: true, field: 'createdAt', title: 'Ngày tạo' },
  { enable: true, field: 'updatedAt', title: 'Ngày cập nhật' },
  { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/companies`,
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

    const result: Pagination<CompanyInfo> = {
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
      name,
      taxCode,
      logo,
      email,
      website,
      phone,
      personnelSize,
      id,
      createdAt,
      updatedAt,
      address
    } = data

    switch (field) {
      case 'id':
        return <TableLink to={`/dashboard/companies/${id}`} title={id} className="font-semibold" />

      case 'name':
        return <BasicCompanyInfo id={id} logo={logo} name={name} website={website} />

      case 'taxCode':
        return <span>{taxCode}</span>

      case 'email':
        return <Email email={email} />

      case 'phone':
        return <Phone phone={phone} />

      case 'address':
        return <span className="whitespace-nowrap">{address && address.label}</span>

      case 'personnelSize':
        return <span className="whitespace-nowrap">{personnelSize}</span>

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