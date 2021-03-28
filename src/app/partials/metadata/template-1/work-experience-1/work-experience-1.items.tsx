import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-1.style'
import { WorkExperienceItemRef, WorkExperienceValue } from 'app/partials/metadata/metadata.type'

export const WorkExperienceItem1 = forwardRef((props: Record<string, unknown>, ref: Ref<WorkExperienceItemRef>) => {
  const [status, setStatus] = useState<boolean>(true)
  const positionRef = useRef<PrInputRefProps>(null)
  const companyNameRef = useRef<PrInputRefProps>(null)
  const descriptionRef = useRef<PrInputRefProps>(null)
  const timeRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    return {
      companyName: companyNameRef.current?.getValue().trim() || '',
      time: timeRef.current?.getValue().trim() || '',
      position: positionRef.current?.getValue().trim() || '',
      description: descriptionRef.current?.getValue().trim() || ''
    }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: WorkExperienceValue) {
      const { companyName, position, description, time } = value
      companyNameRef.current?.setValue(companyName)
      positionRef.current?.setValue(position || '')
      descriptionRef.current?.setValue(description || '')
      timeRef.current?.setValue(time || '')
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
      <div className="metadata-root flex w-full relative">
        <div className="w-full metadata-content">
          <PrInputCV
            placeholder="- Công ty"
            divClassName="h-8 w-full"
            className="bg-transparent w-full py-2 uppercase font-semibold text-gray-600"
            ref={companyNameRef}
          />
          <PrInputCV
            ref={positionRef}
            placeholder=" + Vị trí"
            divClassName="h-8 w-full"
            className="bg-transparent w-full pl-8 text-gray-600"
          />
          <PrInputCV
            ref={timeRef}
            placeholder=" + Thời gian"
            divClassName="h-8 w-full"
            className="bg-transparent w-full pl-8 text-gray-600"
          />
          <PrInputCV
            ref={descriptionRef}
            placeholder=" + Mô tả công việc"
            divClassName="h-16 w-full"
            type="textarea"
            className="bg-transparent w-full pl-8 pt-1 resize-none text-gray-600"
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
