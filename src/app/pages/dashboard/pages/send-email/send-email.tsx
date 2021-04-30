import { Portlet, PortletBody, PortletHeader } from 'app/partials/portlet'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import Cookies from 'js-cookie'
import { useRef } from 'react'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseDefault } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'

export const SendEmail: React.FC = () => {
  const titleRef = useRef<PrInputRefProps>(null)
  const contentRef = useRef<PrInputRefProps>(null)
  const emailToRef = useRef<PrInputRefProps>(null)

  const resetInput = () => {
    titleRef.current?.setValue('CVFREE - ')
    contentRef.current?.setValue(defaultContent)
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
        resetInput()
        showNotify.success(message)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const defaultContent = `Xin chào <Người_nhận>.

<Nội_dung>
  
Trân trọng,
CVFREE`

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

  return (
    <Portlet>
      <PortletHeader title="Gửi email đến người dùng" />
      <PortletBody>
        <div className="py-10 px-10">
          <div>
            <PrInput label="Tiêu đề" ref={titleRef} icon="fas fa-envelope" defaultValue="CVFREE - " required />
          </div>
          <div className="mt-10">
            <PrInput label="Người nhận" ref={emailToRef} icon="fas fa-user-circle" required />
          </div>
          <div className="mt-10">
            <PrInput
              required
              divClassName="h-60"
              label="Nội dung"
              defaultValue={defaultContent}
              type="textarea"
              ref={contentRef}
            />
          </div>
          <div className="mt-20 flex justify-center">
            <div
              onClick={onSendEmail}
              className="bg-green-500 cursor-pointer px-6 py-2 font-semibold rounded text-lg duration-300 hover:bg-green-600"
            >
              <i className="fas fa-paper-plane mr-2.5 text-white" />
              <span className="text-white">Gửi email</span>
            </div>
          </div>
        </div>
      </PortletBody>
    </Portlet>
  )
}
