import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-1.style'
import { AdvancedSkillItemRef, AdvancedSkillValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface AdvancedSkillItemProps extends FocusBlurType {}

export const AdvancedSkillItem1 = forwardRef((props: AdvancedSkillItemProps, ref: Ref<AdvancedSkillItemRef>) => {
  const { onFocus, onBlur } = props
  const [status, setStatus] = useState<boolean>(true)
  const nameRef = useRef<PrInputRefProps>(null)
  const descriptionRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    return {
      name: nameRef.current?.getValue().trim() || '',
      description: descriptionRef.current?.getValue().trim() || ''
    }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: AdvancedSkillValue) {
      const { name, description } = value
      nameRef.current?.setValue(name)
      descriptionRef.current?.setValue(description || '')
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
            ref={nameRef}
            placeholder="- Kỹ năng"
            onFocus={onFocus}
            onBlur={onBlur}
            divClassName="h-8 w-full"
            className="bg-transparent w-full py-2  uppercase font-semibold text-gray-600"
          />
          <PrInputCV
            ref={descriptionRef}
            placeholder=" + Mô tả chi tiết"
            divClassName="h-16 w-full"
            onFocus={onFocus}
            onBlur={onBlur}
            type="textarea"
            className="bg-transparent w-full pl-8 mt-1.5 resize-none text-gray-600"
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
