export interface PrInputProps {
  value?: string
  onChange?: (data: string) => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  defaultValue?: string
  required?: boolean
  maxLength?: number
  minLength?: number
  label?: string | React.ReactElement
  type?: 'password' | 'text' | 'textarea' | 'number'
  icon?: string
  errorMessage?: string
  divClassName?: string
  disabled?: boolean
  isCurrency?: boolean
}

export interface PrInputRefProps {
  getValue: () => string
  setValue: (keyword: string) => void
  setErrorMessage: (err: string) => void
  reset: () => void
  checkRequired: () => boolean
}
