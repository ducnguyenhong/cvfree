import { get } from 'lodash'
import { useEffect, useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig } from 'axios'
import { checkSpecialCharacter } from 'utils/helper'

export const VerifyAccount: React.FC = () => {
  const match = useRouteMatch()
  const userId = atob(get(match.params, 'id'))
  const [error, setError] = useState<string>('')
  const [isVerify, setIsVerify] = useState<'checking' | 'verified' | 'not_verify'>('checking')
  const history = useHistory()

  const callApiVerify = () => {
    const url = `${SERVER_URL}/auth/verify`
    const headers = {
      'Content-Type': 'application/json'
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      timeout: 20000,
      data: { userId }
    }

    axios(config)
      .then((response) => {
        const { success, error } = response.data

        if (!success) {
          throw Error(error)
        }
        setIsVerify('verified')
        setTimeout(() => {
          history.push('/sign-in')
        }, 5000)
      })
      .catch((e) => {
        setIsVerify('not_verify')
        setError(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (userId) {
      callApiVerify()
    }
  }, [userId])

  if (isVerify === 'checking') {
    return (
      <div className="py-52 w-2/5 mx-auto">
        <div className="bg-yellow-100 rounded-md shadow px-10 py-20">
          <div className="flex justify-center items-center">
            <i className="fas fa-spinner mr-4 text-yellow-600 text-xl"></i>
            <span className="block text-center text-xl font-semibold uppercase text-yellow-600">
              Đang xác thực tài khoản
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (checkSpecialCharacter(userId) || isVerify === 'not_verify') {
    return (
      <div className="py-52 w-2/5 mx-auto">
        <div className="bg-red-100 rounded-md shadow px-10 py-20">
          <div className="flex justify-center items-center">
            <i className="far fa-times-circle mr-4 text-red-600 text-xl"></i>
            <span className="block text-center text-xl font-semibold uppercase text-red-600">
              Không thể xác thực tài khoản của bạn
            </span>
          </div>
          <span className="block text-center mt-10 font-medium">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="py-52 w-2/5 mx-auto">
      <div className="bg-green-100 rounded-md shadow px-10 py-20">
        <div className="flex justify-center items-center">
          <i className="fas fa-check-circle mr-4 text-green-600 text-xl"></i>
          <span className="block text-center text-xl font-semibold uppercase text-green-600">
            Tài khoản của bạn đã được xác thực
          </span>
        </div>
        <span className="block text-center mt-10 font-medium">Đang chuyển hướng tới trang đăng nhập...</span>
      </div>
    </div>
  )
}
