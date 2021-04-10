import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { slugURL } from 'utils/helper'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseListJob } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { JobPostingInfo } from 'models/job-posting-info'
import { BreadCrumb } from 'app/pages/bread-crumb'
import { List } from 'react-content-loader'

const JobListGeneral: React.FC = () => {
  const [listJobNew, setListJobNew] = useState<JobPostingInfo[] | undefined | null>(undefined)

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

  useEffect(() => {
    callApiJobNew()
  }, [])

  return (
    <div className="w-2/3 mx-auto py-32">
      <BreadCrumb title="Việc làm hot nhất & Tin tuyển dụng" />
      <div className="bg-blue-50 shadow mt-10 px-10 py-10 grid-cols-2 grid gap-y-20">
        {/* New */}
        <div className="col-span-2">
          <div className="pl-16 pr-8 grid-cols-2 grid gap-x-8">
            <div className="flex justify-between items-center col-span-2 bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm mới nhất</span>
              <span className="text-white">Xem thêm</span>
            </div>
            {(!listJobNew || listJobNew.length === 0) && <List />}
            {listJobNew &&
              listJobNew.length > 0 &&
              listJobNew.map((item) => {
                const { name, _id, salary, address } = item
                return (
                  <div key={`new_${_id}`} className="col-span-1 grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                    <div className="col-span-1">
                      <Link to={`/jobs/${slugURL(name)}.${_id}`}>
                        <img
                          src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                          alt="logo"
                          className="w-20 h-20"
                        />
                      </Link>
                    </div>
                    <div className="col-span-3">
                      <Link to={`/jobs/${slugURL(name)}.${_id}`} className="block">
                        <span className="block font-bold">{name}</span>
                      </Link>
                      <span className="block">Công ty TNHH ABC</span>
                      <div className="grid-cols-2 grid gap-x-8">
                        <span className="block col-span-1">
                          {salary.salaryFrom} - {salary.salaryTo} {salary.salaryCurrency}
                        </span>
                        <span className="block col-span-1">{address?.label}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Salary */}
        <div className="col-span-1">
          <div className="pl-16 pr-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm lương cao</span>
              <span className="text-white">Xem thêm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Nhân viên kế toán</span>
                    <span className="block">Công ty TNHH ABC</span>
                    <div className="grid-cols-2 grid gap-x-8">
                      <span className="block col-span-1">10 - 15 triệu</span>
                      <span className="block col-span-1">Hà Nội</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Intern */}
        <div className="col-span-1">
          <div className="pr-16 pl-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Tuyển dụng thực tập sinh</span>
              <span className="text-white">Xem thêm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Nhân viên kế toán</span>
                    <span className="block">Công ty TNHH ABC</span>
                    <div className="grid-cols-2 grid gap-x-8">
                      <span className="block col-span-1">10 - 15 triệu</span>
                      <span className="block col-span-1">Hà Nội</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Career */}
        <div className="col-span-1">
          <div className="pl-16 pr-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm theo ngành nghề</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Việc làm Kế toán</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Address */}
        <div className="col-span-1">
          <div className="pr-16 pl-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm theo địa điểm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Việc làm tại Hà Nội</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobListGeneral
