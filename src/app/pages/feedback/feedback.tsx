import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import { FeedbackInfo } from 'models/feedback-info'
import { useRef, useEffect } from 'react'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { ResponseDefault } from '../../../models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'

export const Feedback: React.FC = () => {
  const fullnameRef = useRef<PrInputRefProps>(null)
  const contactRef = useRef<PrInputRefProps>(null)
  const contentRef = useRef<PrInputRefProps>(null)
  const modalNotifyRef = useRef<PrModalRefProps>(null)

  const resetInput = () => {
    fullnameRef.current?.setValue('')
    contentRef.current?.setValue('')
    contactRef.current?.setValue('')
  }

  const callApiSendFeedback = (data: FeedbackInfo) => {
    const url = `${SERVER_URL}/feedback`
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
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, error } = response.data
        if (!success) {
          throw Error(error?.message)
        }
        modalNotifyRef.current?.show()
        resetInput()
      })
      .catch((e) => showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!'))
  }

  const validate = () => {
    if (!fullnameRef.current?.checkRequired()) {
      return false
    }
    if (!contentRef.current?.checkRequired()) {
      return false
    }
    return true
  }

  const onSendFeedback = () => {
    if (!validate()) {
      return
    }
    const data: FeedbackInfo = {
      fullname: fullnameRef.current?.getValue() || '',
      contact: contentRef.current?.getValue(),
      content: contentRef.current?.getValue() || '',
      status: 'ACTIVE'
    }
    callApiSendFeedback(data)
  }

  return (
    <WrapperPage title="Ý kiến đóng góp">
      <div className="py-16 px-32">
        <div className="mb-8">
          <PrInput label="Họ và tên của bạn" required ref={fullnameRef} />
        </div>
        <div className="mb-8">
          <PrInput label="Email hoặc số điện thoại" ref={contactRef} />
        </div>
        <div className="mb-16">
          <PrInput label="Nội dung góp ý" type="textarea" divClassName="h-40" required ref={contentRef} />
        </div>
        <div className="flex justify-center">
          <div
            onClick={onSendFeedback}
            className="flex items-center bg-blue-500 rounded px-6 py-2 cursor-pointer duration-300 hover:bg-blue-600"
          >
            <i className="fas fa-paper-plane mr-2 text-white" />
            <span className="text-white font-semibold">Gửi góp ý</span>
          </div>
        </div>
      </div>
      <PrModal title="Thông báo" ref={modalNotifyRef} disableFooter>
        <div className="py-10 px-10">
          <span className="block font-semibold text-xl text-center">Ý kiến đóng góp đã được gửi thành công</span>
          <span className="block font-medium mt-10 text-center">
            Cảm ơn ý kiến đóng góp của bạn về CVFREE, chúng tôi luôn luôn lắng nghe ý kiến của người dùng để cải thiện
            chất lượng tốt hơn
          </span>
        </div>
      </PrModal>
    </WrapperPage>
  )
}
