import { useRefresh } from '@ekidpro/table'
import { PopupConfirm, PopupConfirmRef } from 'app/partials/popup-confirm'
import { showNotify } from 'app/partials/pr-notify'
import { showBanStaffState } from 'app/states/show-popup/ban-staff-state'
import { userInfoState } from 'app/states/user-info-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseDefault } from 'models/response-api'
import React, { useCallback, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { prefix } from './employer-manage-staff'

export const PopupBanStaff: React.FC = () => {
  const refreshTable = useRefresh(prefix)
  const popupConfirmRef = useRef<PopupConfirmRef>(null)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [recoilState, setRecoilState] = useRecoilState(showBanStaffState)
  const { id, showPopup } = recoilState

  const onHidePopup = useCallback(() => {
    setRecoilState({ id: undefined, showPopup: false })
  }, [setRecoilState])

  const onShowBanStaff = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/companies/${userInfo?.companyId}/staffs`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      headers,
      url,
      data: {
        staffId: id
      },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setRecoilState({ id: undefined, showPopup: false })
        if (userInfo && (userInfo.numberOfPosting || userInfo.numberOfPosting === 0)) {
          setUserInfo({ ...userInfo, numberOfPosting: userInfo.numberOfPosting + 1 })
        }
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
      type="danger"
      onHide={onHidePopup}
      onChange={onShowBanStaff}
      okTitle="Xác nhận"
      cancelTitle="Hủy"
    >
      <div className="flex items-center justify-center">
        <span className="py-4 text-xl font-medium">Xoá nhân viên này khỏi công ty ?</span>
      </div>
    </PopupConfirm>
  )
}
