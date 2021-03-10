import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import AnotherInfoIcon from 'assets/icons/another-info.svg'
import MetaDataAnotherInfos from 'app/partials/metadata/metadata-another-infos'

export const AnotherInfos: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category border-dashed border relative border-gray-300 p-4 mb-6 rounded group">
      <div className="flex items-center">
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
