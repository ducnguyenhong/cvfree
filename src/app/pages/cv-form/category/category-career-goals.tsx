import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import CareerGoalsIcon from 'assets/icons/goals.svg'
import PrInputCV from 'app/partials/pr-input-cv'

export const CareerGoals: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategoryLeft, onUpCategoryLeft, onRemoveCategoryLeft, inputRef } = props
  return (
    <div className="div-one-category-left relative my-2 px-2 pb-3 pt-1 duration-300 rounded group">
      <div className="flex items-center mb-2">
        <img src={CareerGoalsIcon} alt="icon" className="w-8 h-8 mr-3" />
        <span className="uppercase font-bold">Mục tiêu nghề nghiệp</span>
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
        divClassName="h-40"
        type="textarea"
        className="w-full bg-transparent rounded py-2 resize-none text-gray-600 category-career-goals"
      />
    </div>
  )
}
