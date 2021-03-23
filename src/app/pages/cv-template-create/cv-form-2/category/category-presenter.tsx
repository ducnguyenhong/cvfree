import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import PresenterIcon from 'assets/icons/presenter.svg'
import MetaDataPresenters from 'app/partials/metadata/metadata-presenters'

export const Presenters: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="flex items-center mb-2">
        <img src={PresenterIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Người giới thiệu</span>
      </div>
      <CategoryControl
        name="presenter"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataPresenters ref={categoryRef} />
    </div>
  )
}