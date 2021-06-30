import React from 'react'
import { slugURL } from 'utils/helper'

interface JobInfoProps {
  name: string
  id?: string | number | null
}

export const BasicJobInfo: React.FC<JobInfoProps> = (props) => {
  const { name, id } = props

  if (!id && id !== 0) {
    return null
  }

  return (
    <div className="flex whitespace-nowrap">
      <div className="ml-3">
        <a href={`/jobs/${slugURL(name)}.${id}`} target="_blank" className="font-medium" rel="noopener noreferrer">
          <span className="display-name flex-nowrap block hover:text-blue-800 font-bold">{name}</span>
        </a>
      </div>
    </div>
  )
}
