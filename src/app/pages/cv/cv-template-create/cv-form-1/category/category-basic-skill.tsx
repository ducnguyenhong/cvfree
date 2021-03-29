import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import BasicSkillIcon from 'assets/icons/basic-skill.svg'
import { BasicSkill1 } from 'app/partials/metadata/template-1'

export const BasicSkills: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategoryLeft, onUpCategoryLeft, onRemoveCategoryLeft, categoryRef } = props
  return (
    <div className="div-one-category-left relative px-2 my-2 pb-1 pt-3 duration-300 rounded group">
      <div className="flex items-center mb-2">
        <img src={BasicSkillIcon} alt="icon" className="w-8 h-8 mr-3" />
        <span className="uppercase font-bold">Kỹ năng cá nhân</span>
      </div>
      <CategoryControl
        name="basicSkill"
        categoryRef={categoryRef}
        onUpCategoryLeft={onUpCategoryLeft}
        onDownCategoryLeft={onDownCategoryLeft}
        onRemoveCategoryLeft={onRemoveCategoryLeft}
      />
      <BasicSkill1 ref={categoryRef} />
    </div>
  )
}
