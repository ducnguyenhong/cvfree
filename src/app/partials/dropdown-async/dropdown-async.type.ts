export interface DropdownAsyncProps {
  labelClassName?: string
  required?: boolean
  isLanguage?: boolean
  label?: string
  defaultValue?: OptionProps[] | OptionProps
  urlApi: string
}

export interface DropdownAsyncRef {
  getValue?: () => void
  setValue?: (value: OptionProps | OptionProps[] | null) => void
  checkRequired?: () => boolean
  reset?: () => void
}

export interface OptionProps {
  value: string
  label: string
}
