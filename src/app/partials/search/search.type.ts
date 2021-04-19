export interface SearchProps {
  onChange?: (data: string) => void
  defaultValue?: string
  placeholder?: string
  labelSearch?: string
  className?: string
}

export interface SearchRefProps {
  getValue?: () => void
  setValue?: (keyword: string) => void
}
