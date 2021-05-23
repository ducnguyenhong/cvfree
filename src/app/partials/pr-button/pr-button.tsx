import styled from 'styled-components'

interface PrButtonProps {
  children?: React.ReactElement | string | React.ReactElement[] | (string | React.ReactElement)[]
  type?: 'primary' | 'danger' | 'success'
  className?: string
  onClick?: () => void
  disable?: boolean
}

const PrButtonStyle = styled.div`
  .bg-primary {
    background-color: #059669;
    &:hover {
      background-color: #047857;
    }
  }

  .bg-success {
    background-color: #059669;
    &:hover {
      background-color: #047857;
    }
  }

  .bg-danger {
    background-color: #d73131;
    &:hover {
      background-color: #bc0808;
    }
  }

  .disable {
    background-color: #919191;
  }
`

const PrButtonLayout: React.FC<PrButtonProps> = (props) => {
  const { children, type, className, onClick, disable } = props

  return (
    <PrButtonStyle>
      <span
        onClick={disable ? undefined : onClick}
        className={`${className} bg-${
          disable ? 'disable' : type
        } inline-block px-4 py-2 duration-300 text-white rounded cursor-pointer`}
      >
        {children}
      </span>
    </PrButtonStyle>
  )
}

export default PrButtonLayout
