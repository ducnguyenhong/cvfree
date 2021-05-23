import React from 'react'
import { Link } from 'react-router-dom'
import { slugURL } from 'utils/helper'

interface ActionProps {
  id?: number | string
  fullname?: string
}

export const Action: React.FC<ActionProps> = (props) => {
  const { id, fullname } = props
  // const setShowDeactive = useSetRecoilState(showDeactiveCvState)

  // const onShowDeactiveCv = () => {
  //   setShowDeactive({ showPopup: true, id })
  // }

  return (
    <>
      <div className="flex items-center">
        <div
          className="flex rounded-md items-center justify-center bg-gray-100 hover:bg-indigo-500 mr-4 duration-300"
          style={{ width: 32, height: 32 }}
        >
          <a href={`/cv-public/${slugURL(fullname)}.${id}`} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-eye text-gray-500 px-3 py-4 hover:text-white"></i>
          </a>
        </div>
        <div
          className="flex rounded-md items-center justify-center bg-gray-100 hover:bg-indigo-500 mr-4 duration-300"
          style={{ width: 32, height: 32 }}
        >
          <Link to={`/update-cv/${slugURL(fullname)}.${id}`}>
            <i className="fas fa-edit text-gray-500 px-3 py-4 hover:text-white"></i>
          </Link>
        </div>
        {/* <div
          className="cursor-pointer hover:bg-red-400 flex rounded-md items-center justify-center duration-300 bg-gray-100"
          style={{ width: 32, height: 32 }}
          onClick={onShowDeactiveCv}
        >
          <span>
            <i className="hover:text-white text-gray-500 fas fa-trash px-3 py-4"></i>
          </span>
        </div> */}
      </div>
    </>
  )
}
