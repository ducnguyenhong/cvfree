import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import AdvancedSkillBlackIcon from 'assets/icons/advanced-skill.svg'
import MetaDataAdvancedSkills from 'app/partials/metadata/metadata-advanced-skills'

export const AdvancedSkills: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category border-dashed border relative border-gray-300 p-4 mb-6 rounded group">
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
      <MetaDataAdvancedSkills ref={categoryRef} />
    </div>
  )
}
