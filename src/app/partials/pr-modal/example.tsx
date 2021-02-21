import PrModal, { PrModalRefProps } from './index'
import { useRef } from 'react'

const Example = () => {
  const modalRef = useRef<PrModalRefProps>(null)
  const onTurnOnModal = () => {
    if (modalRef && modalRef.current && modalRef.current.show) {
      modalRef.current.show()
    }
  }
  const onHideModal = () => {
    if (modalRef && modalRef.current && modalRef.current.hide) {
      modalRef.current.hide()
    }
  }
  const onShowModal = () => {}
  return (
    <div className="App">
      <span className="z-10" onClick={onTurnOnModal}>
        Show Modal
      </span>
      <PrModal ref={modalRef} title="This is modal title" size="nm" onShow={onShowModal} onHide={onHideModal}>
        This is Modal Content
      </PrModal>
    </div>
  )
}

export default Example
