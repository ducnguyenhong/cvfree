import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CandidateManageInfo } from 'models/candidate-manage-info'
import { showNotify } from 'app/partials/pr-notify'
import moment from 'moment'
import { BasicCvInfo } from 'app/partials/table-columns/table-column-cv-info'
import { slugURL } from 'utils/helper'
import { Action } from './employer-manage-candidate.action'

export interface TableColumn extends CandidateManageInfo {
  contact?: string
  action?: string
  candidateId?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { field: '_id', title: 'Mã' },
  { field: 'candidate', title: 'Hồ sơ ứng viên' },
  { field: 'contact', title: 'Thông tin liên hệ' },
  { field: 'jobId', title: 'Việc làm' },
  { field: 'isDone', title: 'Trạng thái' },
  { field: 'createdAt', title: 'Ngày duyệt ứng viên' },
  { field: 'action', title: 'Cập nhật trạng thái' }
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
      url: `${SERVER_URL}/candidate-manage`,
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

    const result: Pagination<CandidateManageInfo> = {
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

    const { cvId, jobId, jobName, isDone, createdAt, candidate, _id } = data

    const { fullname, avatar, gender, phone, email, address } = candidate

    switch (field) {
      case '_id':
        return <span>{_id.slice(_id.length - 5, _id.length)}</span>

      case 'candidate':
        return <BasicCvInfo id={cvId} fullname={fullname} avatar={avatar} gender={gender} />

      case 'contact':
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
            <div className="flex items-center mt-1">
              <i className="fas fa-map-marker-alt mr-2.5 text-gray-500"></i>
              {address?.label}
            </div>
          </div>
        )

      case 'jobId':
        return (
          <a
            href={`/jobs/${slugURL(jobName)}.${jobId}`}
            target="_blank"
            className="font-medium whitespace-nowrap"
            rel="noopener noreferrer"
          >
            {jobName}
          </a>
        )

      case 'isDone':
        return (
          <div>
            {isDone ? (
              <span className="text-white px-3 py-1.5 bg-purple-600 rounded text-sm whitespace-nowrap font-medium">
                Đã xong
              </span>
            ) : (
              <span className="text-white px-3 py-1.5 bg-green-600 rounded text-sm whitespace-nowrap font-medium">
                Đang tuyển dụng
              </span>
            )}
          </div>
        )

      case 'createdAt':
        return <span>{moment(createdAt).format('DD/MM/YYYY')}</span>

      case 'action':
        return <Action id={_id} isDone={isDone} />

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
