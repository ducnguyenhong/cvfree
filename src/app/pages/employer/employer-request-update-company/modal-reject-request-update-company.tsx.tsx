import { useRefresh } from '@ekidpro/table'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify'
import { showRejectRequestUpdateCompanyState } from 'app/states/show-modal/reject-request-update-company-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseDefault } from 'models/response-api'
import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { prefix } from './request-update-company'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'

export const ModalRejectRequest: React.FC = () => {
  const modalRef = useRef<PrModalRefProps>(null)
  const [showModalState, setShowModalState] = useRecoilState(showRejectRequestUpdateCompanyState)
  const { showModal, id } = showModalState
  const refreshTable = useRefresh(prefix)
  const reasonRejectRef = useRef<PrInputRefProps>(null)

  const onHideModal = () => {
    setShowModalState({
      showModal: false,
      id: undefined
    })
  }

  const onAccept = () => {
    if (!reasonRejectRef.current?.checkRequired()) {
      return
    }
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/request-update-company/reject/${id}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data: { reasonReject: reasonRejectRef.current.getValue() },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        onHideModal()
        refreshTable()
        showNotify.success(message)
      })
      .catch((e) => {
        onHideModal()
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    showModal ? modalRef.current?.show() : modalRef.current?.hide()
  }, [showModal])

  return (
    <PrModal
      title="Từ chối yêu cầu"
      size="nm"
      okTitle="Xác nhận"
      onChange={onAccept}
      cancelTitle="Hủy"
      onHide={onHideModal}
      ref={modalRef}
    >
      <div className="py-10 px-10">
        <span className="block text-lg font-semibold text-center">Xác nhận từ chối yêu cầu này ?</span>
        <div className="mt-10">
          <PrInput type="textarea" divClassName="h-48" ref={reasonRejectRef} label="Lý do từ chối" required />
        </div>
        <span className="italic font-medium block text-center mt-10">
          <span className="text-red-500">* Chú ý: </span>Trong trường hợp xảy ra tranh chấp khiếu nại, CVFREE sẽ tiến
          hành thu thập thông tin và đưa ra quyết định chính xác để đảm bảo quyền lợi cho tất cả người dùng.
          <br />
          Quyết định của CVFREE sẽ là quyết định cuối cùng.
        </span>
      </div>
    </PrModal>
  )
}
