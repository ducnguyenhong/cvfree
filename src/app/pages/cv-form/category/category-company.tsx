import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import CompanyBlackIcon from 'assets/icons/experience.svg'
import MetaDataCompanies from 'app/partials/metadata/metadata-companies'

export const Companies: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category border-dashed border relative border-gray-300 p-4 mb-6 rounded group">
      <div className="flex items-center mb-2">
        <img src={CompanyBlackIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Kinh nghiệm làm việc</span>
      </div>
      <CategoryControl
        name="company"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataCompanies ref={categoryRef} />
    </div>
  )
}
