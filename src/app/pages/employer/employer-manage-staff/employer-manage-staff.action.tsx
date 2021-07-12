import { showBanStaffState } from 'app/states/show-popup/ban-staff-state'
import { userInfoState } from 'app/states/user-info-state'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

interface ActionProps {
  id?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id } = props
  const userInfo = useRecoilValue(userInfoState)
  const setShowBanStaff = useSetRecoilState(showBanStaffState)

  const isDisable = userInfo?._id === id

  const onBanStaff = () => {
    setShowBanStaff({ showPopup: true, id })
  }

  if (isDisable) {
    return null
  }

  return (
    <div className="flex items-center">
      <div
        onClick={onBanStaff}
        className={`${
          isDisable ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer bg-red-500 hover:bg-red-600'
        } px-3 py-1 font-semibold flex rounded-md items-center justify-center duration-300`}
      >
        <i className="fas fa-trash mr-2 text-white" />
        <span className="whitespace-nowrap text-white">Xóa nhân viên</span>
      </div>
    </div>
  )
}
