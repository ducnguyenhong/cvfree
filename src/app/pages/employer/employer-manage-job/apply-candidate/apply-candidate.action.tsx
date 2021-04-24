import React from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { slugURL } from 'utils/helper'
import { showDeactiveCvState } from 'app/states/show-popup/deactive-cv-state'

interface ActionProps {
  id?: number | string
  name?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id, name } = props
  const setShowDeactive = useSetRecoilState(showDeactiveCvState)

  const onShowDeactiveJob = () => {
    setShowDeactive({ showPopup: true, id })
  }

  return (
    <div className="flex items-center">
      <div className="flex rounded-md items-center justify-center bg-gray-500 hover:bg-gray-600 mr-8 duration-300">
        <a
          href={`/cv-public/${slugURL(name)}.${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-white font-semibold"
        >
          Xem hồ sơ
        </a>
      </div>
      <div className="cursor-pointer flex rounded-md items-center justify-center bg-green-500 hover:bg-green-600 mr-8 duration-300">
        <span className="px-3 py-1.5 text-white font-semibold">Chấp nhận</span>
      </div>
      <div
        className="cursor-pointer bg-red-400 flex rounded-md items-center justify-center duration-300 hover:bg-red-500"
        onClick={onShowDeactiveJob}
      >
        <span className="px-3 py-1.5 text-white font-semibold">Từ chối</span>
      </div>
    </div>
  )
}
