import { useRefresh } from '@ekidpro/table'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify'
import { showAcceptRequestUpdateCompanyState } from 'app/states/show-modal/accept-request-update-company-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseDefault } from 'models/response-api'
import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { prefix } from './request-update-company'

export const ModalAcceptRequest: React.FC = () => {
  const modalRef = useRef<PrModalRefProps>(null)
  const [showModalState, setShowModalState] = useRecoilState(showAcceptRequestUpdateCompanyState)
  const { showModal, id } = showModalState
  const refreshTable = useRefresh(prefix)

  const onHideModal = () => {
    setShowModalState({
      showModal: false,
      id: undefined
    })
  }

  const onAccept = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/request-update-company/accept/${id}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data: undefined,
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
      title="Chấp nhận yêu cầu"
      size="nm"
      okTitle="Xác nhận"
      onChange={onAccept}
      cancelTitle="Hủy"
      onHide={onHideModal}
      ref={modalRef}
    >
      <div className="py-10 px-10">
        <span className="block text-lg font-semibold text-center">Xác nhận chấp nhận yêu cầu này ?</span>
        <span className="block font-medium mt-10 text-center">
          Sau khi xác nhận, thông tin của công ty lập tức được thay đổi theo như yêu cầu
        </span>
      </div>
    </PrModal>
  )
}
