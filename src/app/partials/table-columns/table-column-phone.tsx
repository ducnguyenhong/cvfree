import React from 'react'

interface PhoneProps {
  phone?: number | string | null
}

export const Phone: React.FC<PhoneProps> = (props) => {
  const { phone } = props

  if (!phone) {
    return <></>
  }

  return (
    <a href={`tel:${phone}`} className="hover:text-blue-600 duration-300">
      {phone}
    </a>
  )
}
