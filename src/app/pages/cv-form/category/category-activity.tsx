import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import MetaDataActivities from 'app/partials/metadata/metadata-activities'
import ActivityBlackIcon from 'assets/icons/activity.svg'

export const Activities: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category border-dashed border relative border-gray-300 p-4 mb-6 rounded group">
      <div className="flex items-center">
        <img src={ActivityBlackIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Hoạt động</span>
      </div>
      <CategoryControl
        name="activity"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataActivities ref={categoryRef} />
    </div>
  )
}
