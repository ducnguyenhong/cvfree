import React from 'react'
import styled from 'styled-components'

const PublicStyle = styled.div`
  .active {
    color: #3699ff;
    background-color: #e1f0ff;
    width: 100px;
  }
  .inactive {
    color: #f64e60;
    background-color: #ffe2e5;
    width: 100px;
  }
`

export const IsPublic: React.FC<{ isPublic: string }> = (props) => {
  const renderPublic = () => {
    if (props.isPublic === 'PRIVATE') {
      return (
        <span className="inline-block text-center px-3 py-1 rounded-md inactive font-semibold whitespace-nowrap">
          Riêng tư
        </span>
      )
    }
    return (
      <span className="inline-block text-center active px-3 py-1 rounded-md font-semibold whitespace-nowrap">
        Công khai
      </span>
    )
  }

  return <PublicStyle>{renderPublic()}</PublicStyle>
}
