import { Link } from 'react-router-dom'
import { ImageJob } from 'app/partials/image-ratio/home-job-image'
import { useEffect, useState } from 'react'
import { JobPostingInfo } from 'models/job-posting-info'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseListJob } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { List } from 'react-content-loader'
import { slugURL } from 'utils/helper'

const JobHome: React.FC = () => {
  const [listJob, setListJob] = useState<JobPostingInfo[] | null>(null)

  const callApiListJob = () => {
    const url = `${SERVER_URL}/jobs/newest`
    const headers = {
      'Content-Type': 'application/json'
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined,
      timeout: 20000,
      params: {
        page: 1,
        size: 8
      }
    }

    axios(config)
      .then((response: AxiosResponse<ResponseListJob>) => {
        const { success, data, error } = response.data
        if (!success) {
          throw Error(error?.message)
        }
        setListJob(data.items)
      })
      .catch((e) => {
        console.log('ducnh get list job', get(e, 'response.data.error.message'))
      })
  }

  useEffect(() => {
    callApiListJob()
  }, [])

  return (
    <div className=" w-full py-5 pb-24 mt-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 mt-20">
        <div className="text-center">
          <span className="uppercase font-bold text-3xl">Việc làm mới nhất</span>
        </div>
        <div className="grid grid-cols-2 mt-24 gap-x-10 gap-y-10">
          {!listJob || (listJob.length === 0 && <List />)}
          {listJob &&
            listJob.length > 0 &&
            listJob.map((item) => {
              const { name, _id, salary, address, company } = item
              return (
                <div
                  className="col-span-1 one-job flex bg-gray-50 shadow-sm border rounded px-8 py-4 duration-300 hover:shadow hover:bg-gray-200"
                  key={_id}
                >
                  <Link to={`/jobs/${slugURL(name)}.${_id}}`} className="w-24">
                    <ImageJob src={company?.logo} />
                  </Link>
                  <div className="ml-8">
                    <div className="flex items-center">
                      <i className="fas fa-briefcase text-gray-600 mr-2"></i>
                      <Link to={`/jobs/${slugURL(name)}.${_id}}`} className="font-semibold text-lg">
                        {name}
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-building text-gray-600 mr-2"></i>
                      <span>{company?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt text-gray-600 mr-2"></i>
                      <span>{address?.label}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-coins text-gray-600 mr-1"></i>
                      <span>
                        {salary.salaryFrom} - {salary.salaryTo} {salary.salaryCurrency}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="flex justify-center mt-16">
          <Link
            to="/jobs"
            className="px-8 py-2 text-lg bg-blue-500 rounded-md uppercase font-semibold text-white duration-300 hover:bg-blue-600"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </div>
  )
}

export default JobHome
