import { AvatarUser } from 'app/partials/image-ratio/user-avatar'
import React from 'react'
import { Link } from 'react-router-dom'

interface UserInfoProps {
  avatar?: string | null
  name?: string | null
  username?: string | null
  id?: string | number | null
  gender?: string
}

export const BasicUserInfo: React.FC<UserInfoProps> = (props) => {
  const { avatar, name, username, id, gender } = props

  if (!id && id !== 0) {
    return null
  }

  const renderGender = (gender?: string) => {
    if (gender === 'MALE') {
      return <i className="fas fa-mars text-blue-500 ml-3" />
    }
    if (gender === 'FEMALE') {
      return <i className="fas fa-venus text-pink-500 ml-3" />
    }
    return null
  }

  return (
    <div className="flex whitespace-nowrap">
      <div className="w-12 h-12">
        <Link to={`/dashboard/users/${id}`}>
          <AvatarUser src={avatar} gender={gender} />
        </Link>
      </div>
      <div className="ml-3">
        <Link to={`/users/${id}`}>
          {name ? (
            <span
              className={`display-name flex-nowrap block hover:text-blue-800 ${
                avatar ? 'font-bold' : 'font-extrabold'
              }`}
            >
              {name}
              {renderGender(gender)}
            </span>
          ) : (
            <span className="text-gray-300 block">N/A</span>
          )}
        </Link>
        <span className="opacity-50 text-sm">{username}</span>
      </div>
    </div>
  )
}
