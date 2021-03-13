import PrInputCV from 'app/partials/pr-input-cv'
import HobbyIcon from 'assets/icons/hobby.svg'
import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'

export const Hobbies: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategoryLeft, onUpCategoryLeft, onRemoveCategoryLeft, inputRef } = props
  return (
    <div className="div-one-category-left relative px-2 pb-3 my-2 duration-300 pt-1 rounded group">
      <div className="flex items-center mb-2">
        <img src={HobbyIcon} alt="icon" className="w-8 h-8 mr-3" />
        <span className="uppercase font-bold">Sở thích</span>
      </div>
      <CategoryControl
        name="hobby"
        inputRef={inputRef}
        onUpCategoryLeft={onUpCategoryLeft}
        onDownCategoryLeft={onDownCategoryLeft}
        onRemoveCategoryLeft={onRemoveCategoryLeft}
        disableCreate
      />
      <PrInputCV
        ref={inputRef}
        divClassName="h-16"
        placeholder="- Đọc sách, nghe nhạc..."
        type="textarea"
        className="w-full bg-transparent rounded py-2 px-2 resize-none text-gray-600 category-hobby"
      />
    </div>
  )
}
