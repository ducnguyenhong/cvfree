import { AdvancedSkill2 } from 'app/partials/metadata/template-2'
import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'

export const AdvancedSkills: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef, onFocus, onBlur } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="mb-2">
        <span className="uppercase font-bold py-1 bg-pink-100 text-base relative block px-4">Kỹ năng chuyên môn</span>
      </div>
      <CategoryControl
        name="advancedSkill"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <AdvancedSkill2 ref={categoryRef} onFocus={onFocus} onBlur={onBlur} />
    </div>
  )
}
