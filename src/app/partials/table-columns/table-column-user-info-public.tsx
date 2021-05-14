import { AvatarUser } from 'app/partials/image-ratio/user-avatar'
import React from 'react'

interface UserInfoProps {
  avatar?: string | null
  name?: string | null
  gender?: string
}

export const PublicUserInfo: React.FC<UserInfoProps> = (props) => {
  const { avatar, name, gender } = props

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
    <div className="flex whitespace-nowrap items-center">
      <div className="w-12 h-12">
        <span>
          <AvatarUser src={avatar} gender={gender} />
        </span>
      </div>
      <div className="ml-3">
        <span>
          {name ? (
            <span className={`display-name flex-nowrap block ${avatar ? 'font-bold' : 'font-extrabold'}`}>
              {name}
              {renderGender(gender)}
            </span>
          ) : (
            <span className="text-gray-300 block">N/A</span>
          )}
        </span>
      </div>
    </div>
  )
}
