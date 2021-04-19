import { showNotify } from 'app/partials/pr-notify'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseCompanyDetail, ResponseListJob } from 'models/response-api'
import { useEffect, useState, memo } from 'react'
import { CompanyInfo } from 'models/company-info'
import { List } from 'react-content-loader'
import { BreadCrumb } from 'app/pages/bread-crumb'
import { Link, useRouteMatch } from 'react-router-dom'
import { DropdownAsync } from 'app/partials/dropdown-async'
import { JobPostingInfo } from 'models/job-posting-info'

import moment from 'moment'
import { Pagination, PaginationType } from 'app/partials/layout/pagination'

export const EmployerCompanyInfo: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | undefined | null>(undefined)
  const [listJob, setListJob] = useState<JobPostingInfo[] | undefined | null>(undefined)
  const [paginationListJob, setPaginationListJob] = useState<PaginationType | null>(null)
  const match = useRouteMatch()
  const companyId = get(match.params, 'id')

  const callApiCompanyInfo = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/company/${companyId}`
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
    const url = `${SERVER_URL}/company/${companyId}/jobs`
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

  if (typeof companyInfo === 'undefined') {
    return <List />
  }

  if (companyInfo === null) {
    return (
      <div className="w-2/3 mx-auto py-32">
        <BreadCrumb title="Thông tin công ty" />
        <div className="bg-blue-50 shadow px-8 pt-20 pb-72 mt-10">
          <span className="block text-xl font-semibold text-center">Bạn chưa cập nhật thông tin công ty của bạn</span>
          <div className="flex items-center justify-center mt-10">
            <span className="block bg-purple-500 text-white px-4 font-semibold rounded-md py-2 duration-300 hover:bg-purple-600">
              Chọn công ty trong danh sách
            </span>
            <span className="block mx-10 font-medium">hoặc</span>
            <Link
              to="/employer/register-company"
              className="px-4 py-2 bg-green-500 rounded-md duration-300 hover:bg-green-600"
            >
              <span className="text-white font-semibold">Đăng ký công ty mới</span>
            </Link>
          </div>
          <div className="mt-16 w-1/2 mx-auto">
            <div>
              <DropdownAsync
                label="Danh sách công ty đã có trong hệ thống"
                urlApi={`/company/suggest`}
                onChange={(e) => {
                  console.log(e)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const JobList: React.FC<{ listJob: JobPostingInfo[] | undefined | null }> = (props) => {
    const { listJob } = props

    if (typeof listJob === 'undefined') {
      return <List />
    }

    if (listJob === null || (listJob && listJob.length === 0)) {
      return <div>Chưa có thông tin việc làm</div>
    }

    return (
      <div className="mt-10">
        {listJob &&
          listJob.length > 0 &&
          listJob.map((item) => {
            const { name, salary, timeToApply, address, formOfWork } = item
            return (
              <div key={name}>
                <div className="py-8">
                  <span className="block uppercase text-md font-semibold">{name}</span>
                  <div className="grid grid-cols-4 mt-3">
                    <span className="block col-span-1">{moment(timeToApply).format('DD/MM/YYYY')}</span>
                    <span className="block col-span-1">
                      {salary.salaryFrom} - {salary.salaryTo} {salary.salaryCurrency}
                    </span>
                    <span className="block col-span-1">{formOfWork}</span>
                    <span className="block col-span-1">{address?.label}</span>
                  </div>
                </div>
                <hr />
              </div>
            )
          })}
        {paginationListJob && <Pagination pagination={paginationListJob} />}
      </div>
    )
  }

  const MemoJobList = memo(JobList)

  const { name, website, background, personnelSize, address, intro, logo } = companyInfo

  return (
    <div className="w-2/3 mx-auto py-32">
      <BreadCrumb title="Thông tin công ty" />
      <div className="bg-blue-50 shadow px-8 py-10 mt-10">
        <div style={{ aspectRatio: '5/2' }} className="relative">
          <img src={background} alt="background" className="w-full h-full" />
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
          <span className="block uppercase text-xl font-bold">1. Thông tin công ty</span>
          <span className="block">Website: {website}</span>
          <span className="block">Quy mô nhân sự: {personnelSize} người</span>
          <span className="block">
            Địa chỉ: {address.street}, {address.label}
          </span>
          <span className="block">{intro}</span>
          <span className="block uppercase text-xl font-bold mt-10">2. Việc làm tuyển dụng</span>
          <MemoJobList listJob={listJob} />
        </div>
        <div className="text-center my-10">
          <span className="px-4 py-2 rounded text-white bg-blue-500">Gửi yêu cầu chỉnh sửa thông tin</span>
        </div>
      </div>
    </div>
  )
}
