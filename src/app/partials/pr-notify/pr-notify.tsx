import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styled from 'styled-components'

const PrNotifyStyle = styled.div`
  .Toastify__toast-container {
    padding: 0 !important;
  }
  .Toastify__progress-bar {
    border-bottom-left-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
  }
  .bg-success {
    background-color: #11ac1a;
  }
  .bg-warning {
    background-color: #d78514;
  }
  .bg-error {
    background-color: #d11515;
  }
  .bg-default {
    background-color: #830c82;
  }
  .bg-dark {
    background-color: #494949;
  }
`

export const showNotify = toast

const PrNotifyLayout: React.FC = () => {
  return (
    <PrNotifyStyle>
      <ToastContainer
        toastClassName={({ type }: any) =>
          `bg-${type} flex justify-between items-center overflow-hidden cursor-pointer rounded mt-3 pl-3`
        }
        bodyClassName={() => ' text-white block px-4 py-6'}
      />
    </PrNotifyStyle>
  )
}

export default PrNotifyLayout
