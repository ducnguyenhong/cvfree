import React from 'react'

interface ActiveProps {
  active?: boolean
}

export const Active: React.FC<ActiveProps> = (props) => {
  const { active } = props

  if (active) {
    return <i className="fas fa-check-circle text-xl text-green-500"></i>
  }

  return <i className="fas fa-times-circle text-xl text-red-500"></i>
}
