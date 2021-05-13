import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ApplyManageInfo } from 'models/apply-manage-info'
import { showNotify } from 'app/partials/pr-notify'
import moment from 'moment'
import { slugURL } from 'utils/helper'
import { DataStatusApply } from './candidate-manage-apply'

export interface TableColumn extends ApplyManageInfo {
  action?: string
}

export interface TableFilter {}

const renderStatusApply = (status?: string) => {
  const dataStatus = DataStatusApply.find((item) => item.status === status)
  return (
    <span
      className={`${dataStatus?.textColor} ${dataStatus?.bgColor} text-sm uppercase px-3 py-1.5 rounded font-semibold w-32 block text-center`}
    >
      {dataStatus?.title}
    </span>
  )
}

export const Columns: ColumnsProps[] = [
  { field: '_id', title: 'ID' },
  { field: 'jobName', title: 'Tên việc làm' },
  { field: 'applyType', title: 'Hình thức ứng tuyển' },
  { field: 'applyValue', title: 'Thông tin ứng tuyển' },
  { field: 'status', title: 'Trạng thái' },
  { field: 'createdAt', title: 'Ngày ứng tuyển' }
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
      url: `${SERVER_URL}/apply-manage`,
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

    const result: Pagination<ApplyManageInfo> = {
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

    const { _id, jobId, jobName, status, createdAt, applyCandidate, applyType, applyValue } = data

    const getApplyType = () => {
      if (applyType === 'OTHER') {
        return <span>CV từ hệ thống khác</span>
      }
      if (applyType === 'PDF') {
        return <span>File PDF</span>
      }
      return <span>Hồ sơ CVFREE</span>
    }

    const getApplyValue = () => {
      if (applyType === 'OTHER') {
        return (
          <a
            href={applyValue}
            target="_blank"
            className="font-medium text-white bg-pink-500 px-4 py-2 rounded"
            rel="noopener noreferrer"
          >
            Xem liên kết
          </a>
        )
      }
      if (applyType === 'PDF') {
        return (
          <a
            href={applyValue}
            target="_blank"
            className="font-medium text-white bg-pink-500 px-4 py-2 rounded"
            rel="noopener noreferrer"
          >
            Xem file
          </a>
        )
      }
      return (
        <a
          href={`/cv-public/${slugURL(applyCandidate.fullname)}.${applyValue}`}
          target="_blank"
          className="font-medium text-white bg-pink-500 px-4 py-2 rounded"
          rel="noopener noreferrer"
        >
          Xem hồ sơ
        </a>
      )
    }

    switch (field) {
      case '_id':
        return <span className="font-medium"> {_id ? _id.slice(_id.length - 5, _id.length) : ''}</span>

      case 'jobName':
        return (
          <a
            href={`/jobs/${slugURL(jobName)}.${jobId}`}
            target="_blank"
            className="font-medium"
            rel="noopener noreferrer"
          >
            {jobName}
          </a>
        )

      case 'applyType':
        return getApplyType()

      case 'applyValue':
        return getApplyValue()

      case 'status':
        return <>{renderStatusApply(status)}</>

      case 'createdAt':
        return <span>{moment(createdAt).format('DD/MM/YYYY')}</span>

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
