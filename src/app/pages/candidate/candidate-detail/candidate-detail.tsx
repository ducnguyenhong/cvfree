import { get } from 'lodash'
import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { ResponseCandidateDetail } from 'models/response-api'
import { CandidateInfo } from 'models/candidate-info'
import { showNotify } from 'app/partials/pr-notify'
import { List } from 'react-content-loader'
import moment from 'moment'

export const CandidateDetail: React.FC = () => {
  const match = useRouteMatch()
  const candidateId = get(match.params, 'id')
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(null)

  const callApiDetail = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/candidate/${candidateId}`
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
      .then((response: AxiosResponse<ResponseCandidateDetail>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCandidateInfo(data.candidateDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  console.log('ducnh2', candidateInfo)

  useEffect(() => {
    if (candidateId) {
      callApiDetail()
    }
  }, [candidateId])

  if (!candidateInfo) {
    return (
      <div className="py-40 w-2/3 mx-auto shadow-md rounded-md bg-gray-100 px-10">
        <List />
      </div>
    )
  }

  const { avatar, fullname, birthday, gender, applyPosition } = candidateInfo

  return (
    <div className="w-2/3 mx-auto py-40">
      <div className="bg-gray-100">
        <div className="grid grid-cols-4 gap-x-8">
          <div className="col-span-1 px-4">
            <img src={avatar} alt="avatar" className="rounded-full block" />
          </div>
          <div className="col-span-3">
            <span className="block">
              {fullname}{' '}
              <span className="ml-3">
                {gender === 'MALE' ? (
                  <i className="fas fa-mars text-blue-500"></i>
                ) : (
                  <i className="fas fa-venus text-pink-500"></i>
                )}
              </span>
            </span>
            <span className="block">{moment().diff(birthday, 'years')} tuổi</span>
            <span className="block font-medium">{applyPosition}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
