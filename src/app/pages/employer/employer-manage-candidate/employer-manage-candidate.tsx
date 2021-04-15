import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseListCandidateManage } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { CandidateManageInfo } from 'models/candidate-manage-info'
import { slugURL } from 'utils/helper'

export const EmployerManageCandidate: React.FC = () => {
  const [listCandidate, setListCandidate] = useState<CandidateManageInfo[] | null | undefined>(undefined)

  const callApiListCandidateManage = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/candidate-manage`
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
      .then((response: AxiosResponse<ResponseListCandidateManage>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setListCandidate(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    callApiListCandidateManage()
  }, [])

  return (
    <div className="w-2/3 mx-auto py-40">
      <div className="bg-gray-100 py-10 px-10">
        {listCandidate &&
          listCandidate.length > 0 &&
          listCandidate.map((item, index) => {
            const { candidateFullname, cvId, jobId, jobName, isDone } = item
            return (
              <div className="grid grid-cols-5" key={cvId}>
                <div className="col-span-1">{index + 1}</div>
                <div className="col-span-1">
                  <a
                    href={`/cv-public/${slugURL(candidateFullname)}.${cvId}`}
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidateFullname}
                  </a>
                </div>
                <div className="col-span-1">
                  <a
                    href={`/jobs/${slugURL(jobName)}.${jobId}`}
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {jobName}
                  </a>
                </div>
                <div className="col-span-1">
                  {isDone ? <span>Đã tuyển dụng xong</span> : <span>Chưa tuyển dụng</span>}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
