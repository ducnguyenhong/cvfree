import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import { Activity2 } from 'app/partials/metadata/template-2'

export const Activities: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef, onFocus, onBlur } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="mb-2">
        <span className="uppercase font-bold py-1 bg-pink-100 text-base relative block px-4">Hoạt động</span>
      </div>
      <CategoryControl
        name="activity"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <Activity2 ref={categoryRef} onFocus={onFocus} onBlur={onBlur} />
    </div>
  )
}
