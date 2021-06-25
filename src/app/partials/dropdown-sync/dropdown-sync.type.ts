export interface DropdownSyncProps {
  options: OptionProps[]
  onChange?: (data: OptionProps[]) => void
  defaultValue?: OptionProps[] | OptionProps
  isMulti?: boolean
  isClearable?: boolean
  isDisabled?: boolean
  placeholder?: string
  required?: boolean
  label?: string
  isLanguage?: boolean
  requiredMesseage?: string
  labelClassName?: string
}

export interface DropdownSyncRef {
  getValue: () => OptionProps[]
  setValue: (value: OptionProps | OptionProps[] | null) => void
  checkRequired: () => boolean
  reset: () => void
}

export interface OptionProps {
  value: string
  label: string
}
