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
import { SignInStyle } from './employer-sign-up.styles'
import ImgIntro from 'assets/images/img-employer-intro.png'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import { DataCareer } from 'constants/data-employer'
import { DataGender } from 'constants/data-common'
import { useIntl } from 'react-intl'

interface SignUpProps {}

export const EmployerSignUp: React.FC<SignUpProps> = () => {
  const [checkPolicy, setCheckPolicy] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const intl = useIntl()
  const usernameRef = useRef<PrInputRefProps>(null)
  const passwordRef = useRef<PrInputRefProps>(null)
  const confPasswordRef = useRef<PrInputRefProps>(null)
  const fullnameRef = useRef<PrInputRefProps>(null)
  const emailRef = useRef<PrInputRefProps>(null)
  const phonelRef = useRef<PrInputRefProps>(null)
  const genderRef = useRef<PrDropdownRefProps>(null)
  const modalRef = useRef<PrModalRefProps>(null)
  const [disableInput, setDisableInput] = useState<boolean>(false)

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
    if (!fullnameRef.current?.checkRequired()) {
      return false
    }
    if (!emailRef.current?.checkRequired()) {
      return false
    }
    if (!phonelRef.current?.checkRequired()) {
      return false
    }
    if (!genderRef.current?.checkRequired()) {
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
    setDisableInput(true)
    if (!validateInput()) {
      setDisableInput(false)
      return
    }
    setLoading(true)
    const username = usernameRef.current?.getValue() || ''
    const password = passwordRef.current?.getValue() || ''
    const fullname = fullnameRef.current?.getValue() || ''
    const email = emailRef.current?.getValue() || ''
    const phone = phonelRef.current?.getValue() || ''
    const gender = genderRef.current?.getValue()

    const data: UserInfo = {
      username,
      password: md5(password),
      email,
      fullname,
      type: 'EMPLOYER',
      phone,
      status: 'ACTIVE',
      gender: gender ? gender[0].value : 'ANOTHER',
      typeAccount: 'NORMAL',
      numberOfCandidateOpening: 2,
      numberOfPosting: 2
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
        const { success, message, error } = response.data
        if (!success) {
          throw Error(error)
        }
        setLoading(false)
        resetInput()
        setDisableInput(false)
        modalRef.current?.show()
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
    document.title = `CVFREE | ${intl.formatMessage({ id: 'AUTH.EMPLOYER_SIGN_UP' })}`
  }, [])

  return (
    <div className="w-full bg-white">
      <SignInStyle>
        <div className="grid grid-cols-5 gap-4 h-full w-full pt-16">
          <div className="col-span-2 bg-blue-50 h-full">
            <AuthIntro title="Đăng ký tài khoản nhà tuyển dụng" bgLogo={ImgIntro} />
          </div>

          <div className="col-span-3 h-full pt-32">
            <div className="h-full">
              <div className="h-5/6 flex items-center justify-center">
                <div className="w-2/5 mt-20">
                  <span className="block uppercase font-bold text-lg">1. Thông tin đăng nhập</span>
                  <div className="mt-5">
                    <PrInput
                      label="Tài khoản"
                      disable={disableInput}
                      icon="fas fa-user-circle"
                      required
                      ref={usernameRef}
                    />
                  </div>
                  <div className="mt-5">
                    <PrInput
                      label="Mật khẩu"
                      disable={disableInput}
                      type="password"
                      required
                      icon="fas fa-lock"
                      ref={passwordRef}
                    />
                  </div>
                  <div className="mt-5">
                    <PrInput
                      disable={disableInput}
                      label="Xác nhận mật khẩu"
                      required
                      type="password"
                      icon="fas fa-lock"
                      ref={confPasswordRef}
                    />
                  </div>
                  <span className="block uppercase font-bold text-lg mt-12">2. Thông tin cá nhân</span>
                  <div className="mt-5">
                    <PrInput disable={disableInput} label="Họ và tên" icon="fas fa-user" required ref={fullnameRef} />
                  </div>
                  <div className="mt-5">
                    <PrInput disable={disableInput} label="Email" required icon="fas fa-envelope" ref={emailRef} />
                  </div>
                  <div className="mt-5">
                    <PrInput
                      disable={disableInput}
                      label="Số điện thoại"
                      required
                      icon="fas fa-phone"
                      ref={phonelRef}
                    />
                  </div>
                  <div className="mt-5">
                    <PrDropdown
                      required
                      isDisabled={disableInput}
                      ref={genderRef}
                      options={DataGender}
                      label="Giới tính"
                      labelClassName="text-green-700 font-semibold mb-3"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="inline-flex mt-3 items-start">
                      <input
                        type="checkbox"
                        disabled={disableInput}
                        className="form-checkbox h-5 w-5 text-green-600 cursor-pointer mt-0.5"
                        onChange={() => setCheckPolicy(!checkPolicy)}
                        checked={checkPolicy}
                      />
                      <span className="ml-2 text-gray-700 font-medium">
                        Tôi đồng ý với
                        <Link to="/terms-of-use" className="ml-1.5 text-green-600">
                          Điều khoản sử dụng
                        </Link>{' '}
                        và{' '}
                        <Link to="/privacy-policy" className="text-green-600">
                          Chính sách bảo mật
                        </Link>{' '}
                        của CVFREE
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-center mt-10">
                    <Button disable={disableInput} type="success" className="flex items-center" onClick={onSignUp}>
                      <span className="font-semibold">Đăng ký tài khoản</span>
                      {loading ? (
                        <img src={LoadingIcon} alt="loading" className="w-5 ml-2" />
                      ) : (
                        <i className="fas fa-user-plus ml-2 text-sm"></i>
                      )}
                    </Button>
                  </div>
                  <div className="mt-10">
                    <span className="block text-center">
                      Bạn đã có tài khoản?{' '}
                      <Link to="/employer/sign-in" className="text-green-600 font-semibold">
                        Đăng nhập
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
            <span className="text-lg text-green-700 font-semibold">
              Đăng ký tài khoản thành công!
              <br />
              Một liên kết xác thực đã được gửi đến email của bạn.
              <br />
              Hãy kiểm tra email mà bạn đã đăng ký.
            </span>
          </div>
          <div className="flex justify-center mb-10">
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
