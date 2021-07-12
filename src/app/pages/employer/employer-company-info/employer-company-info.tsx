import { DropdownAsync, DropdownAsyncRef } from 'app/partials/dropdown-async'
import { showNotify } from 'app/partials/pr-notify'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CompanyInfo } from 'models/company-info'
import { ResponseCompanyDetail, ResponseUserDetail } from 'models/response-api'
import { useEffect, useRef, useState } from 'react'
import { List } from 'react-content-loader'
import { Link } from 'react-router-dom'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import BackgroundDefault from 'assets/images/bg-default-company.jpg'
import LogoDefault from 'assets/images/default.png'

import { useRecoilState } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'

export const EmployerCompanyInfo: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | undefined | null>(null)
  const [showBtnRegister, setShowBtnRegister] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const companyRegisterRef = useRef<DropdownAsyncRef>(null)

  const callApiCompanyInfo = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/companies/employer`
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
      .then((response: AxiosResponse<ResponseCompanyDetail>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCompanyInfo(data.companyDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onUpdateCompanyInfo = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/employer/update-company`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data: {
        companyId: companyRegisterRef.current?.getValue()[0].value
      },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseUserDetail>) => {
        const { success, data, error, message } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        showNotify.success(message)
        if (userInfo) {
          setUserInfo({ ...userInfo, companyId: data.userDetail.companyId || '' })
        }
        callApiCompanyInfo()
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (userInfo?.companyId) {
      callApiCompanyInfo()
    }
  }, [userInfo])

  useEffect(() => {
    document.title = `CVFREE | Thông tin công ty`
  }, [])

  if (typeof companyInfo === 'undefined') {
    return <List />
  }

  if (companyInfo === null) {
    return (
      <WrapperPage title="Thông tin công ty">
        <div className="bg-white px-8 pt-20 pb-60 mt-10">
          <span className="block text-xl font-semibold text-center">Bạn chưa cập nhật thông tin công ty của bạn</span>
          <div className="flex items-center justify-center mt-20">
            <span className="block bg-purple-500 text-white px-4 font-semibold rounded-md py-2 duration-300 hover:bg-purple-600">
              Chọn công ty trong danh sách
            </span>
            <span className="block mx-10 font-medium">hoặc</span>
            <Link
              to="/employer/register-company"
              className="px-4 py-2 bg-green-500 rounded-md duration-300 hover:bg-green-600"
            >
              <span className="text-white font-semibold">Đăng ký công ty mới</span>
            </Link>
          </div>
          <div className="mt-16 w-1/2 mx-auto">
            <div>
              <DropdownAsync
                ref={companyRegisterRef}
                label="Danh sách công ty đã có trong hệ thống"
                urlApi={`/companies/suggest`}
                onChange={(e) => {
                  if (e) {
                    setShowBtnRegister(true)
                  }
                }}
              />
            </div>
          </div>
          <div className="mt-10 text-center">
            {showBtnRegister && (
              <span
                onClick={onUpdateCompanyInfo}
                className="bg-purple-600 text-white px-4 cursor-pointer font-semibold py-3 rounded duration-300 hover:bg-purple-700"
              >
                Cập nhật công ty
              </span>
            )}
          </div>
        </div>
      </WrapperPage>
    )
  }

  const { name, website, background, personnelSize, address, intro, logo, _id, phone, email } = companyInfo

  return (
    <WrapperPage title="Thông tin công ty">
      <div className="bg-white px-8 py-10 mt-10">
        <div className="grid grid-cols-3 gap-x-10">
          <div className="text-right mb-10 col-span-1 flex items-center justify-center">
            <a
              href={`/companies/${_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-300 block px-6 py-2.5 rounded font-semibold hover:bg-gray-200 duration-300"
            >
              <i className="fas fa-eye mr-3 text-gray-600" />
              <span className="text-gray-700">Thông tin công ty ở chế độ công khai</span>
            </a>
          </div>
          {userInfo?.isAdminOfCompany && (
            <>
              <div className="text-right mb-10 col-span-1 flex items-center justify-center">
                <Link
                  to={`/employer/request-update-company`}
                  className="bg-gray-300 px-6 block py-2.5 rounded font-semibold hover:bg-gray-200 duration-300"
                >
                  <i className="fas fa-building mr-3 text-gray-600" />
                  <span className="text-gray-700">Yêu cầu cập nhật thông tin</span>
                </Link>
              </div>
              <div className="text-right mb-10 col-span-1 flex items-center justify-center">
                <Link
                  to={`/employer/staffs-of-company`}
                  className="bg-gray-300 block px-6 py-2.5 rounded font-semibold hover:bg-gray-200 duration-300"
                >
                  <i className="fas fa-users mr-3 text-gray-600" />
                  <span className="text-gray-700">Danh sách nhà tuyển dụng</span>
                </Link>
              </div>
            </>
          )}
        </div>
        <div style={{ aspectRatio: '5/2' }} className="relative mt-10">
          <img src={background || BackgroundDefault} alt="background" className="w-full h-full" />
          <img
            src={logo || LogoDefault}
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
            - Số điện thoại: <span className="font-normal ml-3">{phone}</span>
          </span>

          <span className="block font-semibold mb-3">
            - Email: <span className="font-normal ml-3">{email}</span>
          </span>

          <span className="block font-semibold mb-3">
            - Quy mô nhân sự: <span className="font-normal ml-3">{personnelSize} người</span>
          </span>

          <span className="block font-semibold mb-3">
            - Địa chỉ: <span className="font-normal ml-3">{address.label}</span>
          </span>

          <span className="block font-semibold mb-3 text-justify">
            - Giới thiệu: <span className="font-normal ml-3">{intro}</span>
          </span>
        </div>
        <div className="text-center my-20">
          <Link
            to="/update-company"
            className="px-4 py-3 rounded text-white bg-blue-500 font-semibold cursor-pointer duration-300 hover:bg-blue-600"
          >
            {userInfo?._id === companyInfo.creatorId ? 'Chỉnh sửa thông tin' : 'Gửi yêu cầu chỉnh sửa thông tin'}
          </Link>
        </div>
      </div>
    </WrapperPage>
  )
}
