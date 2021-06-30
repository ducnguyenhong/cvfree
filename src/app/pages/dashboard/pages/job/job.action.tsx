import { showActiveJobAdminState } from 'app/states/show-popup/active-job-state-admin'
import { showDeactiveJobAdminState } from 'app/states/show-popup/deactive-job-state-admin'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { slugURL } from 'utils/helper'

interface ActionProps {
  id?: number | string
  status?: string
  name: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id, status, name } = props
  const setShowDeactive = useSetRecoilState(showDeactiveJobAdminState)
  const setShowActive = useSetRecoilState(showActiveJobAdminState)

  const onShowDeactive = () => {
    setShowDeactive({ showPopup: true, id })
  }

  const onShowActive = () => {
    setShowActive({ showPopup: true, id })
  }

  return (
    <div className="flex items-center">
      <div
        className="flex rounded-md items-center justify-center bg-gray-100 hover:bg-indigo-500 mr-4 duration-300"
        style={{ width: 32, height: 32 }}
      >
        <a href={`/jobs/${slugURL(name)}.${id}`} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-eye text-gray-500 px-3 py-4 hover:text-white"></i>
        </a>
      </div>
      <div
        className="flex rounded-md items-center justify-center bg-gray-100 hover:bg-indigo-500 mr-4 duration-300"
        style={{ width: 32, height: 32 }}
      >
        <Link to={`/jobs/update/${id}`}>
          <i className="fas fa-edit text-gray-500 px-3 py-4 hover:text-white"></i>
        </Link>
      </div>
      {status === 'INACTIVE' ? (
        <div
          className="cursor-pointer hover:bg-green-600 flex rounded-md items-center justify-center duration-300 bg-gray-100"
          style={{ width: 32, height: 32 }}
          onClick={onShowActive}
        >
          <span>
            <i className="hover:text-white text-gray-500 fas fa-toggle-on text-lg px-3 py-4"></i>
          </span>
        </div>
      ) : (
        <div
          className="cursor-pointer hover:bg-red-400 flex rounded-md items-center justify-center duration-300 bg-gray-100"
          style={{ width: 32, height: 32 }}
          onClick={onShowDeactive}
        >
          <span>
            <i className="hover:text-white text-gray-500 fas fa-trash px-3 py-4"></i>
          </span>
        </div>
      )}
    </div>
  )
}
