import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-1.style'
import { ActivityItemRef, ActivityValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface ActivityProps extends FocusBlurType {}

export const ActivityItem1 = forwardRef((props: ActivityProps, ref: Ref<ActivityItemRef>) => {
  const { onFocus, onBlur } = props
  const [status, setStatus] = useState<boolean>(true)
  const timeRef = useRef<PrInputRefProps>(null)
  const nameRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    return {
      time: timeRef.current?.getValue() || '',
      name: nameRef.current?.getValue().trim() || ''
    }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: ActivityValue) {
      const { name, time } = value
      nameRef.current?.setValue(name)
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
      <div className="metadata-root flex w-full pb-0.5 relative">
        <div className="w-full metadata-content">
          <PrInputCV
            placeholder="- Hoạt động"
            divClassName="h-8 w-full"
            ref={nameRef}
            onFocus={onFocus}
            onBlur={onBlur}
            className="bg-transparent w-full pt-1.5 pb-0.5 text-gray-600 font-medium uppercase"
          />
          <PrInputCV
            placeholder=" + Thời gian"
            divClassName="h-8 w-full"
            onFocus={onFocus}
            onBlur={onBlur}
            ref={timeRef}
            className="bg-transparent w-full pl-8 pb-2 text-gray-600"
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
