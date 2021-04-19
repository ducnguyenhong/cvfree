import React from 'react'
import { Link } from 'react-router-dom'

interface TableLinkProps {
  to: string
  title?: number | string
  className?: string
}

export const TableLink: React.FC<TableLinkProps> = (props) => {
  const { to, title, className } = props
  return (
    <Link to={to}>
      <span className={`${className} hover:text-blue-500`}>{title}</span>
    </Link>
  )
}
