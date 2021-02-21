import { forwardRef, useState, useImperativeHandle, Ref } from 'react'
import ModalLib from './data/library'
import { PrModalProps, PrModalRefProps } from './data/type'

const PrModal = forwardRef((props: PrModalProps, ref: Ref<PrModalRefProps>) => {
  const [visible, setVisible] = useState<boolean>(false)
  const { okTitle, cancelTitle, onChange, size, title, onShow, onHide, children, disableFooter, disableHeader } = props

  useImperativeHandle(ref, () => ({
    hide() {
      setVisible(false)
    },
    show() {
      setVisible(true)
    }
  }))

  return (
    <ModalLib
      visible={visible}
      title={title}
      onHide={onHide}
      onChange={onChange}
      size={size}
      onShow={onShow}
      okTitle={okTitle}
      cancelTitle={cancelTitle}
      disableFooter={disableFooter}
      disableHeader={disableHeader}
    >
      {children}
    </ModalLib>
  )
})

PrModal.displayName = 'PrModal'

export default PrModal
