import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import AwardIcon from 'assets/icons/award.svg'
import { Award1 } from 'app/partials/metadata/template-1'

export const Awards: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="flex items-center mb-2">
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
      <Award1 ref={categoryRef} />
    </div>
  )
}
