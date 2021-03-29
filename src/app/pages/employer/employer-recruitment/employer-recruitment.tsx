import { useState, useEffect, useCallback, useRef } from 'react'
import { CvInfo } from 'models/cv-info'
import moment from 'moment'
import { slugURL, getDefaultAvatar } from 'utils/helper'
import { Link } from 'react-router-dom'
import { RadioButton } from 'app/partials/layout/radio-button'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseListCV, ResponseDelete } from 'models/response-api'
import Cookies from 'js-cookie'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'

export const EmployerRecruitment: React.FC = () => {
  const [cvList, setCvList] = useState<CvInfo[] | null>(null)
  const userInfo = useRecoilValue(userInfoState)
  const [deleteCvId, setDeleteCvId] = useState<string>('')
  const modalDelete = useRef<PrModalRefProps>(null)

  const onShowDeleteCv = (id?: string) => {
    id && setDeleteCvId(id)
    modalDelete.current?.show()
  }

  const onDeleteCv = () => {
    callApiDeleteCv()
  }

  const onHideDeleteCv = () => {
    setDeleteCvId('')
    modalDelete.current?.hide()
  }

  const callApiListCv = useCallback(() => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/cvs/my-cvs`
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
      .then((response: AxiosResponse<ResponseListCV>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCvList(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }, [])

  const callApiDeleteCv = useCallback(() => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/cvs/${deleteCvId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers,
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDelete>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        onHideDeleteCv()
        showNotify.success(message)
      })
      .catch((e) => {
        onHideDeleteCv()
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }, [deleteCvId])

  useEffect(() => {
    callApiListCv()
  }, [])

  if (!cvList || !userInfo) {
    return <div>Loading</div>
  }

  const { fullname, username, seeCV, findJob, typeAccount, avatar, gender } = userInfo

  return (
    <div className="bg-green-100 py-32 w-full">
      <div className="grid grid-cols-3 w-2/3 mx-auto gap-x-6 rounded">
        <div className="col-span-2 bg-white shadow-md border-gray-300 px-8 py-10">
          <div className="flex justify-between items-center">
            <span className="block uppercase text-xl font-bold text-gray-700">Danh sách tin tuyển dụng đã đăng</span>
            <Link
              to="/employer/create-job-postings"
              className="px-4 py-1.5 block bg-green-500 rounded-md duration-300 hover:bg-green-600"
            >
              <i className="fas fa-plus mr-3 text-white" />
              <span className="text-white font-semibold">Đăng tin tuyển dụng</span>
            </Link>
          </div>
          <div className="mange-list-cv mt-10">
            {cvList &&
              cvList.length > 0 &&
              cvList.map((item, index) => {
                const { name, _id, detail, createdAt, updatedAt } = item
                const { fullname } = detail
                return (
                  <div
                    className="py-5 items-center gap-x-4 border border-dashed border-gray-300 rounded mb-12"
                    key={`cv_${index}`}
                  >
                    <div>
                      <div>
                        <span className="block text-center font-bold text-xl text-green-600">
                          {name || `CV${index + 1}`}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <span className="whitespace-nowrap overflow-ellipsis overflow-hidden italic text-blue-800 pr-2">
                            http://localhost:1112/cv-public/{slugURL(fullname)}.{`${_id}`}
                          </span>
                          <i
                            title="Sao chép"
                            className="fas fa-copy ml-3 text-md cursor-pointer text-gray-400 hover:text-gray-500 duration-300"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `http://localhost:1112/cv-public/${slugURL(fullname)}.${`${_id}`}`
                              )
                            }}
                          ></i>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between">
                          <div>
                            <i className="far fa-clock mr-2"></i>
                            <span>Ngày tạo</span>
                          </div>
                          <span className="block">
                            {createdAt && moment(createdAt * 1000).format('DD/MM/YYYY HH:mm')}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between">
                          <div>
                            <i className="fas fa-history mr-2"></i>
                            <span>Ngày sửa</span>
                          </div>
                          <span className="block">
                            {updatedAt && moment(updatedAt * 1000).format('DD/MM/YYYY HH:mm')}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-16 mt-5">
                        <Link
                          to={`/cv-public/${slugURL(fullname)}.${_id}`}
                          className="col-span-1 bg-green-600 py-1 rounded flex justify-center items-center hover:bg-green-700 duration-300"
                        >
                          <i className="fas fa-eye mr-2 text-white"></i>
                          <span className="text-white">Xem</span>
                        </Link>
                        <Link
                          to="/edit-cv/"
                          className="col-span-1 py-1 bg-purple-700 rounded flex justify-center items-center hover:bg-purple-800 duration-300"
                        >
                          <i className="fas fa-edit mr-2 text-white"></i>
                          <span className="text-white">Sửa</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="col-span-1 bg-white shadow-md py-10 px-8">
          <span className="block uppercase text-xl font-semibold text-gray-700">Thông tin cá nhân</span>
          <div className="mt-8">
            <div className="grid grid-cols-3 gap-x-4 mt-5">
              <div className="col-span-1 px-3">
                <img
                  src={avatar || getDefaultAvatar(gender)}
                  // https://www.flaticon.com/svg/vstatic/svg/3135/3135789.svg?token=exp=1615960752~hmac=84a9bb6fb70fe5bdab317b81b776b7de
                  alt="avatar"
                  className=""
                />
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-lg">{fullname || username}</span>
                <div className="mt-2 mb-3">
                  <span>Tài khoản {`${typeAccount === 'VIP' ? 'VIP' : 'thường'}`}</span>
                  <i className="fas fa-circle-check" />
                </div>
                <span className="bg-green-600 px-3 py-1 text-sm font-medium cursor-pointer rounded text-white">
                  Nâng cấp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PrModal title="Xác nhận xóa CV này" onChange={onDeleteCv} onHide={onHideDeleteCv} ref={modalDelete}>
        <div>Xác nhận xóa CV này ?</div>
      </PrModal>
    </div>
  )
}
