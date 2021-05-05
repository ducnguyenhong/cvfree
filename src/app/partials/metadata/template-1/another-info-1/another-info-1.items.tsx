import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-1.style'
import { AnotherInfoItemRef, AnotherInfoValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface AnotherInfoProps extends FocusBlurType {}

export const AnotherInfoItem1 = forwardRef((props: AnotherInfoProps, ref: Ref<AnotherInfoItemRef>) => {
  const { onFocus, onBlur } = props
  const [status, setStatus] = useState<boolean>(true)
  const infoRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    return {
      info: infoRef.current?.getValue().trim() || ''
    }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: AnotherInfoValue) {
      const { info } = value
      infoRef.current?.setValue(info)
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
      <div className="metadata-root flex w-full pb-4 relative">
        <div className="w-full metadata-content">
          <PrInputCV
            ref={infoRef}
            placeholder=" - Thông tin khác"
            divClassName="h-16 w-full"
            onFocus={onFocus}
            onBlur={onBlur}
            type="textarea"
            className="bg-transparent w-full mt-1.5 resize-none text-gray-600"
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
