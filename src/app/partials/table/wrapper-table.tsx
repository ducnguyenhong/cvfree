import React from 'react'
import { Portlet, PortletHeader, PortletBody } from 'app/partials/portlet'

export interface WrapperTableProps {
  title: string | React.ReactElement
  toolbar?: React.ReactElement | React.FC
}

export const WrapperTable: React.FC<WrapperTableProps> = (props) => {
  const { title, toolbar, children } = props

  return (
    <div className="w-full">
      <Portlet>
        <PortletHeader title={title} toolbar={toolbar} />
        <PortletBody>{children}</PortletBody>
      </Portlet>
    </div>
  )
}
