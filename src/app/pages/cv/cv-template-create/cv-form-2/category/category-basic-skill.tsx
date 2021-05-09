import { BasicSkill2 } from 'app/partials/metadata/template-2'
import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'

export const BasicSkills: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategoryLeft, onUpCategoryLeft, onRemoveCategoryLeft, categoryRef, onFocus, onBlur } = props
  return (
    <div className="div-one-category-left relative px-2 my-2 pb-1 pt-3 duration-300 rounded group">
      <div className="flex items-center mb-2 border-gray-300 border border-t-0 border-r-0 border-l-0">
        <span className="uppercase font-bold border-gray-500 border-2 border-t-0 border-r-0 border-l-0 bg-white text-base relative top-px">
          Kỹ năng cá nhân
        </span>
      </div>
      <CategoryControl
        name="basicSkill"
        categoryRef={categoryRef}
        onUpCategoryLeft={onUpCategoryLeft}
        onDownCategoryLeft={onDownCategoryLeft}
        onRemoveCategoryLeft={onRemoveCategoryLeft}
      />
      <BasicSkill2 ref={categoryRef} onFocus={onFocus} onBlur={onBlur} />
    </div>
  )
}
