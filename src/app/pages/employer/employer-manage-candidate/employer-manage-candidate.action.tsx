import React from 'react'
import { useSetRecoilState } from 'recoil'
import { showDoneManageCandidateState } from 'app/states/show-popup/done-manage-candidate-state'
import { showDeactiveManageCandidateState } from 'app/states/show-popup/deactive-manage-candidate-state'

interface ActionProps {
  id?: number | string
  isDone?: boolean
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id, isDone } = props
  const setShowDone = useSetRecoilState(showDoneManageCandidateState)
  const setShowDeactive = useSetRecoilState(showDeactiveManageCandidateState)

  const onShowDone = () => {
    setShowDone({ showPopup: true, id })
  }

  const onShowDeactive = () => {
    setShowDeactive({ showPopup: true, id })
  }

  return (
    <div className="flex items-center">
      {!isDone && (
        <div
          onClick={onShowDone}
          className="cursor-pointer flex rounded-md items-center justify-center bg-indigo-500 hover:bg-indigo-600 mr-6 duration-300"
        >
          <span className="whitespace-nowrap px-3 py-1 text-white font-semibold">Xong</span>
        </div>
      )}
      <div
        onClick={onShowDeactive}
        className="cursor-pointer flex rounded-md items-center justify-center bg-red-500 hover:bg-red-600 mr-4 duration-300"
      >
        <span className="whitespace-nowrap px-3 py-1 text-white font-semibold">Xóa</span>
      </div>
    </div>
  )
}
