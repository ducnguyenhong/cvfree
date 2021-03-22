import { CategoryComponentProps } from '../cv-form.types'
import { CategoryControl } from './category-control'
import CerticficateBlackIcon from 'assets/icons/certificate.svg'
import MetaDataCertificates from 'app/partials/metadata/metadata-certificates'

export const Certificates: React.FC<CategoryComponentProps> = (props) => {
  const { onDownCategory, onUpCategory, onRemoveCategory, categoryRef } = props
  return (
    <div className="div-one-category relative px-2 py-1 mb-3 duration-300 rounded group">
      <div className="flex items-center mb-2">
        <img src={CerticficateBlackIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Chứng chỉ</span>
      </div>
      <CategoryControl
        name="certificate"
        categoryRef={categoryRef}
        onUpCategory={onUpCategory}
        onDownCategory={onDownCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <MetaDataCertificates ref={categoryRef} />
    </div>
  )
}
