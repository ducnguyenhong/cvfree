import { WrapperPage } from 'app/partials/layout/wrapper-page'
import { JobPostingInfo } from 'models/job-posting-info'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseListJob } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { slugURL } from 'utils/helper'
import { Link, useRouteMatch } from 'react-router-dom'
import { List } from 'react-content-loader'
import { Pagination, PaginationType } from 'app/partials/layout/pagination'
import { DataCity, CityType } from 'constants/data-job'

export const JobListLocation: React.FC = () => {
  const match = useRouteMatch()
  const cityRoute = get(match.params, 'cityRoute')
  const city = DataCity.find((item) => item.route === cityRoute)
  const [listJob, setListJob] = useState<JobPostingInfo[] | undefined | null>(undefined)
  const [pagination, setPagination] = useState<PaginationType | undefined>(undefined)

  const callApiJobList = (city: CityType) => {
    const url = `${SERVER_URL}/jobs/city/${city.value}`
    const headers = {
      'Content-Type': 'application/json'
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined,
      timeout: 20000,
      params: { page: 1, size: 20 }
    }

    axios(config)
      .then((response: AxiosResponse<ResponseListJob>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setListJob(data.items)
        setPagination(data.pagination)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    city && callApiJobList(city)
  }, [city])

  useEffect(() => {
    if (city) {
      document.title = `CVFREE | Việc làm tại ${city.label}`
    }
  }, [city])

  if (!listJob) {
    return <List />
  }

  if (listJob.length === 0) {
    return (
      <WrapperPage title={`Việc làm tại ${city?.label}`}>
        <div className="py-20">
          <span className="block text-center font-medium text-xl">Chưa có việc làm</span>
        </div>
      </WrapperPage>
    )
  }

  return (
    <WrapperPage title={`Việc làm tại ${city?.label}`}>
      <div className="py-20">
        <div className="px-10 grid-cols-2 grid gap-x-8 gap-y-4">
          <div className="flex justify-between items-center col-span-2 bg-green-600 px-4 py-4">
            <span className="block text-white uppercase font-semibold">
              <i className="fas fa-map-marker-alt mr-3" />
              {`Việc làm tại ${city?.label}`}
            </span>
          </div>

          {listJob &&
            listJob.length > 0 &&
            listJob.map((item) => {
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
                          ? `${salary.salaryFrom?.replaceAll('.', '')} - ${salary.salaryTo?.replaceAll('.', '')} ${
                              salary.salaryCurrency
                            }`
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
        <Pagination pagination={pagination} />
      </div>
    </WrapperPage>
  )
}
