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
import { showBanRequestUpdateCompanyState } from 'app/states/show-modal/ban-request-update-company-state'

export const ModalBanRequest: React.FC = () => {
  const modalRef = useRef<PrModalRefProps>(null)
  const [showModalState, setShowModalState] = useRecoilState(showBanRequestUpdateCompanyState)
  const { showModal, id, employerRequestedId } = showModalState
  const refreshTable = useRefresh(prefix)

  const onHideModal = () => {
    setShowModalState({ showModal: false, id: undefined })
  }

  const onSendEmail = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/request-update-company/ban/${id}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data: { employerRequestedId },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        refreshTable()
        modalRef.current?.hide()
        showNotify.success(message)
      })
      .catch((e) => {
        onHideModal()
        modalRef.current?.hide()
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    showModal ? modalRef.current?.show() : modalRef.current?.hide()
  }, [showModal])

  return (
    <PrModal
      title="Xác nhận từ chối yêu cầu này ?"
      size="nm"
      okTitle="Xác nhận"
      onChange={onSendEmail}
      cancelTitle="Hủy"
      onHide={onHideModal}
      ref={modalRef}
    >
      <div className="py-10 px-10">
        <span className="block text-center font-medium">Việc này đồng nghĩa đây là yêu cầu hoàn toàn không hợp lệ</span>
        <span className="block text-center font-medium mt-10">
          Một email tự động sẽ gửi đến người yêu cầu và thông báo rằng họ đã bị cảnh cáo
        </span>
      </div>
    </PrModal>
  )
}
