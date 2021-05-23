export interface ModalLibProps {
  visible: boolean
  title?: string | React.ReactElement
  children?: string | React.ReactElement | React.ReactElement[]
  onShow?: () => void
  onHide?: () => void
  onChange?: () => void
  size?: 'lg' | 'nm' | 'sm'
  okTitle?: string | React.ReactElement
  cancelTitle?: string | React.ReactElement
  disableFooter?: boolean
  disableHeader?: boolean
  disableX?: boolean
  position?: 'fixed' | 'absolute'
}

export interface PrModalProps {
  title?: string | React.ReactElement
  children?: string | React.ReactElement
  onShow?: () => void
  onHide?: () => void
  onChange?: () => void
  size?: 'lg' | 'nm' | 'sm'
  okTitle?: string | React.ReactElement
  cancelTitle?: string | React.ReactElement
  disableFooter?: boolean
  disableHeader?: boolean
  disableX?: boolean
  position?: 'fixed' | 'absolute'
}

export interface PrModalRefProps {
  show: () => void
  hide: () => void
}
