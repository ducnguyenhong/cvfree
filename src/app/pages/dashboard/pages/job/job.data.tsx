import { Loader, Pagination, ColumnsProps } from '@ekidpro/table'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { showNotify } from 'app/partials/pr-notify'
import { Action } from './job.action'
import { JobPostingInfo } from 'models/job-posting-info'
import { Email, Phone, DateTime, Status, Active, TableLink, BasicCompanyInfo } from 'app/partials/table-columns'

export interface TableColumn extends JobPostingInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { enable: true, field: 'id', title: 'ID' },
  { enable: true, field: 'name', title: 'Tên công việc' },
  { enable: true, field: 'formOfWork', title: 'Hình thức' },
  { enable: true, field: 'numberRecruited', title: 'Số lượng cần tuyển' },
  { enable: true, field: 'salary', title: 'Mức lương' },
  { enable: true, field: 'recruitmentPosition', title: 'Vị trí tuyển dụng' },
  { enable: true, field: 'career', title: 'Ngành nghề' },
  { enable: true, field: 'company', title: 'Công ty' },
  { enable: true, field: 'address', title: 'Địa chỉ' },
  { enable: true, field: 'status', title: 'Trạng thái' },
  { enable: true, field: 'timeToApply', title: 'Thời hạn ứng tuyển' },
  { enable: true, field: 'createdAt', title: 'Ngày tạo' },
  { enable: true, field: 'updatedAt', title: 'Ngày cập nhật' },
  { enable: true, field: 'action', title: 'Hành động' }
]

export const TableLoader: Loader<TableColumn, TableFilter> = {
  url: `${SERVER_URL}/jobs`,
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

    const result: Pagination<JobPostingInfo> = {
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
      timeToApply,
      formOfWork,
      numberRecruited,
      salary,
      recruitmentPosition,
      career,
      company,
      id,
      createdAt,
      updatedAt,
      address,
      creatorId
    } = data

    switch (field) {
      case 'id':
        return <TableLink to={`/dashboard/jobs/${id}`} title={id} className="font-semibold" />

      case 'name':
        return <span className="whitespace-nowrap">{name}</span>

      case 'timeToApply':
        return <DateTime timestamp={timeToApply} />

      case 'formOfWork':
        return <span>{formOfWork}</span>

      case 'numberRecruited':
        return <span>{numberRecruited}</span>

      case 'salary':
        return <span>{salary.salaryType}</span>

      case 'recruitmentPosition':
        return <span>{recruitmentPosition}</span>

      case 'career':
        return <span>{career}</span>

      case 'company':
        return <BasicCompanyInfo name={company?.name} id={creatorId} logo={company?.logo} />

      case 'address':
        return <span className="whitespace-nowrap">{address && address.label}</span>

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
