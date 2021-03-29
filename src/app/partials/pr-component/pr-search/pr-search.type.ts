export interface PrSearchProps {
  onChange?: (data: string) => void
  defaultValue?: string
  placeholder?: string
  labelSearch?: string
  className?: string
}

export interface PrSearchRefProps {
  getValue?: () => void
  setValue?: (keyword: string) => void
}
