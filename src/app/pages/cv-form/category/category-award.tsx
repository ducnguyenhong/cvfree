import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import AwardIcon from 'assets/icons/award.svg'
import MetaDataAwards from 'app/partials/metadata/metadata-awards'

export const Awards: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category border-dashed border relative border-gray-300 p-4 mb-6 rounded group">
      <div className="flex items-center">
        <img src={AwardIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Giải thưởng</span>
      </div>
      <CategoryControl
        name="award"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataAwards ref={categoryRef} />
    </div>
  )
}
