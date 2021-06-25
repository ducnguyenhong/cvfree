import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import Cookies from 'js-cookie'
import { useEffect, useRef, useState } from 'react'
import md5 from 'md5'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseDefault } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { useIntl } from 'react-intl'

export const ChangePassword: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const oldPasswordRef = useRef<PrInputRefProps>(null)
  const newPasswordRef = useRef<PrInputRefProps>(null)
  const confPasswordRef = useRef<PrInputRefProps>(null)
  const intl = useIntl()

  const validate = () => {
    if (!oldPasswordRef.current?.checkRequired()) {
      return false
    }
    if (!newPasswordRef.current?.checkRequired()) {
      return false
    }
    if (!confPasswordRef.current?.checkRequired()) {
      return false
    }
    if (newPasswordRef.current.getValue().length < 6 || newPasswordRef.current.getValue().length > 14) {
      newPasswordRef.current.setErrorMessage('Mật khẩu phải từ 6 đến 14 ký tự!')
      return false
    }
    if (newPasswordRef.current.getValue() !== confPasswordRef.current.getValue()) {
      confPasswordRef.current.setErrorMessage('Xác nhận mật khẩu chính xác!')
      return false
    }
    return true
  }

  const callApiUpdate = (data: any) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/users/change-password`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'PUT',
      headers,
      url,
      data,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        showNotify.success(intl.formatMessage({ id: `API.${message}` }))
      })
      .catch((e) => {
        setErrorMessage(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onChangePassword = async () => {
    if (!validate()) {
      return
    }

    const oldPassword = oldPasswordRef.current?.getValue() || ''
    const newPassword = newPasswordRef.current?.getValue() || ''

    const data = {
      oldPassword: md5(oldPassword),
      newPassword: md5(newPassword)
    }

    callApiUpdate(data)
  }

  useEffect(() => {
    document.title = `CVFREE | Đổi mật khẩu`
  }, [])

  return (
    <WrapperPage title="Cập nhật thông tin cá nhân">
      <div className="mt-10 px-10 pt-20 pb-32 rounded-md mx-auto w-2/3">
        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">
              Nhập mật khẩu cũ <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrInput
                type="password"
                ref={oldPasswordRef}
                maxLength={255}
                onChange={(e) => {
                  e && setErrorMessage('')
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">
              Nhập mật khẩu mới <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrInput
                type="password"
                ref={newPasswordRef}
                maxLength={255}
                onChange={(e) => {
                  e && setErrorMessage('')
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">
              Xác nhận mật khẩu mới <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrInput
                type="password"
                ref={confPasswordRef}
                maxLength={255}
                onChange={(e) => {
                  e && setErrorMessage('')
                }}
              />
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-20">
            <span className="text-red-500 block text-center font-semibold">{errorMessage}</span>
          </div>
        )}
        <div className="text-center mt-20">
          <span
            onClick={onChangePassword}
            className="cursor-pointer text-white px-6 py-3 rounded bg-blue-500 font-semibold text-md duration-300 hover:bg-blue-600"
          >
            <i className="fas fa-lock mr-2 text-white" />
            Đổi mật khẩu
          </span>
        </div>
      </div>
    </WrapperPage>
  )
}
