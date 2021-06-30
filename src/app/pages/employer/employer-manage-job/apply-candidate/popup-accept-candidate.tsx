import { useRefresh } from '@ekidpro/table'
import { PopupConfirm, PopupConfirmRef } from 'app/partials/popup-confirm'
import { showNotify } from 'app/partials/pr-notify'
import { showAcceptCandidateState } from 'app/states/show-modal/accept-candidate-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseDefault } from 'models/response-api'
import React, { useCallback, useEffect, useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { prefix as prefixManageJob } from 'app/pages/employer/employer-manage-job/employer-manage-job'
import { showApplyCandidateState } from 'app/states/show-modal/apply-candidate-state'
import { useIntl } from 'react-intl'

export const PopupAcceptCandidate: React.FC = () => {
  const refreshTableJob = useRefresh(prefixManageJob)
  const intl = useIntl()
  const popupConfirmRef = useRef<PopupConfirmRef>(null)
  const [recoilState, setRecoilState] = useRecoilState(showAcceptCandidateState)
  const setShowModalApplyCandidate = useSetRecoilState(showApplyCandidateState)
  const { applyType, applyValue, jobId, showModal, userId } = recoilState

  const onHidePopup = useCallback(() => {
    setRecoilState({
      applyType: undefined,
      applyValue: undefined,
      jobId: undefined,
      showModal: false,
      userId: undefined
    })
  }, [setRecoilState])

  const onAccept = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/employer/accept-candidate`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data: {
        jobId,
        applyValue,
        applyType,
        userId
      },
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        onHidePopup()
        showNotify.success(intl.formatMessage({ id: `CANDIDATE.${message}` }))
        setShowModalApplyCandidate({ jobId: undefined, showModal: false, candidateApplied: [] })
        refreshTableJob()
      })
      .catch((e) => {
        onHidePopup()
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    showModal ? popupConfirmRef.current?.show() : popupConfirmRef.current?.hide()
  }, [showModal])

  return (
    <PopupConfirm
      ref={popupConfirmRef}
      title="XÁC NHẬN"
      size="lg"
      type="success"
      onHide={onHidePopup}
      onChange={onAccept}
      okTitle="Xác nhận"
      cancelTitle="Hủy"
    >
      <div className="py-5 px-10">
        <span className="text-xl font-semibold block">Chấp nhận ứng viên này ?</span>
        <span className="block mt-5 font-medium">
          - Sau khi xác nhận, một email tự động sẽ được gửi tới ứng viên thông báo rằng họ đã được nhà tuyển dụng chấp
          nhận
          <br />- Thông tin ứng viên này sẽ được chuyển tới mục Quản lý tuyển dụng trong Bảng điều khiển
        </span>
      </div>
    </PopupConfirm>
  )
}
