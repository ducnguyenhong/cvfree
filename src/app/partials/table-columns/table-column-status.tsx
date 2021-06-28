import React from 'react'
import styled from 'styled-components'

const StatusStyle = styled.div`
  .active {
    color: #3699ff;
    background-color: #e1f0ff;
    min-width: 70px;
  }
  .inactive {
    color: #f64e60;
    background-color: #ffe2e5;
    min-width: 70px;
  }
`

export const Status: React.FC<{ status?: string }> = (props) => {
  const renderStatus = () => {
    if (!props?.status) {
      return null
    }
    if (props.status === 'INACTIVE') {
      return (
        <span className="inline-block text-center px-3 py-1 rounded-md inactive font-semibold whitespace-nowrap">
          Inactive
        </span>
      )
    }
    return (
      <span className="inline-block text-center active px-3 py-1 rounded-md font-semibold whitespace-nowrap">
        Active
      </span>
    )
  }

  return <StatusStyle>{renderStatus()}</StatusStyle>
}
