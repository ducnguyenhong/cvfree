import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { useRef, useEffect } from 'react'
import { CLIENT_URL, SERVER_URL } from 'constants/index'
import { useRecoilState } from 'recoil'
import { showSendEmailRequestUpdateCompanyState } from 'app/states/show-modal/send-email-request-update-company-state'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import Cookies from 'js-cookie'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseDefault } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import { useRefresh } from '@ekidpro/table'
import { prefix } from './request-update-company'

export const ModalSendEmail: React.FC = () => {
  const modalRef = useRef<PrModalRefProps>(null)
  const [showModalState, setShowModalState] = useRecoilState(showSendEmailRequestUpdateCompanyState)
  const { showModal, emailTo, helloName, isLoginNow, content, id } = showModalState
  const refreshTable = useRefresh(prefix)

  const titleRef = useRef<PrInputRefProps>(null)
  const contentRef = useRef<PrInputRefProps>(null)
  const emailToRef = useRef<PrInputRefProps>(null)

  const defaultContent = `Xin chào ${helloName || emailTo}.

${content}

${isLoginNow ? `Hãy đăng nhập vào CVFREE để xem chi tiết thông tin. (${CLIENT_URL}/sign-in)` : ''}
  
Trân trọng,
CVFREE`

  const callApiUpdateStatus = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/request-update-company/update-process/${id}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'PUT',
      headers,
      url,
      data: { processStatus: 'SENT_AD_COMPANY' },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        prefix && refreshTable()
        onHideModal()
        modalRef.current?.hide()
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiSendEmail = (data: any) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/send-email`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
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
        callApiUpdateStatus()
        showNotify.success(message)
      })
      .catch((e) => {
        onHideModal()
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onHideModal = () => {
    setShowModalState({
      emailTo: '',
      showModal: false,
      helloName: undefined,
      isLoginNow: undefined,
      content: undefined,
      id: undefined
    })
  }

  const validate = () => {
    if (!titleRef.current?.checkRequired()) {
      return false
    }
    if (!emailToRef.current?.checkRequired()) {
      return false
    }
    if (!contentRef.current?.checkRequired()) {
      return false
    }
    return true
  }

  const onSendEmail = () => {
    if (!validate()) {
      return
    }

    const data = {
      emailTo: emailToRef.current?.getValue(),
      title: titleRef.current?.getValue(),
      content: contentRef.current?.getValue()
    }

    callApiSendEmail(data)
  }

  useEffect(() => {
    showModal ? modalRef.current?.show() : modalRef.current?.hide()
  }, [showModal])

  return (
    <PrModal
      title="Gửi email đến người quản trị công ty"
      size="lg"
      okTitle="Gửi email"
      onChange={onSendEmail}
      cancelTitle="Hủy"
      onHide={onHideModal}
      ref={modalRef}
    >
      <div className="py-10 px-10">
        <div>
          <PrInput
            label="Tiêu đề"
            ref={titleRef}
            icon="fas fa-envelope"
            defaultValue="CVFREE - Yêu cầu chỉnh sửa thông tin công ty"
            required
          />
        </div>
        <div className="mt-10">
          <PrInput label="Người nhận" ref={emailToRef} icon="fas fa-user-circle" defaultValue={emailTo} required />
        </div>
        <div className="mt-10">
          <PrInput
            required
            divClassName="h-48"
            label="Nội dung"
            defaultValue={defaultContent}
            placeholder="Không bao gồm phần mở đầu và phần kết thúc"
            type="textarea"
            ref={contentRef}
          />
        </div>
      </div>
    </PrModal>
  )
}
