import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-2.style'
import { AwardItemRef, AwardValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface AwardProps extends FocusBlurType {}

export const AwardItem2 = forwardRef((props: AwardProps, ref: Ref<AwardItemRef>) => {
  const { onFocus, onBlur } = props
  const [status, setStatus] = useState<boolean>(true)
  const nameRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    const name = nameRef.current?.getValue().trim() || ''
    if (!name) {
      return null
    }
    return { name }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: AwardValue) {
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
            placeholder="- Giải thưởng"
            ref={nameRef}
            divClassName="h-8 w-full"
            onFocus={onFocus}
            onBlur={onBlur}
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
