import AuthIntro from 'app/pages/auth/auth-intro'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input-auth'
import { showNotify } from 'app/partials/pr-notify'
import { userInfoState, userTokenState } from 'app/states/user-info-state'
import LoadingIcon from 'assets/icons/loading.svg'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import md5 from 'md5'
import { UserInfo } from 'models/user-info'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link, useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { checkUsername } from 'utils/helper'
import { v4 as uuid } from 'uuid'
import Cookies from 'js-cookie'

interface SignInProps {}

interface DataSignIn {
  username: string
  password: string
  deviceId?: string
}

interface ResponseSignIn {
  success: boolean
  data: {
    auth: {
      token: string
      expiredAt: number
    }
    userInfo: UserInfo
  }
  code: number
  error?: { message: string }
  message?: string
}

const SignIn: React.FC<SignInProps> = () => {
  const usernameRef = useRef<PrInputRefProps>(null)
  const passwordRef = useRef<PrInputRefProps>(null)
  const history = useHistory()
  const intl = useIntl()
  const [loading, setLoading] = useState<boolean>(false)
  const [disableInput, setDisableInput] = useState<boolean>(false)
  const setUserInfoRecoil = useSetRecoilState(userInfoState)
  const setUserTokenRecoil = useSetRecoilState(userTokenState)

  const validate = () => {
    if (!usernameRef.current?.checkRequired()) {
      return false
    }
    if (!passwordRef.current?.checkRequired()) {
      return false
    }
    if (
      usernameRef.current.getValue() !== 'admin' &&
      (usernameRef.current.getValue().length < 6 || usernameRef.current.getValue().length > 14)
    ) {
      usernameRef.current.setErrorMessage('Tài khoản phải từ 6 đến 14 ký tự!')
      return false
    }
    if (!checkUsername(usernameRef.current.getValue())) {
      usernameRef.current.setErrorMessage('Tài khoản phải là chữ cái a-z hoặc số 0-9!')
      return false
    }
    return true
  }

  const onSignIn = (e: any) => {
    e.preventDefault()
    setDisableInput(true)
    setLoading(true)
    if (!validate()) {
      setDisableInput(false)
      setLoading(false)
      return null
    }
    const username = usernameRef.current?.getValue() || ''
    const password = passwordRef.current?.getValue() || ''
    let deviceId = localStorage.getItem('device-id')
    if (!deviceId) {
      deviceId = uuid()
      localStorage.setItem('device-id', deviceId)
    }

    const data: DataSignIn = {
      username,
      password: md5(password),
      deviceId
    }

    callApiSignIn(data)
  }

  const callApiSignIn = (data: DataSignIn) => {
    const url = `${SERVER_URL}/auth/sign-in`
    const headers = {
      'Content-Type': 'application/json'
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseSignIn>) => {
        const { success, data, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }

        const { auth, userInfo } = data
        setLoading(false)
        setDisableInput(false)
        showNotify.success(intl.formatMessage({ id: `API.${message}` }))
        setUserInfoRecoil(userInfo)
        setUserTokenRecoil({ token: auth.token, expiredAt: auth.expiredAt })
        Cookies.set('gtm-uid', `${userInfo.id}`)

        const redirectTo = localStorage.getItem('redirect-to')
        if (redirectTo) {
          history.push(redirectTo)
          localStorage.removeItem('redirect-to')
        }
        if (!redirectTo) {
          if (userInfo.type === 'USER') {
            history.push('/')
          }
          if (userInfo.type === 'EMPLOYER') {
            history.push('/employer')
          }
          if (userInfo.type === 'ADMIN') {
            history.push('/dashboard')
          }
        }
      })
      .catch((e) => {
        setLoading(false)
        setDisableInput(false)
        showNotify.error(
          e ? intl.formatMessage({ id: `API.${get(e, 'response.data.error.message')}` }) : 'Lỗi hệ thống!'
        )
      })
  }

  useEffect(() => {
    document.title = `CVFREE | ${intl.formatMessage({ id: 'AUTH.SIGN_IN' })}`
  }, [])

  return (
    <div className="w-full bg-white h-full">
      <div className="grid grid-cols-5 gap-4 h-full w-full">
        <div className="col-span-2">
          <AuthIntro title={intl.formatMessage({ id: 'AUTH.SIGN_IN_ACCOUNT' })} />
        </div>

        <div className="col-span-3">
          <div>
            <div className="mx-auto">
              <div className="flex items-center justify-center">
                <form onSubmit={disableInput ? undefined : onSignIn} className="block w-2/5 pt-48">
                  <div className="mt-16">
                    <PrInput
                      label={intl.formatMessage({ id: 'AUTH.USERNAME' })}
                      disable={disableInput}
                      icon="fas fa-user"
                      ref={usernameRef}
                    />
                  </div>
                  <div className="mt-5">
                    <PrInput
                      label={intl.formatMessage({ id: 'AUTH.PASSWORD' })}
                      type="password"
                      icon="fas fa-lock"
                      disable={disableInput}
                      ref={passwordRef}
                    />
                  </div>
                  <div className="flex justify-center mt-12">
                    <button
                      type="submit"
                      className={`${
                        disableInput ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
                      } flex items-center text-white px-4 py-2 rounded focus:outline-none duration-300`}
                    >
                      <span className="font-semibold">{intl.formatMessage({ id: 'AUTH.SIGN_IN' })}</span>
                      {loading ? (
                        <img src={LoadingIcon} alt="loading" className="w-5 ml-2" />
                      ) : (
                        <i className="fas fa-sign-out-alt ml-2"></i>
                      )}
                    </button>
                  </div>
                  <div className="mt-12">
                    <span className="block text-center">
                      {intl.formatMessage({ id: 'AUTH.NO_HAVE_ACCOUNT' })}{' '}
                      <Link to="/sign-up" className="text-green-600 font-semibold">
                        {intl.formatMessage({ id: 'AUTH.SIGN_UP' })}
                      </Link>
                      <span className="block mt-3">
                        hoặc&nbsp;
                        <Link to="/forgot-password" className="text-green-600 font-semibold">
                          {intl.formatMessage({ id: 'AUTH.FORGOT_PASSWORD' })}
                        </Link>
                      </span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
