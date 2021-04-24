import { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import PopupLib from './popup-confirm.library'
import { PopupProps, PopupConfirmRef } from './popup-confirm.type'

export const PopupConfirm = forwardRef((props: PopupProps, ref: Ref<PopupConfirmRef>) => {
  const { okTitle, cancelTitle, onChange, size, title, onShow, onHide, children, show, type, onClickOutside } = props
  const [visible, setVisible] = useState<boolean>(show || false)

  useImperativeHandle(ref, () => ({
    hide() {
      setVisible(false)
    },
    show() {
      setVisible(true)
    }
  }))

  return (
    <PopupLib
      visible={visible}
      title={title}
      onHide={onHide}
      onChange={onChange}
      type={type}
      size={size}
      onShow={onShow}
      okTitle={okTitle}
      cancelTitle={cancelTitle}
      onClickOutside={onClickOutside}
    >
      {children}
    </PopupLib>
  )
})
