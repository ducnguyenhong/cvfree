import { useRefresh } from '@ekidpro/table'
import { PopupConfirm, PopupConfirmRef } from 'app/partials/popup-confirm'
import { showNotify } from 'app/partials/pr-notify'
import { showDoneRequestUpdateCompanyState } from 'app/states/show-popup/done-request-update-company-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseDelete } from 'models/response-api'
import React, { useCallback, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { prefix } from './request-update-company'
import moment from 'moment'

export const PopupDone: React.FC = () => {
  const refreshTable = useRefresh(prefix)
  const popupConfirmRef = useRef<PopupConfirmRef>(null)
  const [recoilState, setRecoilState] = useRecoilState(showDoneRequestUpdateCompanyState)
  const { id, showPopup } = recoilState

  const onHidePopup = useCallback(() => {
    setRecoilState({ id: undefined, showPopup: false })
  }, [setRecoilState])

  const onDoneRequest = () => {
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
      data: { processStatus: 'DONE' },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDelete>) => {
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
      size="nm"
      type="success"
      onHide={onHidePopup}
      onChange={onDoneRequest}
      okTitle="Xác nhận"
      cancelTitle="Hủy"
    >
      <div className="flex items-center justify-center">
        <span className="py-4 text-xl font-medium">Hoàn thành yêu cầu này ?</span>
      </div>
    </PopupConfirm>
  )
}
