import { BreadCrumb } from 'app/pages/bread-crumb'
import { showNotify } from 'app/partials/pr-notify'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { EmployerInfo } from 'models/employer-info'
import { ResponseEmployerDetail } from 'models/response-api'
import { useEffect, useState } from 'react'
import { List } from 'react-content-loader'
import DefaultAvatarCandidate from 'assets/images/default-avatar-candidate.png'
import moment from 'moment'
import { Link } from 'react-router-dom'

export const EmployerInformation: React.FC = () => {
  const [employerInfo, setEmployerInfo] = useState<EmployerInfo | null>(null)

  const callApiDetail = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/employer/info`
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
      .then((response: AxiosResponse<ResponseEmployerDetail>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setEmployerInfo(data.employerDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    callApiDetail()
  }, [])

  const Layout: React.FC = (props) => {
    return (
      <div className="w-2/3 mx-auto py-32">
        <BreadCrumb title="Thông tin nhà tuyển dụng" />
        <div className="bg-blue-50 mt-10 px-16 py-20 rounded shadow">{props.children}</div>
      </div>
    )
  }

  if (!employerInfo) {
    return <Layout children={<List />} />
  }

  const {
    numberOfCandidateOpening,
    numberOfPosting,
    typeAccount,
    companyId,
    fullname,
    birthday,
    coin,
    gender,
    username,
    email,
    address,
    phone,
    avatar
  } = employerInfo

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-x-8">
        <div className="col-span-1">
          <img src={avatar || DefaultAvatarCandidate} alt="avatar" className="w-40 h-40 block mx-auto" />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-3">
            <span className="col-span-1 block font-medium text-lg">Họ và tên:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{fullname}</span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Ngày sinh:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">
              {moment(birthday).format('DD/MM/YYYY')}
            </span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Giới tính:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">
              {gender === 'MALE' ? 'Nam' : 'Nữ'}
            </span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Điện thoại:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{phone}</span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Email:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{email}</span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Địa chỉ:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{address?.label}</span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Công ty:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{companyId}</span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Tài khoản:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{username}</span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Loại tài khoản:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">
              {typeAccount === 'NORMAL' ? 'Thường' : 'VIP'}
            </span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Số lượt mở ứng viên:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">
              {numberOfCandidateOpening ?? 0} lượt
            </span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Số lượt đăng tuyển dụng:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{numberOfPosting ?? 0} lượt</span>
          </div>
          <div className="grid grid-cols-3 mt-3">
            <span className="col-span-1 block font-medium text-lg">Số tiền còn lại:</span>
            <span className="col-span-2 block font-semibold text-lg text-green-700">{coin ?? 0} VNĐ</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <Link to="/employer/info/update" className="inline-block bg-blue-500 text-white rounded px-4 py-2">
          Cập nhật thông tin
        </Link>
      </div>
    </Layout>
  )
}
