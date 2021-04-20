import React from 'react'
import { Link } from 'react-router-dom'
import { ImageRatio } from 'app/partials/image-ratio/image-ratio'
import DefaultImage from 'assets/images/default.png'

interface CompanyInfoProps {
  logo?: string | null
  name?: string | null
  website?: string | null
  id?: string | number | null
}

export const BasicCompanyInfo: React.FC<CompanyInfoProps> = (props) => {
  const { logo, name, website, id } = props

  if (!id && id !== 0) {
    return null
  }

  return (
    <div className="flex whitespace-nowrap">
      <div className="w-12 h-12">
        <Link to={`/dashboard/companies/${id}`}>
          <ImageRatio src={logo || DefaultImage} />
        </Link>
      </div>
      <div className="ml-3">
        <Link to={`/users/${id}`}>
          {name ? (
            <span
              className={`display-name flex-nowrap block hover:text-blue-800 ${logo ? 'font-bold' : 'font-extrabold'}`}
            >
              {name}
            </span>
          ) : (
            <span className="text-gray-300 block">N/A</span>
          )}
        </Link>
        <span className="opacity-50 text-sm">{website}</span>
      </div>
    </div>
  )
}
