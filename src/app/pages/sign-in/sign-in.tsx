import AuthIntro from 'app/pages/auth-intro'
import Button from 'app/partials/pr-button'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input-auth'
import { showNotify } from 'app/partials/pr-notify'
import { userInfoState, userTokenState } from 'app/states/user-info-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import md5 from 'md5'
import { UserInfo } from 'models/user-info'
import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

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

  const setUserInfoRecoil = useSetRecoilState(userInfoState)
  const setUserTokenRecoil = useSetRecoilState(userTokenState)

  const onSignIn = useCallback(() => {
    const username = usernameRef.current?.getValue() || ''
    const password = passwordRef.current?.getValue() || ''

    const data: DataSignIn = {
      username,
      password: md5(password)
    }

    callApi(data)
  }, [])

  const callApi = (data: DataSignIn) => {
    const url = `${SERVER_URL}/auth/sign-in`
    const headers = {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${accessToken}`
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

        showNotify.success(message)
        setUserInfoRecoil(userInfo)
        setUserTokenRecoil({ token: auth.token, expiredAt: auth.expiredAt })

        // history.push('/')

        // setLoading(false)
        // resetInput()
      })
      .catch((e) => {
        // setLoading(false)
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    document.title = 'CVFREE | Đăng nhập'
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="grid grid-cols-5 gap-4 h-full w-full pt-20">
        <div className="col-span-2 bg-blue-50 h-full pt-20">
          <AuthIntro />
        </div>

        <div className="col-span-3 h-full">
          <div>
            <div className="mx-auto">
              <div className="flex items-center justify-center">
                <div className="w-2/5 mt-24">
                  <span className="block text-2xl font-semibold text-center">
                    Chào mừng đến với
                    <span className="text-green-600"> CVFREE</span>
                  </span>
                  <div className="mt-16">
                    <PrInput label="Tài khoản" icon="fas fa-user" ref={usernameRef} />
                  </div>
                  <div className="mt-5">
                    <PrInput label="Mật khẩu" type="password" icon="fas fa-lock" ref={passwordRef} />
                  </div>
                  <div className="flex justify-center mt-12">
                    <Button type="success" className="flex items-center" onClick={onSignIn}>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg> */}
                      <span className="font-semibold">Đăng nhập</span>
                      <i className="ml-2 fas fa-sign-in-alt"></i>
                      {/* <LoginIcon className="ml-2" /> */}
                      {/* <img src={LoginIcon} className="w-5 mr-2"/>Đăng nhập  */}
                      {/* <img src={LoadingIcon} className="w-5 mr-2"/>Đăng nhập */}
                    </Button>
                  </div>
                  <div className="mt-12">
                    <span className="block text-center">
                      Bạn chưa có tài khoản?{' '}
                      <Link to="/sign-up" className="text-green-600 font-semibold">
                        Đăng ký
                      </Link>
                      <span className="block mt-3">
                        hoặc&nbsp;
                        <Link to="/forgot-password" className="text-green-600 font-semibold">
                          Quên mật khẩu
                        </Link>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-20">
                <span className="text-green-700 font-semibold">2021© CVFREE</span>
                <Link to="/terms-of-use" className="mx-20 text-green-700 font-semibold">
                  Điều khoản sử dụng
                </Link>
                <Link to="/contact" className="text-green-700 font-semibold">
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
