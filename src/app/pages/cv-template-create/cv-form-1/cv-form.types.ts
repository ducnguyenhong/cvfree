import { RefObject } from 'react'
import { MetaDataRefProps } from 'models/metadata-type'

export interface CategoryControlProps extends CategoryComponentProps {
  name: string
  disableCreate?: boolean
}

export interface PrInputCVRefProps {
  getValue: () => string
  setValue: (keyword: string) => void
  setErrorMessage: (err: string) => void
  reset: () => void
  checkRequired: () => boolean
}

export interface CategoryComponentProps {
  categoryRef?: RefObject<MetaDataRefProps>
  onDownCategory?: (name: string) => void
  onUpCategory?: (name: string) => void
  onRemoveCategory?: (name: string) => void
  onDownCategoryLeft?: (name: string) => void
  onUpCategoryLeft?: (name: string) => void
  onRemoveCategoryLeft?: (name: string) => void
  inputRef?: RefObject<PrInputCVRefProps>
}

export interface CategoryProps {
  name: string
  title: string
  enable: boolean
  component: (props: CategoryComponentProps) => React.ReactElement
  categoryRef?: RefObject<MetaDataRefProps>
  inputRef?: RefObject<PrInputCVRefProps>
}

export interface CvFormProps {}
