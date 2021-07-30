import { BreadCrumb } from 'app/pages/bread-crumb'
import { Pagination, PaginationType } from 'app/partials/layout/pagination'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import { showNotify } from 'app/partials/pr-notify'
import BackgroundDefault from 'assets/images/bg-default-company.jpg'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CompanyInfo } from 'models/company-info'
import { JobPostingInfo } from 'models/job-posting-info'
import { ResponseCompanyDetail, ResponseListJob } from 'models/response-api'
import moment from 'moment'
import { memo, useEffect, useState } from 'react'
import { List } from 'react-content-loader'
import { useRouteMatch, Link } from 'react-router-dom'
import { slugURL } from 'utils/helper'

export const CompanyDetail: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | undefined | null>(undefined)
  const [listJob, setListJob] = useState<JobPostingInfo[] | undefined | null>(undefined)
  const [paginationListJob, setPaginationListJob] = useState<PaginationType | null>(null)
  const match = useRouteMatch()
  const companyId = get(match.params, 'id')

  const callApiCompanyInfo = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/companies/${companyId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseCompanyDetail>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCompanyInfo(data.companyDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiListJob = (companyId: string) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/companies/${companyId}/jobs`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseListJob>) => {
        const { success, data, error } = response.data
        const { items, pagination } = data
        const { page, size, totalItems, totalPages } = pagination

        if (!success) {
          throw Error(error?.message)
        }
        setListJob(items)
        setPaginationListJob({ page, size, totalPages, totalItems })
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    callApiCompanyInfo()
    callApiListJob(companyId)
  }, [])

  const JobList: React.FC<{ listJob: JobPostingInfo[] | undefined | null }> = (props) => {
    const { listJob } = props

    if (typeof listJob === 'undefined') {
      return <List />
    }

    if (listJob === null || (listJob && listJob.length === 0)) {
      return <div>Chưa có thông tin việc làm</div>
    }

    return (
      <div className="mt-5">
        {listJob &&
          listJob.length > 0 &&
          listJob.map((item) => {
            const { name, salary, timeToApply, address, formOfWork, _id } = item
            const renderSalary = () => {
              if (salary.salaryType === 'AGREE') {
                return 'Thỏa thuận'
              }
              if (salary.salaryType === 'FROM_TO') {
                return `${salary.salaryFrom} đến ${salary.salaryTo} (${salary.salaryCurrency})`
              }
            }
            return (
              <a
                href={`/jobs/${slugURL(name)}.${_id}`}
                className="block"
                target="_blank"
                rel="noopener noreferrer"
                key={_id}
              >
                <div className="py-8">
                  <span className="block uppercase text-md font-semibold">{name}</span>
                  <div className="grid grid-cols-4 mt-3">
                    <div className="flex items-center col-span-1">
                      <i className="far fa-clock mr-2 text-gray-500" />
                      <span className="font-medium">{moment(timeToApply).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="flex items-center col-span-1">
                      <i className="fas fa-coins mr-2 text-gray-500" />
                      <span className="font-medium">{renderSalary()}</span>
                    </div>
                    <div className="flex items-center col-span-1">
                      <i className="fas fa-briefcase mr-2 text-gray-500" />
                      <span className="font-medium">{[...formOfWork].map((item) => item).join(', ')}</span>
                    </div>
                    <div className="flex items-center col-span-1">
                      <i className="fas fa-map-marker-alt mr-2 text-gray-500" />
                      <span className="font-medium">{address?.label}</span>
                    </div>
                  </div>
                </div>
                <hr />
              </a>
            )
          })}
        {paginationListJob && <Pagination pagination={paginationListJob} />}
      </div>
    )
  }

  if (typeof companyInfo === 'undefined') {
    return <List />
  }

  if (companyInfo === null) {
    return (
      <div className="w-2/3 mx-auto py-32">
        <BreadCrumb title="Thông tin công ty" />
        <div>Không tồn tại công ty</div>
      </div>
    )
  }

  const MemoJobList = memo(JobList)

  const { name, website, background, personnelSize, address, intro, logo } = companyInfo

  return (
    <WrapperPage title="Thông tin công ty">
      <div className="px-8 py-10 mt-10">
        <div style={{ aspectRatio: '5/2' }} className="relative">
          <img src={background || BackgroundDefault} alt="background" className="w-full h-full" />
          <img
            src={logo}
            alt="logo"
            className="absolute left-0 right-0 mx-auto w-40 h-40 -bottom-8 overflow-hidden rounded-full bg-white"
          />
        </div>
        <div className="mt-12">
          <span className="block text-center font-semibold text-3xl">{name}</span>
        </div>
        <div className="px-10 mt-10">
          <span className="block uppercase text-xl font-bold mb-5 text-green-700">1. Thông tin công ty</span>
          <span className="block font-semibold mb-3">
            - Website:{' '}
            <a href={website} target="_blank" rel="noopener noreferrer" className="font-normal ml-3">
              {website}
            </a>
          </span>

          <span className="block font-semibold mb-3">
            - Quy mô nhân sự: <span className="font-normal ml-3">{personnelSize} người</span>
          </span>

          <span className="block font-semibold mb-3">
            - Địa chỉ: <span className="font-normal ml-3">{address.label}</span>
          </span>

          <span className="block font-semibold mb-3 text-justify">
            - Giới thiệu: <span className="font-normal ml-3">{intro}</span>
          </span>
          <span className="block uppercase text-xl font-bold mt-20 text-green-700">2. Việc làm tuyển dụng</span>
          <MemoJobList listJob={listJob} />
        </div>
      </div>
    </WrapperPage>
  )
}
