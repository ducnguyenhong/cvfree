import { BreadCrumb } from 'app/pages/bread-crumb'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import { showNotify } from 'app/partials/pr-notify'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { RequestUpdateCompanyInfo } from 'models/request-update-company-info'
import { ResponseRequestUpdateCompanyDetail } from 'models/response-api'
import { useEffect, useState } from 'react'
import { List } from 'react-content-loader'
import { useRouteMatch } from 'react-router-dom'

export const CompanyRequestUpdate: React.FC = () => {
  const [requestInfo, setRequestInfo] = useState<RequestUpdateCompanyInfo | undefined | null>(undefined)
  const match = useRouteMatch()
  const requestId = get(match.params, 'id')

  const callApiCompanyRequestInfo = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/request-update-company/${requestId}`
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
      .then((response: AxiosResponse<ResponseRequestUpdateCompanyDetail>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setRequestInfo(data.requestDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    callApiCompanyRequestInfo()
  }, [])

  useEffect(() => {
    document.title = `CVFREE | Yêu cầu cập nhật thông tin công ty`
  }, [])

  if (typeof requestInfo === 'undefined') {
    return <List />
  }

  if (requestInfo === null) {
    return (
      <div className="w-2/3 mx-auto py-32">
        <BreadCrumb title="Thông tin công ty" />
        <div>Không tồn tại yêu cầu cập nhật công ty</div>
      </div>
    )
  }

  const { name, website, background, personnelSize, address, intro, logo, phone, email } = requestInfo.content
  const { reasonRejectOfAdminCompany } = requestInfo

  return (
    <WrapperPage title="Yêu cầu cập nhật thông tin công ty">
      <div className="px-8 py-10 mt-10">
        <div style={{ aspectRatio: '5/2' }} className="relative">
          <img src={background} alt="background" className="w-full h-full" />
          <img
            src={logo}
            alt="logo"
            className="absolute left-0 right-0 mx-auto w-40 h-40 -bottom-8 overflow-hidden rounded-full bg-white"
          />
        </div>
        <div className="mt-12">
          <span className="block text-center font-semibold text-3xl">{name}</span>
        </div>
        <div className="px-10 mt-10">
          <span className="block font-semibold mb-3">
            - Website:{' '}
            <a href={website} target="_blank" rel="noopener noreferrer" className="font-normal ml-3">
              {website}
            </a>
          </span>

          <span className="block font-semibold mb-3">
            - Điện thoại: <span className="font-normal ml-3">{phone}</span>
          </span>

          <span className="block font-semibold mb-3">
            - Email: <span className="font-normal ml-3">{email}</span>
          </span>

          <span className="block font-semibold mb-3">
            - Quy mô nhân sự: <span className="font-normal ml-3">{personnelSize} người</span>
          </span>

          <span className="block font-semibold mb-3">
            - Địa chỉ: <span className="font-normal ml-3">{address?.label}</span>
          </span>

          <span className="block font-semibold mb-3 text-justify">
            - Giới thiệu: <span className="font-normal ml-3">{intro}</span>
          </span>
        </div>

        {reasonRejectOfAdminCompany && (
          <div className="mt-10">
            <span className="text-red-500">
              * Đã bị từ chối bởi admin của công ty với lý do: {reasonRejectOfAdminCompany}
            </span>
          </div>
        )}
      </div>
    </WrapperPage>
  )
}
