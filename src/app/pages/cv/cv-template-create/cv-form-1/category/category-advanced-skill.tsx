import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import AdvancedSkillBlackIcon from 'assets/icons/advanced-skill.svg'
import { AdvancedSkill1 } from 'app/partials/metadata/template-1'

export const AdvancedSkills: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="flex items-center mb-2">
        <img src={AdvancedSkillBlackIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Kỹ năng chuyên môn</span>
      </div>
      <CategoryControl
        name="advancedSkill"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <AdvancedSkill1 ref={categoryRef} />
    </div>
  )
}
