import { CvFormLayout1, CvFormLayout2 } from 'app/pages/cv/cv-template-create'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { userInfoState } from 'app/states/user-info-state'
import { get } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseCVDetail } from 'models/response-api'
import { CvInfo } from 'models/cv-info'
import { showNotify } from 'app/partials/pr-notify'

export const CvCreate: React.FC = () => {
  const selectedCvTemplate = localStorage.getItem('cv-template-create')
  const modalOutOfTurnRef = useRef<PrModalRefProps>(null)
  const userInfo = useRecoilValue(userInfoState)
  const match = useRouteMatch()
  const cvId = get(match.params, 'id')
  const [cvInfo, setCvInfo] = useState<CvInfo | null>(null)

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
      callApiCvDetail()
    }
  }, [cvId])

  const refreshCvInfo = () => {
    callApiCvDetail()
  }

  const renderCvForm = () => {
    if (selectedCvTemplate === '2' || (cvInfo && cvInfo.template.value === '2')) {
      return cvId ? <CvFormLayout2 cvInfo={cvInfo} refreshCvInfo={refreshCvInfo} /> : <CvFormLayout2 />
    }

    return cvId ? <CvFormLayout1 cvInfo={cvInfo} refreshCvInfo={refreshCvInfo} /> : <CvFormLayout1 />
  }

  useEffect(() => {
    if (userInfo && Number(userInfo?.numberOfCreateCv) < 1 && !cvId) {
      modalOutOfTurnRef.current?.show()
    }
  }, [userInfo])

  return (
    <div>
      {renderCvForm()}

      <PrModal
        title="Thông báo"
        disableX
        ref={modalOutOfTurnRef}
        disableFooter
        onHide={() => modalOutOfTurnRef.current?.hide()}
      >
        <div className="py-20 px-10">
          <span className="block text-center font-semibold text-lg">Bạn đã sử dụng hết số lượt tạo CV</span>
          <div className="mt-16 text-center flex items-center justify-center">
            <Link
              to="/manage-cv"
              className="px-6 py-2.5 rounded-md text-white bg-green-600 text-md font-semibold duration-300 hover:bg-green-700"
            >
              Xem danh sách hồ sơ đã tạo
            </Link>
          </div>
        </div>
      </PrModal>
    </div>
  )
}
