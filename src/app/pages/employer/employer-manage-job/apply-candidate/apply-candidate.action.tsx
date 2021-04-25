import React from 'react'
import { useSetRecoilState } from 'recoil'
import { slugURL } from 'utils/helper'
import { showAcceptCandidateState } from 'app/states/show-modal/accept-candidate-state'
import { showRejectCandidateState } from 'app/states/show-modal/reject-candidate-state'

interface ActionProps {
  cvId?: string
  name?: string
  jobId?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { cvId, name, jobId } = props
  const setShowAccept = useSetRecoilState(showAcceptCandidateState)
  const setShowReject = useSetRecoilState(showRejectCandidateState)

  const onShowAccept = () => {
    setShowAccept({ showModal: true, cvId, jobId })
  }

  const onShowReject = () => {
    setShowReject({ showModal: true, cvId, jobId })
  }

  return (
    <div className="flex items-center">
      <div className="flex rounded-md items-center justify-center bg-gray-500 hover:bg-gray-600 mr-8 duration-300">
        <a
          href={`/cv-public/${slugURL(name)}.${cvId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-white font-semibold"
        >
          Xem hồ sơ
        </a>
      </div>
      <div
        onClick={onShowAccept}
        className="cursor-pointer flex rounded-md items-center justify-center bg-green-500 hover:bg-green-600 mr-8 duration-300"
      >
        <span className="px-3 py-1.5 text-white font-semibold">Chấp nhận</span>
      </div>
      <div
        className="cursor-pointer bg-red-400 flex rounded-md items-center justify-center duration-300 hover:bg-red-500"
        onClick={onShowReject}
      >
        <span className="px-3 py-1.5 text-white font-semibold">Từ chối</span>
      </div>
    </div>
  )
}
