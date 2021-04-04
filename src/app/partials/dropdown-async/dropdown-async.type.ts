export interface DropdownAsyncProps {
  labelClassName?: string
  required?: boolean
  isLanguage?: boolean
  label?: string
  defaultValue?: OptionProps[] | OptionProps
  urlApi: string
  isMulti?: boolean
  onChange?: (data: OptionProps[]) => void
  isDisabled?: boolean
}

export interface DropdownAsyncRef {
  getValue?: () => OptionProps[]
  setValue?: (value: OptionProps | OptionProps[] | null) => void
  checkRequired?: () => boolean
  reset?: () => void
}

export interface OptionProps {
  value: string
  label: string
}
