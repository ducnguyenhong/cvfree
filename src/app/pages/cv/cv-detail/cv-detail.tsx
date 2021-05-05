import { useState, useEffect } from 'react'
import { CvDetailTemplate1 } from './cv-detail-template'
import { CvInfo } from 'models/cv-info'
import { useRouteMatch } from 'react-router-dom'
import { get } from 'lodash'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { ResponseCVDetail } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'

const CvDetail: React.FC = () => {
  const [cvInfo, setCvInfo] = useState<CvInfo | null>(null)
  const match = useRouteMatch()
  const cvId = get(match.params, 'id')

  const callApiCvDetail = () => {
    const url = `${SERVER_URL}/cvs/${cvId}`
    const accessToken = Cookies.get('token')
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
      .then((response: AxiosResponse<ResponseCVDetail>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCvInfo(data.cvDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (cvId) {
      console.log('ducnh3')

      callApiCvDetail()
    }
  }, [cvId])

  if (!cvInfo) {
    return <div>Loading</div>
  }

  const { template } = cvInfo

  if (template.value === '1') {
    return <CvDetailTemplate1 data={cvInfo} />
  }

  return <div>a</div>
}

export default CvDetail
