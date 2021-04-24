export interface PopupLibProps {
  visible: boolean
  title?: string | React.ReactElement
  children?: string | React.ReactElement | React.ReactElement[]
  onShow?: () => void
  onHide?: () => void
  onChange?: () => void
  size?: 'lg' | 'nm' | 'sm'
  okTitle?: string | React.ReactElement
  cancelTitle?: string | React.ReactElement
  show?: boolean
  type?: 'danger' | 'success'
  onClickOutside?: () => void
}

export interface PopupProps {
  title?: string | React.ReactElement
  children?: string | React.ReactElement
  onShow?: () => void
  onHide?: () => void
  onChange?: () => void
  size?: 'lg' | 'nm' | 'sm'
  okTitle?: string | React.ReactElement
  cancelTitle?: string | React.ReactElement
  show?: boolean
  onClickOutside?: () => void
  type?: 'danger' | 'success'
}

export interface PopupConfirmRef {
  show: () => void
  hide: () => void
}
