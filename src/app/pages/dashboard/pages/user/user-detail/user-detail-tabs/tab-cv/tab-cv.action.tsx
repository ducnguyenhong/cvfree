import React from 'react'
import { Link } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
// import { showDeactiveUserState } from 'state/deactive-user-state';

interface ActionProps {
  id?: number
  status?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id, status } = props
  // const setShowDeactive = useSetRecoilState(showDeactiveUserState);

  const onShowDeactiveUser = () => {
    // setShowDeactive({ showPopup: true, uid });
  }

  return (
    <>
      <div className="flex items-center">
        <div
          className="flex rounded-md items-center justify-center bg-gray-100 hover:bg-indigo-500 mr-4 duration-300"
          style={{ width: 32, height: 32 }}
        >
          <Link to={`/users/${id}`}>
            <i className="fas fa-eye text-gray-500 px-3 py-4 hover:text-white"></i>
          </Link>
        </div>
        {/* <div
          className="flex rounded-md items-center justify-center bg-gray-100 hover:bg-indigo-500 mr-4 duration-300"
          style={{ width: 32, height: 32 }}
        >
          <Link to={`/users/update/${id}`}>
            <i className="fas fa-edit text-gray-500 px-3 py-4 hover:text-white"></i>
          </Link>
        </div> */}
        <div
          className={`${
            status === 'INACTIVE' ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-red-400'
          } flex rounded-md items-center justify-center duration-300 bg-gray-100`}
          style={{ width: 32, height: 32 }}
          onClick={status === 'ACTIVE' ? onShowDeactiveUser : undefined}
        >
          <span>
            <i
              className={`${
                status === 'INACTIVE' ? 'text-gray-300' : 'hover:text-white text-gray-500'
              } fas fa-trash px-3 py-4`}
            ></i>
          </span>
        </div>
      </div>
    </>
  )
}
