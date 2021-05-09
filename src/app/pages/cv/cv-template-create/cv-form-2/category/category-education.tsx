import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import { Education2 } from 'app/partials/metadata/template-2'

export const Educations: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef, onBlur, onFocus } = props
  return (
    <div className="div-one-category relative px-2 py-1 duration-300 mb-3 rounded group">
      <div className="flex items-center mb-2 border-gray-300 border border-t-0 border-r-0 border-l-0">
        <span className="uppercase font-bold pb-1 border-gray-500 border-2 border-t-0 border-r-0 border-l-0 bg-white text-base relative top-px">
          Học vấn
        </span>
      </div>
      <CategoryControl
        name="education"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <Education2 ref={categoryRef} onBlur={onBlur} onFocus={onFocus} />
    </div>
  )
}
