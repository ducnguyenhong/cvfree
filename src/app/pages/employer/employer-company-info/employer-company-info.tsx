import { showNotify } from 'app/partials/pr-notify'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseCompanyDetail } from 'models/response-api'
import { useEffect, useState } from 'react'
import { CompanyInfo } from 'models/company-info'
import { List } from 'react-content-loader'
import { BreadCrumb } from 'app/pages/bread-crumb'
import { Link } from 'react-router-dom'
import { DropdownAsync } from 'app/partials/dropdown-async'

export const EmployerCompanyInfo: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | undefined | null>(undefined)

  const callApiCompanyInfo = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/company/detail`
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
                urlApi={`/company/suggest`}
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

  return (
    <div className="w-2/3 mx-auto py-32">
      <BreadCrumb title="Thông tin công ty" />
      <div className="bg-blue-50 shadow px-8 py-10 mt-10">
        <div style={{ aspectRatio: '5/2' }} className="relative">
          <img
            src="https://scontent.fhan5-3.fna.fbcdn.net/v/t1.0-9/s960x960/72411195_2511782889102410_8447476148903870464_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=e3f864&_nc_ohc=JD8ct1Z9AQgAX-BdWx2&_nc_ht=scontent.fhan5-3.fna&tp=7&oh=b43918a30a6b9ea4a7d119a563eb654e&oe=60894256"
            alt="background"
            className="w-full h-full"
          />
          <img
            src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
            alt="logo"
            className="absolute left-0 right-0 mx-auto w-40 h-40 -bottom-8 overflow-hidden rounded-full bg-white"
          />
        </div>
        <div className="mt-12">
          <span className="block text-center font-semibold text-3xl">Công ty TNHH ABC</span>
        </div>
        <div className="px-10 mt-10">
          <span className="block uppercase text-xl font-bold">1. Thông tin công ty</span>
          <span className="block">Website: http://abc.com.vn</span>
          <span className="block">Quy mô nhân sự: 10 - 100 người</span>
          <span className="block">Địa chỉ: 1130 Đê La Thành, Ba Đình, Hà Nội</span>
          <span className="block">
            Giới thiệu: Là thành viên thuộc Tập đoàn công nghệ hàng đầu Việt Nam FPT, Công ty Cổ phần Viễn thông FPT
            (tên gọi tắt là FPT Telecom) hiện là một trong những nhà cung cấp dịch vụ viễn thông và Internet có uy tín
            và được khách hàng yêu mến tại Việt Nam và khu vực.
          </span>
          <span className="block uppercase text-xl font-bold mt-10">2. Việc làm tuyển dụng</span>
          <div className="mt-10">
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item}>
                  <div className="py-8">
                    <span className="block uppercase text-md font-semibold">Fresher Frontend Developer</span>
                    <div className="grid grid-cols-4 mt-3">
                      <span className="block col-span-1">30/05/2021</span>
                      <span className="block col-span-1">10 - 15 triệu</span>
                      <span className="block col-span-1">Toàn thời gian</span>
                      <span className="block col-span-1">Hà Nội</span>
                    </div>
                  </div>
                  <hr />
                </div>
              )
            })}
          </div>
          <div className="pb-20 flex justify-center mt-12">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                4
              </a>
              <a
                href="#"
                className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                5
              </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
