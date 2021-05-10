import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { slugURL } from 'utils/helper'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseListJob } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { JobPostingInfo } from 'models/job-posting-info'
import { List } from 'react-content-loader'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import Logo from 'assets/images/job-default.png'
import { useIntl } from 'react-intl'

interface AddressJobType {
  route: string
  title: string
}

interface CareerJobType {
  route: string
  title: string
}

const ListAdressJob: AddressJobType[] = [
  {
    route: '/jobs/city/ha-noi',
    title: 'HA_NOI'
  },
  {
    route: '/jobs/city/da-nang',
    title: 'DA_NANG'
  },
  {
    route: '/jobs/city/tphcm',
    title: 'HO_CHI_MINH'
  },
  {
    route: '/jobs/city/hai-phong',
    title: 'HAI_PHONG'
  },
  {
    route: '/jobs/city/can-tho',
    title: 'CAN_THO'
  }
]

const ListCareerJob: CareerJobType[] = [
  {
    route: '/jobs/career/kinh-doanh',
    title: 'BUSINESS_JOBS'
  },
  {
    route: '/jobs/career/cong-nghe-thong-tin',
    title: 'IT_JOBS'
  },
  {
    route: '/jobs/career/bao-chi',
    title: 'JOURNALISM_JOBS'
  },
  {
    route: '/jobs/career/marketing',
    title: 'MARKETING_JOBS'
  },
  {
    route: '/jobs/career/bat-dong-san',
    title: 'REAL_ESTATE_INDUSTRY_JOBS'
  }
]

const JobListGeneral: React.FC = () => {
  const [listJobNew, setListJobNew] = useState<JobPostingInfo[] | undefined | null>(undefined)
  const [listJobIntern, setListJobIntern] = useState<JobPostingInfo[] | undefined | null>(undefined)
  const [listJobHighSalary, setListHighSalary] = useState<JobPostingInfo[] | undefined | null>(undefined)
  const intl = useIntl()

  const callApiJobNew = () => {
    const url = `${SERVER_URL}/jobs/newest`
    const headers = {
      'Content-Type': 'application/json'
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
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setListJobNew(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiJobIntern = () => {
    const url = `${SERVER_URL}/jobs/intern`
    const headers = {
      'Content-Type': 'application/json'
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
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setListJobIntern(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiJobHighSalary = () => {
    const url = `${SERVER_URL}/jobs/high-salary`
    const headers = {
      'Content-Type': 'application/json'
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
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setListHighSalary(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    document.title = `CVFREE | ${intl.formatMessage({ id: 'JOBS.EMPLOYMENT_AND_RECRUITMENT' })}`
    callApiJobNew()
    callApiJobIntern()
    callApiJobHighSalary()
  }, [])

  return (
    <WrapperPage title={intl.formatMessage({ id: 'JOBS.EMPLOYMENT_AND_RECRUITMENT' })}>
      <div className="bg-white mt-10 py-10 grid-cols-2 grid gap-y-20 pb-40">
        {/* New */}
        <div className="col-span-2">
          <div className="px-10 grid-cols-2 grid gap-x-8 gap-y-4">
            <div className="flex justify-between items-center col-span-2 bg-green-600 px-4 py-4">
              <span className="block text-white uppercase font-semibold">
                <i className="fas fa-star mr-3" />
                {intl.formatMessage({ id: 'JOBS.NEW_JOBS' })}
              </span>
              <Link to="/jobs/new" className="text-white font-medium">
                <i className="fas fa-angle-double-right mr-2" />
                {intl.formatMessage({ id: 'JOBS.SEE_MORE' })}
              </Link>
            </div>
            {(!listJobNew || listJobNew.length === 0) && <List />}
            {listJobNew &&
              listJobNew.length > 0 &&
              listJobNew.map((item) => {
                const { name, _id, salary, address, company } = item
                return (
                  <div
                    key={`new_${_id}`}
                    className="col-span-1 flex items-center mt-4 border px-4 py-3 rounded duration-300 hover:bg-gray-100"
                  >
                    <div className="">
                      <Link to={`/jobs/${slugURL(name)}.${_id}`}>
                        <img src={company?.logo} alt="logo" className="w-20 h-20" />
                      </Link>
                    </div>
                    <div className="ml-4">
                      <div>
                        <Link to={`/jobs/${slugURL(name)}.${_id}`} className="font-bold text-lg">
                          {name}
                        </Link>
                      </div>
                      <div className="flex mt-2">
                        <i className="fas fa-building mr-2 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">{company?.name}</span>
                      </div>
                      <div className="mt-1">
                        <i className="fas fa-coins mr-1.5 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">
                          {salary.salaryType === 'FROM_TO'
                            ? `${salary.salaryFrom} - ${salary.salaryTo} ${salary.salaryCurrency}`
                            : 'Thỏa thuận'}
                        </span>
                      </div>
                      <div className="mt-1">
                        <i className="fas fa-map-marker-alt mr-2 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">{address?.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Salary */}
        <div className="col-span-1 mt-10">
          <div className="pl-10 pr-5">
            <div className="flex justify-between items-center col-span-2 bg-green-600 px-4 py-4">
              <span className="block text-white uppercase font-semibold">
                <i className="fas fa-coins mr-3" />
                {intl.formatMessage({ id: 'JOBS.HIGH_SALARY_JOBS' })}
              </span>
              <Link to="/jobs/high-salary" className="text-white font-medium">
                <i className="fas fa-angle-double-right mr-2" />
                {intl.formatMessage({ id: 'JOBS.SEE_MORE' })}
              </Link>
            </div>
            {listJobHighSalary &&
              listJobHighSalary.length > 0 &&
              listJobHighSalary.map((item) => {
                const { name, _id, salary, address, company } = item
                return (
                  <div
                    key={`new_${_id}`}
                    className="col-span-1 flex items-center mt-4 border px-4 py-3 rounded duration-300 hover:bg-gray-100"
                  >
                    <div className="">
                      <Link to={`/jobs/${slugURL(name)}.${_id}`}>
                        <img src={company?.logo} alt="logo" className="w-20 h-20" />
                      </Link>
                    </div>
                    <div className="ml-4">
                      <div>
                        <Link to={`/jobs/${slugURL(name)}.${_id}`} className="font-bold text-lg">
                          {name}
                        </Link>
                      </div>
                      <div className="flex mt-2">
                        <i className="fas fa-building mr-2 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">{company?.name}</span>
                      </div>
                      <div className="mt-1">
                        <i className="fas fa-coins mr-1.5 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">
                          {salary.salaryType === 'FROM_TO'
                            ? `${salary.salaryFrom} - ${salary.salaryTo} ${salary.salaryCurrency}`
                            : 'Thỏa thuận'}
                        </span>
                      </div>
                      <div className="mt-1">
                        <i className="fas fa-map-marker-alt mr-2 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">{address?.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Intern */}
        <div className="col-span-1 mt-10">
          <div className="pl-10 pr-10">
            <div className="flex justify-between items-center col-span-2 bg-green-600 px-4 py-4">
              <span className="block text-white uppercase font-semibold">
                <i className="fas fa-user-graduate mr-3" />
                {intl.formatMessage({ id: 'JOBS.INTERNS_JOBS' })}
              </span>
              <Link to="/jobs/intern" className="text-white font-medium">
                <i className="fas fa-angle-double-right mr-2" />
                {intl.formatMessage({ id: 'JOBS.SEE_MORE' })}
              </Link>
            </div>
            {listJobIntern &&
              listJobIntern.length > 0 &&
              listJobIntern.map((item) => {
                const { name, _id, salary, address, company } = item
                return (
                  <div
                    key={`new_${_id}`}
                    className="col-span-1 flex items-center mt-4 border px-4 py-3 rounded duration-300 hover:bg-gray-100"
                  >
                    <div className="">
                      <Link to={`/jobs/${slugURL(name)}.${_id}`}>
                        <img src={company?.logo} alt="logo" className="w-20 h-20" />
                      </Link>
                    </div>
                    <div className="ml-4">
                      <div>
                        <Link to={`/jobs/${slugURL(name)}.${_id}`} className="font-bold text-lg">
                          {name}
                        </Link>
                      </div>
                      <div className="flex mt-2">
                        <i className="fas fa-building mr-2 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">{company?.name}</span>
                      </div>
                      <div className="mt-1">
                        <i className="fas fa-coins mr-1.5 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">
                          {salary.salaryType === 'FROM_TO'
                            ? `${salary.salaryFrom} - ${salary.salaryTo} ${salary.salaryCurrency}`
                            : 'Thỏa thuận'}
                        </span>
                      </div>
                      <div className="mt-1">
                        <i className="fas fa-map-marker-alt mr-2 text-sm text-gray-600" />
                        <span className="font-medium text-gray-600">{address?.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Career */}
        <div className="col-span-1 mt-10">
          <div className="pl-10 pr-5">
            <div className="flex justify-between items-center col-span-2 bg-green-600 px-4 py-4">
              <span className="block text-white uppercase font-semibold">
                <i className="fas fa-briefcase mr-3" />
                {intl.formatMessage({ id: 'JOBS.JOBS_BY_INDUSTRIES' })}
              </span>
            </div>
            {ListCareerJob &&
              ListCareerJob.length > 0 &&
              ListCareerJob.map((item) => {
                const { route, title } = item
                return (
                  <div
                    key={`new_${route}`}
                    className="col-span-1 flex items-center mt-4 border px-4 py-3 rounded duration-300 hover:bg-gray-100"
                  >
                    <div className="">
                      <Link to={route}>
                        <img src={Logo} alt="logo" className="w-20 h-20" />
                      </Link>
                    </div>
                    <div className="ml-8">
                      <div>
                        <Link to={route} className="font-semibold text-lg">
                          {intl.formatMessage({ id: `JOBS.${title}` })}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Address */}
        <div className="col-span-1 mt-10">
          <div className="pl-10 pr-10">
            <div className="flex justify-between items-center col-span-2 bg-green-600 px-4 py-4">
              <span className="block text-white uppercase font-semibold">
                <i className="fas fa-map-marker-alt mr-3" />
                {intl.formatMessage({ id: 'JOBS.JOBS_BY_LOCATION' })}
              </span>
            </div>
            {ListAdressJob &&
              ListAdressJob.length > 0 &&
              ListAdressJob.map((item) => {
                const { route, title } = item
                return (
                  <div
                    key={`new_${route}`}
                    className="col-span-1 flex items-center mt-4 border px-4 py-3 rounded duration-300 hover:bg-gray-100"
                  >
                    <div className="">
                      <Link to={route}>
                        <img src={Logo} alt="logo" className="w-20 h-20" />
                      </Link>
                    </div>
                    <div className="ml-8">
                      <div>
                        <Link to={route} className="font-semibold text-lg">
                          {`${intl.formatMessage({ id: 'JOBS.JOBS_IN' })} ${intl.formatMessage({
                            id: `JOBS.${title}`
                          })}`}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </WrapperPage>
  )
}

export default JobListGeneral
