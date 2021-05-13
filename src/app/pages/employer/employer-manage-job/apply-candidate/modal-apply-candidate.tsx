import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { useRef, useEffect } from 'react'
import { Table } from '@ekidpro/table'
import { Columns, getLoader } from './apply-candidate.data'
import { SERVER_URL } from 'constants/index'
import { useRecoilState } from 'recoil'
import { showApplyCandidateState } from 'app/states/show-modal/apply-candidate-state'
import { PopupAcceptCandidate } from './popup-accept-candidate'
import { PopupRejectCandidate } from './popup-reject-candidate'

export const prefix = 'applyCandidateList'

export const ModalApplyCandidate: React.FC = () => {
  const modalRef = useRef<PrModalRefProps>(null)
  const [showModalState, setShowModalState] = useRecoilState(showApplyCandidateState)
  const { jobId, showModal, candidateApplied } = showModalState
  const loader = useRef(getLoader(`${SERVER_URL}/candidate/jobId=${jobId}/informations=${candidateApplied.join()}`))

  const onHideModal = () => {
    setShowModalState({ jobId: undefined, showModal: false, candidateApplied: [] })
  }

  // const onDeactiveCv = () => {
  //   const accessToken = Cookies.get('token')
  //   const url = `${SERVER_URL}/cvs/${id}`
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   }

  //   const config: AxiosRequestConfig = {
  //     method: 'DELETE',
  //     headers,
  //     url,
  //     data: undefined,
  //     timeout: 20000
  //   }

  //   axios(config)
  //     .then((response: AxiosResponse<ResponseDelete>) => {
  //       const { success, message, error, data } = response.data

  //       if (!success) {
  //         throw Error(error?.message)
  //       }
  //       setRecoilState({ id: undefined, showPopup: false })
  //       showNotify.success(message)
  //       setUserInfo(data.userInfo)
  //       refreshTable()
  //     })
  //     .catch((e) => {
  //       setRecoilState({ id: undefined, showPopup: false })
  //       showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
  //     })
  // }

  useEffect(() => {
    showModal ? modalRef.current?.show() : modalRef.current?.hide()
  }, [showModal])

  return (
    <PrModal title="Danh sách ứng viên ứng tuyển" size="lg" disableFooter onHide={onHideModal} ref={modalRef}>
      <div>
        <div className="flex items-center justify-center my-10 font-semibold text-lg">
          <span className="text-red-500">* Chú ý: </span>
          <span className="ml-2">
            Hãy xem chi tiết hồ sơ CV của ứng viên, rồi sau đó
            <span className="mx-2 uppercase text-green-600">Chấp nhận</span>
            hoặc
            <span className="mx-2 uppercase text-red-500">Từ chối</span>
            ứng viên
          </span>
        </div>
        <Table columns={Columns} loader={loader.current} prefix={prefix} />
        <PopupAcceptCandidate />
        <PopupRejectCandidate />
      </div>
    </PrModal>
  )
}
