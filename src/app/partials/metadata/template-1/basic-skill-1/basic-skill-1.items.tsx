import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { PrRate, PrRateRefProps } from 'app/partials/pr-rate'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-1.style'
import { BasicSkillValue, BasicSkillItemRef, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface BasicSkillProps extends FocusBlurType {}

export const BasicSkillItem1 = forwardRef((props: BasicSkillProps, ref: Ref<BasicSkillItemRef>) => {
  const { onFocus, onBlur } = props
  const [status, setStatus] = useState<boolean>(true)
  const starRef = useRef<PrRateRefProps>(null)
  const nameRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    return {
      star: starRef.current?.getValue() || 0,
      name: nameRef.current?.getValue().trim() || ''
    }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: BasicSkillValue) {
      const { name, star } = value
      nameRef.current?.setValue(name)
      starRef.current?.setValue(star)
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
      <div className="metadata-root flex w-full pb-3 relative">
        <div className="w-full metadata-content pb-1.5">
          <PrInputCV
            ref={nameRef}
            placeholder="Tên kỹ năng"
            onFocus={onFocus}
            onBlur={onBlur}
            divClassName="h-9 w-full"
            className="bg-transparent w-full text-gray-600 uppercase font-medium"
          />
          <div className="-m-3 ml-5 mt-0.5">
            <PrRate count={5} defaultValue={3} ref={starRef} />
          </div>
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
