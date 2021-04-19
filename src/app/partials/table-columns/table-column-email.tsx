import React from 'react'

interface EmailProps {
  email?: string | null
}

export const Email: React.FC<EmailProps> = (props) => {
  const { email } = props

  if (!email) {
    return <></>
  }

  return (
    <a href={`mailto:${email}`} className="hover:text-blue-600 duration-300">
      {email}
    </a>
  )
}
