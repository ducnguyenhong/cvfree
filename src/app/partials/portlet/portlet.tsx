import React from 'react'
import { PorletHeaderProps } from './portlet.type'

export const Portlet: React.FC = (props) => {
  const { children } = props
  return <div className="bg-white rounded-lg shadow-lg">{children}</div>
}

export const PortletHeader: React.FC<PorletHeaderProps> = (props) => {
  const { title, toolbar } = props
  return (
    <div className="flex items-center justify-between rounded bg-white px-7" style={{ borderBottomWidth: 1 }}>
      <div className="py-4">
        <span className="uppercase font-bold">{title}</span>
      </div>
      <div>{toolbar}</div>
    </div>
  )
}

export const PortletBody: React.FC = (props) => {
  const { children } = props
  return <div className="bg-white rounded p-7">{children}</div>
}

export const PortletFooter: React.FC = () => {
  return <div></div>
}
