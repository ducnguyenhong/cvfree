import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import AnotherInfoIcon from 'assets/icons/another-info.svg'
import MetaDataAnotherInfos from 'app/partials/metadata/metadata-another-infos'

export const AnotherInfos: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="flex items-center mb-2">
        <img src={AnotherInfoIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Thông tin khác</span>
      </div>
      <CategoryControl
        name="anotherInfo"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataAnotherInfos ref={categoryRef} />
    </div>
  )
}
