import { showAcceptCandidateState } from 'app/states/show-modal/accept-candidate-state'
import { showRejectCandidateState } from 'app/states/show-modal/reject-candidate-state'
import React from 'react'
import { useSetRecoilState } from 'recoil'

interface ActionProps {
  applyType?: string
  applyValue?: string
  jobId?: string
  userId?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { applyValue, jobId, applyType, userId } = props
  const setShowAccept = useSetRecoilState(showAcceptCandidateState)
  const setShowReject = useSetRecoilState(showRejectCandidateState)

  const onShowAccept = () => {
    setShowAccept({ showModal: true, applyValue, jobId, applyType, userId })
  }

  const onShowReject = () => {
    setShowReject({ showModal: true, applyValue, jobId, applyType, userId })
  }

  return (
    <div className="flex items-center">
      <div
        onClick={onShowAccept}
        className="cursor-pointer flex rounded-md items-center justify-center bg-green-500 hover:bg-green-600 mr-8 duration-300"
      >
        <span className="px-3 py-1.5 text-white font-semibold whitespace-nowrap">Chấp nhận</span>
      </div>
      <div
        className="cursor-pointer bg-red-400 flex rounded-md items-center justify-center duration-300 hover:bg-red-500"
        onClick={onShowReject}
      >
        <span className="px-3 py-1.5 text-white font-semibold whitespace-nowrap">Từ chối</span>
      </div>
    </div>
  )
}
