import { AvatarUser } from 'app/partials/image-ratio/user-avatar'
import React from 'react'
import { Link } from 'react-router-dom'

interface UserInfoProps {
  avatar?: string | null
  name?: string | null
  username?: string | null
  id?: string | number | null
}

export const BasicUserInfo: React.FC<UserInfoProps> = (props) => {
  const { avatar, name, username, id } = props

  if (!id && id !== 0) {
    return null
  }

  return (
    <div className="flex whitespace-nowrap">
      <div className="w-12 h-12">
        <Link to={`/users/${id}`}>
          <AvatarUser src={avatar} />
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
            </span>
          ) : (
            <span className="text-gray-300 block">N/A</span>
          )}
        </Link>
        <span className="opacity-50">{username}</span>
      </div>
    </div>
  )
}
