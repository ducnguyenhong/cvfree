import { RefObject } from 'react'
import { MetaDataRefProps } from 'models/metadata-type'

export interface CategoryControlProps extends CategoryComponentProps {
  name: string
}

export interface CategoryComponentProps {
  categoryRef: RefObject<MetaDataRefProps>
  onDownCategory: (name: string) => void
  onUpCategory: (name: string) => void
  onRemoveCategory: (name: string) => void
}

export interface CategoryProps {
  name: string
  title: string
  enable: boolean
  component: (props: CategoryComponentProps) => React.ReactElement
  categoryRef: RefObject<MetaDataRefProps>
}

export interface CvFormProps {}
