import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { BasicCompanyInfo, BasicJobInfo, DateTime, IsPublic, Status, TableLink } from 'app/partials/table-columns'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { JobPostingInfo } from 'models/job-posting-info'
import { Action } from './job.action'

export interface TableColumn extends JobPostingInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'Tên công việc' },
  { field: 'formOfWork', title: 'Hình thức' },
  { field: 'numberRecruited', title: 'Số lượng cần tuyển' },
  { field: 'salary', title: 'Mức lương' },
  { field: 'recruitmentPosition', title: 'Vị trí tuyển dụng' },
  { field: 'career', title: 'Ngành nghề' },
  { field: 'company', title: 'Công ty' },
  { field: 'address', title: 'Địa chỉ' },
  { field: 'isPublic', title: 'Công khai' },
  { field: 'status', title: 'Trạng thái' },
  { field: 'timeToApply', title: 'Thời hạn ứng tuyển' },
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
      url: `${SERVER_URL}/jobs`,
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
      isPublic,
      _id
    } = data

    const renderSalary = () => {
      if (salary.salaryType === 'AGREE') {
        return 'Thỏa thuận'
      }
      if (salary.salaryType === 'FROM_TO') {
        const salaryFrom = Number(salary.salaryFrom?.replaceAll('.', '')).toLocaleString('it-IT', {
          style: 'currency',
          currency: salary.salaryCurrency
        })
        const salaryTo = Number(salary.salaryTo?.replaceAll('.', '')).toLocaleString('it-IT', {
          style: 'currency',
          currency: salary.salaryCurrency
        })
        return `${salaryFrom} đến ${salaryTo}`
      }
    }

    switch (field) {
      case 'id':
        return <TableLink to={`/dashboard/jobs/${id}`} title={id} className="font-semibold" />

      case 'name':
        return <BasicJobInfo name={name} id={_id} />

      case 'timeToApply':
        return <DateTime timestamp={timeToApply} />

      case 'formOfWork':
        return <span>{formOfWork.join(', ')}</span>

      case 'numberRecruited':
        return <span>{numberRecruited}</span>

      case 'salary':
        return <span>{renderSalary()}</span>

      case 'recruitmentPosition':
        return <span>{recruitmentPosition.map((item) => item).join(', ')}</span>

      case 'career':
        return <span>{career}</span>

      case 'company':
        return <BasicCompanyInfo name={company?.name} id={company?.id} logo={company?.logo} />

      case 'address':
        return <span className="whitespace-nowrap">{address && address.label}</span>

      case 'status':
        return <Status status={status} />

      case 'createdAt':
        return <DateTime timestamp={createdAt} />

      case 'updatedAt':
        return <DateTime timestamp={updatedAt} />

      case 'isPublic':
        return <IsPublic isPublic={isPublic} />

      case 'action':
        return <Action id={_id} name={name} status={status} />

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
