import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { BasicCvPublicInfo, DateTime, Status } from 'app/partials/table-columns'
import axios from 'axios'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CvInfo } from 'models/cv-info'
import { slugURL } from 'utils/helper'
import { Action } from './candidate-manage-cv.action'

export interface TableColumn extends CvInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: '_id', title: 'Mã CV' },
  { enable: true, field: 'name', title: 'Thông tin' },
  { enable: true, field: 'template', title: 'Mẫu CV' },
  { enable: true, field: 'createdAt', title: 'Ngày tạo' },
  { enable: true, field: 'updatedAt', title: 'Ngày cập nhật' },
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

    const { name, _id, detail, createdAt, updatedAt, template } = data
    const { fullname, avatar, gender } = detail

    switch (field) {
      case '_id':
        return (
          <a
            href={`/cv-public/${slugURL(fullname)}.${_id}`}
            target="_blank"
            className="font-semibold"
            rel="noopener noreferrer"
          >
            {_id ? _id.slice(_id.length - 5, _id.length) : ''}
          </a>
        )

      case 'name':
        return <BasicCvPublicInfo id={_id} avatar={avatar} fullname={fullname} cvName={name} gender={gender} />

      case 'template':
        return <span>{template.label}</span>

      case 'createdAt':
        return <DateTime timestamp={createdAt} />

      case 'updatedAt':
        return <DateTime timestamp={updatedAt} />

      case 'action':
        return <Action id={_id} fullname={fullname} />

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
