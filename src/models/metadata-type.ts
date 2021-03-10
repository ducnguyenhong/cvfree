export interface MetaDataRefProps {
  getValue: () => void
  setValue?: (keyword: string) => void
  validate: () => boolean
  onCreate: () => void
}
