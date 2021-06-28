import { CvInfo } from 'models/cv-info'
import { RefObject } from 'react'

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
  categoryRef?: any
  onDownCategory?: (name: string) => void
  onUpCategory?: (name: string) => void
  onRemoveCategory?: (name: string) => void
  onDownCategoryLeft?: (name: string) => void
  onUpCategoryLeft?: (name: string) => void
  onRemoveCategoryLeft?: (name: string) => void
  inputRef?: RefObject<PrInputCVRefProps>
  onFocus?: () => void
  onBlur?: () => void
}

export interface CategoryProps {
  name: string
  title: string
  enable: boolean
  component: (props: CategoryComponentProps) => React.ReactElement
  categoryRef?: any
  inputRef?: RefObject<PrInputCVRefProps>
}

export interface CvFormProps {
  cvInfo?: CvInfo | null
  refreshCvInfo?: () => void
}
