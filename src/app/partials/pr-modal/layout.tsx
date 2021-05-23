import { forwardRef, useState, useImperativeHandle, Ref } from 'react'
import ModalLib from './data/library'
import { PrModalProps, PrModalRefProps } from './data/type'

const PrModal = forwardRef((props: PrModalProps, ref: Ref<PrModalRefProps>) => {
  const [visible, setVisible] = useState<boolean>(false)
  const {
    okTitle,
    cancelTitle,
    onChange,
    size,
    title,
    onShow,
    onHide,
    children,
    disableFooter,
    disableHeader,
    disableX,
    position
  } = props

  useImperativeHandle(ref, () => ({
    hide() {
      setVisible(false)
    },
    show() {
      setVisible(true)
    }
  }))

  const onClose = () => {
    setVisible(false)
    onHide && onHide()
  }

  return (
    <ModalLib
      visible={visible}
      title={title}
      onHide={onClose}
      position={position}
      onChange={onChange}
      size={size}
      onShow={onShow}
      okTitle={okTitle}
      cancelTitle={cancelTitle}
      disableFooter={disableFooter}
      disableHeader={disableHeader}
      disableX={disableX}
    >
      {children}
    </ModalLib>
  )
})

PrModal.displayName = 'PrModal'

export default PrModal
