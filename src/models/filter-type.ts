import { OptionProps } from 'app/partials/pr-dropdown'

export interface FilterSearchProps {
  label?: string
  prefix: string
  isDetail?: boolean
}

export interface FilterProps extends FilterSearchProps {
  options: OptionProps[]
  isMulti?: boolean
  param: string
}

export interface DataFilter {
  FilterComponent: React.ReactElement
}
