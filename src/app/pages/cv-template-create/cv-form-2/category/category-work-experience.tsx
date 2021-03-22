import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import WorkExperienceIcon from 'assets/icons/experience.svg'
import MetaDataWorkExperiences from 'app/partials/metadata/metadata-work-experiences'

export const WorkExperiences: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="flex items-center mb-2">
        <img src={WorkExperienceIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Kinh nghiệm làm việc</span>
      </div>
      <CategoryControl
        name="workExperience"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataWorkExperiences ref={categoryRef} />
    </div>
  )
}
