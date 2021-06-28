import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import { Education2 } from 'app/partials/metadata/template-2'

export const Educations: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef, onBlur, onFocus } = props
  return (
    <div className="div-one-category relative px-2 py-1 duration-300 mb-3 rounded group">
      <div className="mb-2">
        <span className="uppercase font-bold py-1 bg-pink-100 text-base relative block px-4">Học vấn</span>
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
