import { AvatarUser } from 'app/partials/image-ratio/user-avatar'
import React from 'react'
import { slugURL } from 'utils/helper'

interface CvInfoProps {
  fullname: string
  id?: string | number | null
  gender?: string
  avatar?: string
  cvName?: string
}

export const BasicCvPublicInfo: React.FC<CvInfoProps> = (props) => {
  const { id, fullname, gender, avatar, cvName } = props

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
        <a
          href={`/cv-public/${slugURL(fullname)}.${id.toString()}`}
          target="_blank"
          className="font-semibold"
          rel="noopener noreferrer"
        >
          <AvatarUser src={avatar} gender={gender} />
        </a>
      </div>
      <div className="ml-3">
        <a
          href={`/cv-public/${slugURL(fullname)}.${id.toString()}`}
          target="_blank"
          className="font-semibold"
          rel="noopener noreferrer"
        >
          {fullname ? (
            <span className={`display-name flex-nowrap block hover:text-blue-800 font-bold'`}>
              {fullname.toUpperCase()}
              {renderGender(gender)}
            </span>
          ) : (
            <span className="text-gray-300 block">N/A</span>
          )}
        </a>
        <span className="opacity-50 text-sm">{cvName}</span>
      </div>
    </div>
  )
}
