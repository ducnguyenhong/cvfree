import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import MetaDataSchools from 'app/partials/metadata/metadata-schools'
import SchoolHatBlackIcon from 'assets/icons/school.svg'

export const Schools: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category border-dashed border relative border-gray-300 p-4 mb-6 rounded group">
      <div className="flex items-center mb-2">
        <img src={SchoolHatBlackIcon} alt="skill" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Học vấn</span>
      </div>
      <CategoryControl
        name="school"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataSchools ref={categoryRef} />
    </div>
  )
}
