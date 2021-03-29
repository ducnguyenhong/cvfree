import AuthIntro from 'app/pages/auth/auth-intro'
import Button from 'app/partials/pr-button'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input-auth'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify/pr-notify'
import LoadingIcon from 'assets/icons/loading.svg'
import axios, { AxiosRequestConfig } from 'axios'
import { SERVER_URL } from 'constants/index'
import { get } from 'lodash'
import md5 from 'md5'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { checkEmail, checkUsername } from 'utils/helper'
import { UserInfo } from 'models/user-info'
import { SignInStyle } from './employer-sign-in.styles'
import ImgIntro from 'assets/images/img-employer-intro.png'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import { DataGender } from 'constants/data-common'

interface SignUpProps {}

export const EmployerSignIn: React.FC<SignUpProps> = () => {
  const [checkPolicy, setCheckPolicy] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const usernameRef = useRef<PrInputRefProps>(null)
  const passwordRef = useRef<PrInputRefProps>(null)
  const confPasswordRef = useRef<PrInputRefProps>(null)
  const fullnameRef = useRef<PrInputRefProps>(null)
  const emailRef = useRef<PrInputRefProps>(null)
  const phonelRef = useRef<PrInputRefProps>(null)
  const genderRef = useRef<PrDropdownRefProps>(null)
  const companyNameRef = useRef<PrInputRefProps>(null)
  const companyPositionRef = useRef<PrInputRefProps>(null)
  const companyAddressRef = useRef<PrInputRefProps>(null)
  const recruitmentRefRef = useRef<PrDropdownRefProps>(null)
  const modalRef = useRef<PrModalRefProps>(null)

  const validateInput = () => {
    if (!usernameRef.current?.checkRequired()) {
      return false
    }
    if (!passwordRef.current?.checkRequired()) {
      return false
    }
    if (!confPasswordRef.current?.checkRequired()) {
      return false
    }
    if (!emailRef.current?.checkRequired()) {
      return false
    }
    if (!checkPolicy) {
      showNotify.error('Bạn chưa đồng ý với Điều khoản dịch vụ và Chính sách bảo mật!')
      return false
    }
    if (usernameRef.current.getValue().length < 6 || usernameRef.current.getValue().length > 14) {
      usernameRef.current.setErrorMessage('Tài khoản phải từ 6 đến 14 ký tự!')
      return false
    }
    if (!checkUsername(usernameRef.current.getValue())) {
      usernameRef.current.setErrorMessage('Tài khoản phải là chữ cái a-z hoặc số 0-9!')
      return false
    }
    if (passwordRef.current.getValue().length < 6 || passwordRef.current.getValue().length > 14) {
      passwordRef.current.setErrorMessage('Mật khẩu phải từ 6 đến 14 ký tự!')
      return false
    }
    if (passwordRef.current?.getValue() !== confPasswordRef.current.getValue()) {
      confPasswordRef.current.setErrorMessage('Xác nhận mật khẩu không chính xác!')
      return false
    }
    if (!checkEmail(emailRef.current.getValue())) {
      emailRef.current.setErrorMessage('Email không hợp lệ!')
      return false
    }

    return true
  }

  const resetInput = () => {
    usernameRef.current?.reset()
    confPasswordRef.current?.reset()
    passwordRef.current?.reset()
    emailRef.current?.reset()
  }

  const onShowModal = () => {
    modalRef.current?.show()
  }
  const onHideModal = () => {
    modalRef.current?.hide()
  }

  const onSignUp = () => {
    if (!validateInput()) {
      return
    }
    setLoading(true)
    const username = usernameRef.current?.getValue() || ''
    const password = passwordRef.current?.getValue() || ''
    const email = emailRef.current?.getValue() || ''

    const data: UserInfo = {
      username,
      password: md5(password),
      email,
      type: 'USER',
      status: 'ACTIVE',
      seeCV: true,
      findJob: true,
      typeAccount: 'NORMAL'
    }

    callApiCreate(data)
  }

  const callApiCreate = (data: UserInfo) => {
    const url = `${SERVER_URL}/auth/sign-up`
    const headers = {
      'Content-Type': 'application/json'
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data
    }

    axios(config)
      .then((response) => {
        const { success, message } = response.data
        console.log('response.data', response)

        if (!success) {
          throw Error(message.vi)
        }

        showNotify.success('Đăng ký tài khoản thành công!')
        setLoading(false)
        resetInput()
        setTimeout(() => {
          modalRef.current?.show()
        }, 4000)
      })
      .catch((e) => {
        setLoading(false)
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    document.title = 'CVFREE | Đăng ký tài khoản nhà tuyển dụng'
  }, [])

  return (
    <div className="w-full">
      <SignInStyle>
        <div className="grid grid-cols-5 gap-4 h-full w-full pt-16">
          <div className="col-span-2 bg-blue-50 h-full">
            <AuthIntro title="Đăng nhập tài khoản nhà tuyển dụng" bgLogo={ImgIntro} />
          </div>

          <div className="col-span-3 h-full pt-32">
            <div className="h-full">
              <div className="h-5/6 flex items-center justify-center">
                <div className="w-2/5 mt-20">
                  <div className="mt-5">
                    <PrInput label="Tài khoản" icon="fas fa-user-circle" required ref={usernameRef} />
                  </div>
                  <div className="mt-5">
                    <PrInput label="Mật khẩu" type="password" required icon="fas fa-lock" ref={passwordRef} />
                  </div>

                  <div className="flex justify-center mt-10">
                    <Button type="success" className="flex items-center" onClick={onSignUp}>
                      <span className="font-semibold">Đăng nhập</span>
                      {loading ? (
                        <img src={LoadingIcon} alt="loading" className="w-5 ml-2" />
                      ) : (
                        <i className="fas fa-sign-in-alt ml-2 text-sm"></i>
                      )}
                    </Button>
                  </div>
                  <div className="mt-10">
                    <span className="block text-center">
                      Bạn chưa có tài khoản?{' '}
                      <Link to="/employer/sign-up" className="text-green-600 font-semibold">
                        Đăng ký ngay
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignInStyle>
      <PrModal ref={modalRef} size="nm" onShow={onShowModal} onHide={onHideModal} disableFooter disableHeader>
        <div>
          <div className="flex items-center justify-center my-10">
            <i className="far fa-check-circle text-5xl text-green-600 mr-6"></i>
            <span className="text-xl text-green-700 font-semibold">Đăng ký tài khoản thành công</span>
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
