import PrInputCV from 'app/partials/pr-input-cv'
import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'

export const CareerGoals: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategoryLeft, onUpCategoryLeft, onRemoveCategoryLeft, inputRef, onFocus, onBlur } = props
  return (
    <div className="div-one-category-left relative my-2 px-2 pb-3 pt-1 duration-300 rounded group">
      <div className="flex items-center mb-2 border-gray-300 border border-t-0 border-r-0 border-l-0">
        <span className="uppercase font-bold border-gray-500 border-2 border-t-0 border-r-0 border-l-0 bg-white text-base relative top-px">
          Mục tiêu nghề nghiệp
        </span>
      </div>
      <CategoryControl
        name="careerGoals"
        inputRef={inputRef}
        onUpCategoryLeft={onUpCategoryLeft}
        onDownCategoryLeft={onDownCategoryLeft}
        onRemoveCategoryLeft={onRemoveCategoryLeft}
        disableCreate
      />
      <PrInputCV
        ref={inputRef}
        divClassName="h-44"
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder=" - Mục tiêu ngắn hạn, mục tiêu dài hạn..."
        type="textarea"
        className="w-full bg-transparent rounded py-2 resize-none text-gray-600 category-career-goals"
      />
    </div>
  )
}
