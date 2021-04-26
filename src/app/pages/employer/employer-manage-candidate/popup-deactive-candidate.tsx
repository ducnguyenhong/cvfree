import { useRefresh } from '@ekidpro/table'
import { PopupConfirm, PopupConfirmRef } from 'app/partials/popup-confirm'
import { showNotify } from 'app/partials/pr-notify'
import { showDoneManageCandidateState } from 'app/states/show-popup/done-manage-candidate-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseDefault } from 'models/response-api'
import React, { useCallback, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { prefix } from './employer-manage-candidate'
import { showDeactiveManageCandidateState } from 'app/states/show-popup/deactive-manage-candidate-state'

export const PopupDeactiveCandidate: React.FC = () => {
  const refreshTable = useRefresh(prefix)
  const popupConfirmRef = useRef<PopupConfirmRef>(null)
  const [recoilState, setRecoilState] = useRecoilState(showDeactiveManageCandidateState)
  const { id, showPopup } = recoilState

  const onHidePopup = useCallback(() => {
    setRecoilState({ id: undefined, showPopup: false })
  }, [setRecoilState])

  const onDeactiveCv = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/candidate-manage/delete-candidate`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers,
      url,
      data: { cmId: id },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setRecoilState({ id: undefined, showPopup: false })
        showNotify.success(message)
        refreshTable()
      })
      .catch((e) => {
        setRecoilState({ id: undefined, showPopup: false })
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    showPopup ? popupConfirmRef.current?.show() : popupConfirmRef.current?.hide()
  }, [showPopup])

  return (
    <PopupConfirm
      ref={popupConfirmRef}
      title="XÁC NHẬN"
      size="sm"
      type="danger"
      onHide={onHidePopup}
      onChange={onDeactiveCv}
      okTitle="Xác nhận"
      cancelTitle="Hủy"
    >
      <div className="py-5 px-10">
        <span className="py-4 text-xl font-semibold block">Xác nhận xóa ứng viên này ?</span>
        <span className="block mt-5 font-medium">- Thông tin về ứng viên sẽ bị xóa khỏi danh sách</span>
      </div>
    </PopupConfirm>
  )
}
