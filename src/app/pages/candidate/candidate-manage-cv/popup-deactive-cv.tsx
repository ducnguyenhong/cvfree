import { useRefresh } from '@ekidpro/table'
import { prefix } from './candidate-manage-cv'
import { PopupConfirm, PopupConfirmRef } from 'app/partials/popup-confirm'
import React, { useEffect, useRef, useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { showDeactiveCvState } from 'app/states/show-popup/deactive-cv-state'
import { ResponseDelete } from 'models/response-api'
import Cookies from 'js-cookie'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'

import { userInfoState } from 'app/states/user-info-state'

export const PopupDeactive: React.FC = () => {
  const refreshTable = useRefresh(prefix)
  const popupConfirmRef = useRef<PopupConfirmRef>(null)
  const [recoilState, setRecoilState] = useRecoilState(showDeactiveCvState)
  const { id, showPopup } = recoilState
  const setUserInfo = useSetRecoilState(userInfoState)

  const onHidePopup = useCallback(() => {
    setRecoilState({ id: undefined, showPopup: false })
  }, [setRecoilState])

  const onDeactiveCv = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/cvs/${id}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers,
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDelete>) => {
        const { success, message, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setRecoilState({ id: undefined, showPopup: false })
        showNotify.success(message)
        setUserInfo(data.userInfo)
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
      type="danger"
      onHide={onHidePopup}
      onChange={onDeactiveCv}
      okTitle="Xác nhận"
      cancelTitle="Hủy"
    >
      <div className="flex items-center justify-center">
        <span className="py-4 text-xl font-medium">Xoá hồ sơ này ?</span>
      </div>
    </PopupConfirm>
  )
}
