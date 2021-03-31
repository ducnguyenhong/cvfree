import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-1.style'
import { CertificateItemRef, CertificateValue } from 'app/partials/metadata/metadata.type'

export const CertificateItem1 = forwardRef((props: Record<string, unknown>, ref: Ref<CertificateItemRef>) => {
  const [status, setStatus] = useState<boolean>(true)
  const nameRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    return {
      name: nameRef.current?.getValue().trim() || ''
    }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: CertificateValue) {
      const { name } = value
      nameRef.current?.setValue(name)
    }
  }))

  const onRemove = () => {
    setStatus(false)
  }

  if (!status) {
    return null
  }

  return (
    <MetaDataStyle>
      <div className="metadata-root flex w-full pb-0.5 relative">
        <div className="w-full metadata-content">
          <PrInputCV
            placeholder="- Chứng chỉ"
            divClassName="h-8 w-full"
            ref={nameRef}
            className="bg-transparent w-full py-1.5 text-gray-600"
          />
        </div>
        <div className="flex justify-end metadata-control absolute -top-3 -right-2.5">
          <span
            onClick={onRemove}
            className="cursor-pointer bg-red-400 flex justify-center items-center w-5 h-5 rounded-full hover:bg-red-500 duration-300"
          >
            <i className="text-white fas fa-times text-sm"></i>
          </span>
        </div>
      </div>
    </MetaDataStyle>
  )
})