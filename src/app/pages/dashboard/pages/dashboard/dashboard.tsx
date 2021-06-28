import { ImageRatio } from 'app/partials/image-ratio/image-ratio'
import { showNotify } from 'app/partials/pr-notify'
import Logo from 'assets/images/default.png'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { DashboardInfo } from 'models/dashboard-info'
import { ResponseDataDashboard } from 'models/response-api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardStyle } from './dashboard.style'
import { List } from 'react-content-loader'
import { slugURL } from 'utils/helper'
import { Gender } from 'app/partials/layout/gender'
import ImageNoData from 'assets/images/no-data.png'

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardInfo | null>(null)

  const callApiData = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/dashboard`
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
      .then((response: AxiosResponse<ResponseDataDashboard>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setData(data.dataDashboard)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    document.title = 'CVFREE | Bảng điều khiển'
    callApiData()
  }, [])

  if (!data) {
    return <List />
  }

  const { statis, jobs, cvs, reportJobs, companies } = data

  const NoData: React.FC = () => {
    return <img src={ImageNoData} alt="no data" className="h-56 block mx-auto" />
  }

  return (
    <DashboardStyle>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-chart-area mr-2" />
            <span className="font-semibold uppercase">Thống kê</span>
          </div>
          <hr />
          <div className="py-8 px-10">
            <div className="flex items-center">
              <div className="w-20 h-20">
                <ImageRatio src={Logo} />
              </div>
              <div className="ml-10">
                <span className="block font-bold text-xl text-gray-600">CVFREE</span>
                <span className="block font-semibold text-gray-600">Hồ sơ trực tuyến miễn phí</span>
              </div>
            </div>
            <div className="w-2/3 mx-auto mt-8 mb-8">
              <hr />
            </div>
            <div className="grid grid-cols-3 gpa-x-5">
              <div className="col-span-1 text-red-700">
                <span className="block text-center font-semibold text-2xl">{statis.cv}</span>
                <span className="block text-center font-medium mt-1">Hồ sơ</span>
              </div>
              <div className="col-span-1 text-green-700">
                <span className="block text-center font-semibold text-2xl">{statis.job}</span>
                <span className="block text-center font-medium mt-1">Việc làm</span>
              </div>
              <div className="col-span-1 text-blue-700">
                <span className="block text-center font-semibold text-2xl">{statis.company}</span>
                <span className="block text-center font-medium mt-1">Doanh nghiệp</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-th mr-2" />
            <span className="font-semibold uppercase">Thao tác nhanh</span>
          </div>
          <hr />
          <div className="py-8 px-10 grid grid-cols-2 gap-x-10 gap-y-8">
            <Link
              to="/dashboard/users/create?type=USER"
              className="col-span-1 bg-purple-100 rounded-md px-4 py-4 duration-300 hover:bg-purple-200"
            >
              <i className="fas fa-user-plus block text-2xl text-purple-700 text-center" />
              <span className="block text-center mt-2 text-purple-700 font-semibold">Tạo ứng viên</span>
            </Link>
            <Link
              to="/dashboard/users/create?type=EMPLOYER"
              className="col-span-1 bg-green-100 rounded-md px-4 py-4 duration-300 hover:bg-green-200"
            >
              <i className="fas fa-plus-circle block text-2xl text-green-700 text-center" />
              <span className="block text-center mt-2 text-green-700 font-semibold">Tạo nhà tuyển dụng</span>
            </Link>
            <Link
              to="/dashboard/send-email"
              className="block col-span-1 bg-red-100 rounded-md px-4 py-4 duration-300 hover:bg-red-200"
            >
              <i className="fas fa-envelope block text-2xl text-red-700 text-center" />
              <span className="block text-center mt-2 text-red-700 font-semibold">Gửi email</span>
            </Link>
            <a
              href="https://www.facebook.com/cvfreevn"
              target="_blank"
              rel="noopener noreferrer"
              className="block col-span-1 bg-blue-100 rounded-md px-4 py-4 duration-300 hover:bg-blue-200"
            >
              <i className="fab fa-facebook block text-2xl text-blue-700 text-center" />
              <span className="block text-center mt-2 text-blue-700 font-semibold">Fanpage</span>
            </a>
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-info-circle mr-2" />
              <span className="font-semibold uppercase">Báo cáo/Khiếu nại</span>
            </div>
            <Link to="/dashboard/report-job">
              <i className="fas fa-angle-double-right text-blue-400" />
            </Link>
          </div>
          <hr />
          <div className="py-5 px-5">
            {(!reportJobs || reportJobs.length === 0) && <NoData />}
            {reportJobs &&
              reportJobs.length > 0 &&
              reportJobs.map((item, index) => {
                const { _id, job } = item
                return (
                  <Link
                    to={`/dashboard/report-job/${job.id}`}
                    key={_id}
                    className={`${
                      index !== reportJobs.length - 1 ? 'border border-t-0 border-r-0 border-l-0 border-dashed' : ''
                    } text-gray-600 font-medium py-3 block duration-300 hover:text-blue-600 pl-1`}
                  >
                    • <span className="ml-2">{job.name}</span>
                  </Link>
                )
              })}
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-copy mr-2" />
              <span className="font-semibold uppercase">Hồ sơ mới</span>
            </div>
            <Link to="/dashboard/cvs">
              <i className="fas fa-angle-double-right text-blue-400" />
            </Link>
          </div>
          <hr />
          <div className="py-5 px-5">
            {(!cvs || cvs.length === 0) && <NoData />}
            {cvs &&
              cvs.length > 0 &&
              cvs.map((item, index) => {
                const { _id, detail } = item
                return (
                  <a
                    href={`/cv-public/${slugURL(detail.fullname)}.${_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={_id}
                    className={`${
                      index !== cvs.length - 1 ? 'border border-t-0 border-r-0 border-l-0 border-dashed' : ''
                    } text-gray-600 font-medium py-3 block duration-300 hover:text-blue-600 pl-1`}
                  >
                    •{' '}
                    <span className="ml-2">
                      {detail.fullname.toUpperCase()} <Gender className="ml-2" gender={detail.gender} />
                    </span>
                  </a>
                )
              })}
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-briefcase mr-2" />
              <span className="font-semibold uppercase">Việc làm mới</span>
            </div>
            <Link to="/dashboard/jobs">
              <i className="fas fa-angle-double-right text-blue-400" />
            </Link>
          </div>
          <hr />
          <div className="py-5 px-5">
            {(!jobs || jobs.length === 0) && <NoData />}
            {jobs &&
              jobs.length > 0 &&
              jobs.map((item, index) => {
                const { _id, name } = item
                return (
                  <Link
                    to={`/jobs/${slugURL(name)}.${_id}`}
                    key={_id}
                    className={`${
                      index !== cvs.length - 1 ? 'border border-t-0 border-r-0 border-l-0 border-dashed' : ''
                    } text-gray-600 font-medium py-3 block duration-300 hover:text-blue-600 pl-1`}
                  >
                    • <span className="ml-2">{name}</span>
                  </Link>
                )
              })}
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-building mr-2" />
              <span className="font-semibold uppercase">Công ty mới</span>
            </div>
            <Link to="/dashboard/companies">
              <i className="fas fa-angle-double-right text-blue-400" />
            </Link>
          </div>
          <hr />
          <div className="py-5 px-5">
            {(!companies || companies.length === 0) && <NoData />}
            {companies &&
              companies.length > 0 &&
              companies.map((item, index) => {
                const { _id, name } = item
                return (
                  <Link
                    to={`/companies/${_id}`}
                    key={_id}
                    className={`${
                      index !== cvs.length - 1 ? 'border border-t-0 border-r-0 border-l-0 border-dashed' : ''
                    } text-gray-600 font-medium py-3 block duration-300 hover:text-blue-600 pl-1`}
                  >
                    • <span className="ml-2">{name}</span>
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
    </DashboardStyle>
  )
}
