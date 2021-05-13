import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { BasicCompanyInfo, BasicUserInfo, DateTime, Status } from 'app/partials/table-columns'
import axios from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { RequestUpdateCompanyInfo } from 'models/request-update-company-info'
// import { Action } from './request-update-company.action'
import moment from 'moment'
import { ReportJobInfo } from 'models/report-job-info'
import { slugURL } from 'utils/helper'

export interface TableColumn extends ReportJobInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { field: '_id', title: 'ID' },
  { field: 'job', title: 'Việc làm' },
  { field: 'reporter', title: 'Người báo cáo' },
  { field: 'creator', title: 'Người đăng việc làm' },
  { field: 'processStatus', title: 'Trạng thái xử lý' },
  { field: 'company', title: 'Công ty' },
  { field: 'status', title: 'Trạng thái' },
  { field: 'createdAt', title: 'Ngày yêu cầu' },
  { field: 'expiredAt', title: 'Ngày hết hạn' },
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
      url: `${SERVER_URL}/report-job`,
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

    const result: Pagination<ReportJobInfo> = {
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

    const { status, _id, creator, reporter, job, company, createdAt, processStatus, expiredAt } = data

    const renderExpiredAt = () => {
      if (!expiredAt) {
        return <></>
      }
      return moment(expiredAt).valueOf() > moment().valueOf() ? (
        <DateTime timestamp={expiredAt} />
      ) : (
        <span>Đã hết hạn</span>
      )
    }

    switch (field) {
      case '_id':
        return <span className="font-medium">{_id ? _id.slice(_id.length - 5, _id.length) : ''}</span>

      case 'job':
        return (
          <a
            href={`/jobs/${slugURL(job.name)}.${job.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap font-medium px-4 py-2"
          >
            {job.name}
          </a>
        )

      case 'reporter':
        return (
          <BasicUserInfo
            id={reporter?.id}
            avatar={reporter?.avatar}
            name={reporter?.fullname}
            username={reporter?.email}
          />
        )

      case 'creator':
        return (
          <BasicUserInfo id={creator?.id} avatar={creator?.avatar} name={creator?.fullname} username={creator?.email} />
        )

      case 'processStatus':
        return <span>{processStatus}</span>

      case 'company':
        return <BasicCompanyInfo name={company.name} id={company.id} logo={company.logo} />

      case 'status':
        return <Status status={status || ''} />

      case 'createdAt':
        return <DateTime timestamp={createdAt} />

      case 'expiredAt':
        return renderExpiredAt()

      // case 'action':
      //   return (
      //     <Action
      //       id={_id}
      //       expiredAt={expiredAt}
      //       status={status}
      //       emailRequest={userRequest?.email}
      //       emailTo={userAdmin?.email}
      //       helloName={userAdmin?.fullname}
      //       isLoginNow
      //       employerRequestedId={userRequest?.id}
      //     />
      //   )

      default:
        return <span>{get(data, 'field')}</span>
    }
  }
}
