import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { showNotify } from 'app/partials/pr-notify'
import { Action } from './cv.action'
import { CvInfo } from 'models/cv-info'
import {
  BasicCvInfo,
  Email,
  Phone,
  DateTime,
  Status,
  Active,
  TableLink,
  BasicUserInfo
} from 'app/partials/table-columns'
import { slugURL } from 'utils/helper'

export interface TableColumn extends CvInfo {
  info?: string
  fullname?: string
  birthday?: string
  gender?: string
  action?: string
  phone?: string
  address?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'id', title: 'ID' },
  { enable: true, field: 'info', title: 'Tên' },
  { enable: true, field: 'creator', title: 'Người tạo' },
  { enable: true, field: 'template', title: 'Template CV' },
  { enable: true, field: 'formOfWork', title: 'Hình thức' },
  { enable: true, field: 'career', title: 'Ngành nghề' },
  { enable: true, field: 'birthday', title: 'Ngày sinh' },
  { enable: true, field: 'phone', title: 'Điện thoại' },
  { enable: true, field: 'address', title: 'Địa chỉ' },
  { enable: true, field: 'status', title: 'Trạng thái' },
  { enable: true, field: 'createdAt', title: 'Ngày tạo' },
  { enable: true, field: 'updatedAt', title: 'Ngày cập nhật' },
  { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/cvs`,
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

    const result: Pagination<CvInfo> = {
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
      _id,
      name,
      detail,
      creator,
      template,
      formOfWork,
      career,
      id,
      createdAt,
      updatedAt,
      creatorId
    } = data

    const { fullname, avatar, birthday, gender, phone, address } = detail

    switch (field) {
      case 'id':
        return <TableLink to={`/cv-public/${slugURL(fullname)}.${_id}`} title={id} className="font-semibold" />

      case 'info':
        return <BasicCvInfo id={id} avatar={avatar} fullname={fullname} cvName={name} gender={gender} />

      case 'creator':
        return <BasicUserInfo id={creatorId} name={creator?.fullname || creator?.username} avatar={creator?.avatar} />

      case 'template':
        return <span>{template}</span>

      case 'formOfWork':
        return <span>{formOfWork}</span>

      case 'career':
        return <span>{career ? career.label : 'N/A'}</span>

      case 'birthday':
        return birthday ? <DateTime timestamp={birthday} /> : <span className="text-gray-300">N/A</span>

      case 'phone':
        return phone ? <Phone phone={phone} /> : <span className="text-gray-300">N/A</span>

      case 'address':
        return <span className="whitespace-nowrap">{address?.label}</span>

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
