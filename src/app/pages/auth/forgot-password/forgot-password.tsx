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
import { useIntl } from 'react-intl'
import AuthIntro from 'app/pages/auth/auth-intro'

interface SignInProps {}

export const ForgotPassword: React.FC<SignInProps> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const emailRef = useRef<PrInputRefProps>(null)
  const modalRef = useRef<PrModalRefProps>(null)
  const intl = useIntl()
  const [disableInput, setDisableInput] = useState<boolean>(false)

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
        const { success, error } = response.data

        if (!success) {
          throw Error(error)
        }
        setDisableInput(false)
        modalRef.current?.show()
        setLoading(false)
        emailRef.current?.reset()
      })
      .catch((e) => {
        setLoading(false)
        setDisableInput(false)
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
    setDisableInput(true)
    setLoading(true)
    if (!validate()) {
      setLoading(false)
      setDisableInput(false)
      return
    }
    callApiForgotPassword()
  }

  useEffect(() => {
    document.title = `CVFREE | ${intl.formatMessage({ id: 'AUTH.FORGOT_PASSWORD' })}`
  }, [])

  return (
    <div className="w-full h-full bg-white">
      <div className="grid grid-cols-5 gap-4 h-full w-full">
        <div className="col-span-2">
          <AuthIntro title={intl.formatMessage({ id: 'AUTH.FORGOT_PASSWORD' })} />
        </div>

        <div className="col-span-3 h-full bg-white">
          <div className="h-full">
            <div className="h-5/6 flex items-center justify-center">
              <div className="w-2/5">
                <div className="mt-7">
                  <PrInput
                    placeholder="example@abc.com"
                    label={intl.formatMessage({ id: 'AUTH.INPUT_YOUR_EMAIL' })}
                    icon="fas fa-envelope"
                    disabled={disableInput}
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="flex justify-center mt-12">
                  <Button
                    type="success"
                    className="flex items-center"
                    disable={disableInput}
                    onClick={disableInput ? undefined : onGetNewPassword}
                  >
                    <span className="font-semibold">{intl.formatMessage({ id: 'AUTH.FORGOT_PASSWORD' })}</span>
                    {loading ? (
                      <img src={LoadingIcon} alt="loading" className="w-5 ml-2" />
                    ) : (
                      <i className="ml-2 text-sm fas fa-unlock-alt"></i>
                    )}
                  </Button>
                </div>
                <div className="mt-10">
                  <span className="block text-center">
                    {intl.formatMessage({ id: 'AUTH.HAD_ACCOUNT' })}{' '}
                    <Link to="/sign-in" className="text-green-600 font-semibold">
                      {intl.formatMessage({ id: 'AUTH.SIGN_IN' })}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    </div>
  )
}
