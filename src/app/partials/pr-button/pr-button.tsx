import styled from 'styled-components'

interface PrButtonProps {
  children?: React.ReactElement | string | React.ReactElement[] | (string | React.ReactElement)[]
  type?: 'primary' | 'danger' | 'success'
  className?: string
  onClick?: () => void
}

const PrButtonStyle = styled.div`
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
`

const PrButtonLayout: React.FC<PrButtonProps> = (props) => {
  const { children, type, className, onClick } = props

  return (
    <PrButtonStyle>
      <span
        onClick={onClick}
        className={`${className} bg-${type} inline-block px-4 py-2 duration-300 text-white rounded cursor-pointer`}
      >
        {children}
      </span>
    </PrButtonStyle>
  )
}

export default PrButtonLayout
