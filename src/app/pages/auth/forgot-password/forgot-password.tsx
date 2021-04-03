import Button from 'app/partials/pr-button'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import LoadingIcon from 'assets/icons/loading.svg'
import BgLogo from 'assets/images/bg-login.png'
import Logo from 'assets/images/logo.png'
import axios, { AxiosRequestConfig } from 'axios'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { showNotify } from '../../../partials/pr-notify/pr-notify'
import { SignInStyle } from './styles'

interface SignInProps {}

export const ForgotPassword: React.FC<SignInProps> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const emailRef = useRef<PrInputRefProps>(null)
  const modalRef = useRef<PrModalRefProps>(null)

  const onShowModal = () => {
    modalRef.current?.show()
  }

  const onHideModal = () => {
    modalRef.current?.hide()
  }

  const callApiForgotPassword = () => {
    const url = `${SERVER_URL}/auth/forgot-password`
    const headers = {
      'Content-Type': 'application/json'
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      timeout: 20000,
      data: {
        email: `${emailRef.current?.getValue()}`
      }
    }

    axios(config)
      .then((response) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error)
        }

        showNotify.success(message)
        modalRef.current?.show()
        setLoading(false)
        emailRef.current?.reset()
      })
      .catch((e) => {
        setLoading(false)
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const validate = () => {
    if (!emailRef.current?.checkRequired()) {
      return false
    }
    const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/
    if (!regexEmail.test(emailRef.current.getValue())) {
      emailRef.current.setErrorMessage('Email không đúng định dạng')
      return false
    }
    return true
  }

  const onGetNewPassword = () => {
    setLoading(true)
    if (!validate()) {
      setLoading(false)
      return
    }
    callApiForgotPassword()
  }

  useEffect(() => {
    document.title = 'CVFREE | Quên mật khẩu'
  }, [])

  return (
    <div className="w-full h-screen overflow-hidden">
      <SignInStyle>
        <div className="grid grid-cols-5 gap-4 h-full w-full">
          <div className="col-span-2 bg-blue-50 h-full">
            <div className="h-1/2 flex justify-center items-center">
              <div className="text-center">
                <img src={Logo} alt="logo" className="block mx-auto w-36" />
                <span className="text-3xl uppercase mt-7 block font-extrabold text-green-700">
                  Hồ sơ trực tuyến miễn phí
                </span>
              </div>
            </div>
            <div className="h-1/2 flex justify-center items-center">
              <img src={BgLogo} className="h-full" alt="bg-login" />
            </div>
          </div>

          <div className="col-span-3 h-full">
            <div className="h-full">
              <div className="h-5/6 flex items-center justify-center">
                <div className="w-2/5">
                  <span className="block text-2xl font-bold text-center">
                    Chào mừng đến với <span className="text-green-600">CVFREE</span>
                  </span>
                  <div className="mt-7">
                    <PrInput
                      placeholder="example@abc.com"
                      label="Nhập email của bạn"
                      icon="fas fa-envelope"
                      required
                      ref={emailRef}
                    />
                  </div>
                  <div className="flex justify-center mt-12">
                    <Button type="success" className="flex items-center" onClick={onGetNewPassword}>
                      <span className="font-semibold">Quên mật khẩu</span>
                      {loading ? (
                        <img src={LoadingIcon} alt="loading" className="w-5 ml-2" />
                      ) : (
                        <i className="ml-2 text-sm fas fa-unlock-alt"></i>
                      )}
                    </Button>
                  </div>
                  <div className="mt-10">
                    <span className="block text-center">
                      Bạn đã có tài khoản?{' '}
                      <Link to="/sign-in" className="text-green-600 font-semibold">
                        Đăng nhập
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-1/6 flex justify-center items-center">
                <span className="text-green-700 font-semibold">2021© CVFREE</span>
                <Link to="/terms-of-use" className="mx-10 text-green-700 font-semibold">
                  Điều khoản sử dụng
                </Link>
                <Link to="/contact" className="text-green-700 font-semibold">
                  Liên hệ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyle>

      <PrModal ref={modalRef} size="nm" onShow={onShowModal} onHide={onHideModal} disableFooter disableHeader>
        <div>
          <div className="flex items-center justify-center my-10">
            <i className="far fa-check-circle text-5xl text-green-600 mr-6"></i>
            <span className="text-xl text-green-700 font-semibold">
              Gửi yêu cầu thành công. Mật khẩu mới đã được gửi tới email của bạn
            </span>
          </div>
          <div className="flex justify-center mb-10">
            <Link
              to="/sign-in"
              className="font-semibold px-4 py-2 text-white duration-150 rounded cursor-pointer bg-green-600 hover:bg-green-700 flex items-center mr-10"
            >
              <span className="font-semibold">Đăng nhập ngay</span>
              <i className="ml-2 fas fa-sign-in-alt"></i>
            </Link>

            <Button onClick={onHideModal} type="danger" className="flex items-center">
              <span className="font-semibold">Trở về</span>
              <i className="fas fa-times ml-2"></i>
            </Button>
          </div>
        </div>
      </PrModal>
    </div>
  )
}
