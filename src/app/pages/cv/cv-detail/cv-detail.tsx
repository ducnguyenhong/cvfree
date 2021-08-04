import { useState, useEffect } from 'react'
import { CvDetailTemplate1, CvDetailTemplate2, CvDetailTemplate3 } from './cv-detail-template'
import { CvInfo } from 'models/cv-info'
import { useRouteMatch } from 'react-router-dom'
import { get, upperFirst } from 'lodash'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseCVDetail } from 'models/response-api'
import { List } from 'react-content-loader'

const CvDetail: React.FC = () => {
  const [cvInfo, setCvInfo] = useState<CvInfo | null | undefined>(undefined)
  const match = useRouteMatch()
  const cvId = get(match.params, 'id')
  const [isPublicCv, setIsPublicCv] = useState<boolean>(false)

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
        if (get(e, 'response.data.error.message') === 'PRIVATE_CV') {
          setIsPublicCv(true)
        }
        setCvInfo(null)
      })
  }

  useEffect(() => {
    if (cvId) {
      callApiCvDetail()
    }
  }, [cvId])

  useEffect(() => {
    if (cvInfo) {
      const userFullname = cvInfo.detail.fullname.split(' ').reduce((prev, curr) => {
        let name = ''
        name += upperFirst(curr)
        return `${prev} ${name}`
      }, '')
      document.title = `CVFREE | ${userFullname}`
    }
  }, [cvInfo])

  if (typeof cvInfo === 'undefined') {
    return <List />
  }

  if (cvInfo === null) {
    if (isPublicCv) {
      return (
        <div className="w-full bg-gray-200 h-screen p-32">
          <div className="bg-white rounded-xl shadow-xl py-40">
            <span className="uppercase block text-center text-3xl font-bold text-red-500">
              CV này hiện đang ở trạng thái riêng tư
            </span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="w-full bg-gray-200 h-screen p-32">
          <div className="bg-white rounded-xl shadow-xl py-40">
            <span className="uppercase block text-center text-3xl font-bold text-red-500">Không tồn tại CV</span>
          </div>
        </div>
      )
    }
  }

  const { template } = cvInfo

  if (template.value === '2') {
    return <CvDetailTemplate2 data={cvInfo} />
  }

  if (template.value === '3') {
    return <CvDetailTemplate3 data={cvInfo} />
  }

  return <CvDetailTemplate1 data={cvInfo} />
}

export default CvDetail
