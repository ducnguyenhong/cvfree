import { BreadCrumb } from 'app/pages/bread-crumb'
import { DropdownAsync } from 'app/partials/dropdown-async'
import { showNotify } from 'app/partials/pr-notify'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CompanyInfo } from 'models/company-info'
import { ResponseCompanyDetail } from 'models/response-api'
import { useEffect, useState } from 'react'
import { List } from 'react-content-loader'
import { Link } from 'react-router-dom'

export const EmployerCompanyInfo: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | undefined | null>(undefined)

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

  useEffect(() => {
    callApiCompanyInfo()
  }, [])

  if (typeof companyInfo === 'undefined') {
    return <List />
  }

  if (companyInfo === null) {
    return (
      <div className="w-2/3 mx-auto py-32">
        <BreadCrumb title="Thông tin công ty" />
        <div className="bg-blue-50 shadow px-8 pt-20 pb-72 mt-10">
          <span className="block text-xl font-semibold text-center">Bạn chưa cập nhật thông tin công ty của bạn</span>
          <div className="flex items-center justify-center mt-10">
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
                label="Danh sách công ty đã có trong hệ thống"
                urlApi={`/companies/suggest`}
                onChange={(e) => {
                  console.log(e)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { name, website, background, personnelSize, address, intro, logo } = companyInfo

  return (
    <div className="w-2/3 mx-auto py-32">
      <BreadCrumb title="Thông tin công ty" />
      <div className="bg-blue-50 shadow px-8 py-10 mt-10">
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
          <span className="block">Website: {website}</span>
          <span className="block">Quy mô nhân sự: {personnelSize} người</span>
          <span className="block">
            Địa chỉ: {address.street}, {address.label}
          </span>
          <span className="block">{intro}</span>
        </div>
        <div className="text-center my-10">
          <span className="px-4 py-2 rounded text-white bg-blue-500">Gửi yêu cầu chỉnh sửa thông tin</span>
        </div>
      </div>
    </div>
  )
}
