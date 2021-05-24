import { showAcceptRequestUpdateCompanyState } from 'app/states/show-modal/accept-request-update-company-state'
import { showRejectRequestUpdateCompanyState } from 'app/states/show-modal/reject-request-update-company-state'
import React from 'react'
import { useSetRecoilState } from 'recoil'

interface ActionProps {
  id?: string
  processStatus?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id, processStatus } = props
  const setShowAcceptRequest = useSetRecoilState(showAcceptRequestUpdateCompanyState)
  const setShowRejectRequest = useSetRecoilState(showRejectRequestUpdateCompanyState)

  const isDisable = processStatus !== 'SENT_AD_COMPANY'

  const onAccept = () => {
    setShowAcceptRequest({ showModal: true, id })
  }

  const onReject = () => {
    setShowRejectRequest({ showModal: true, id })
  }

  return (
    <div className="flex items-center">
      <div
        onClick={isDisable ? undefined : onAccept}
        className={`${
          isDisable ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer bg-green-600 hover:bg-green-700'
        }  px-3 py-1 font-semibold flex rounded-md items-center justify-center mr-8 duration-300`}
      >
        <span className="whitespace-nowrap text-white">Chấp nhận</span>
      </div>

      <div
        onClick={isDisable ? undefined : onReject}
        className={`${
          isDisable ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer bg-red-500 hover:bg-red-600'
        } px-3 py-1 font-semibold flex rounded-md items-center justify-center duration-300`}
      >
        <span className="whitespace-nowrap text-white">Từ chối</span>
      </div>
    </div>
  )
}
