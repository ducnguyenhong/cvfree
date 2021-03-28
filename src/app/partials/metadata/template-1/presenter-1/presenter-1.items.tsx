import { PrInputRefProps } from 'app/partials/pr-input'
import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { MetaDataStyle } from '../template-1.style'
import { PresenterItemRef, PresenterValue } from 'app/partials/metadata/metadata.type'

export const PresenterItem1 = forwardRef((props: Record<string, unknown>, ref: Ref<PresenterItemRef>) => {
  const [status, setStatus] = useState<boolean>(true)
  const positionRef = useRef<PrInputRefProps>(null)
  const companyRef = useRef<PrInputRefProps>(null)
  const nameRef = useRef<PrInputRefProps>(null)
  const phoneRef = useRef<PrInputRefProps>(null)

  const getValue = () => {
    if (!status) {
      return null
    }
    return {
      company: companyRef.current?.getValue().trim() || '',
      name: nameRef.current?.getValue().trim() || '',
      position: positionRef.current?.getValue().trim() || '',
      phone: phoneRef.current?.getValue().trim() || ''
    }
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    setValue(value: PresenterValue) {
      const { name, position, company, phone } = value
      companyRef.current?.setValue(company || '')
      nameRef.current?.setValue(name)
      positionRef.current?.setValue(position || '')
      phoneRef.current?.setValue(phone || '')
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
      <div className="metadata-root flex w-full pb-1 relative">
        <div className="w-full metadata-content">
          <PrInputCV
            ref={nameRef}
            placeholder="- Họ và tên"
            divClassName="h-8 w-full"
            className="bg-transparent w-full py-2 uppercase font-semibold  text-gray-600"
          />
          <PrInputCV
            ref={companyRef}
            placeholder=" + Công ty"
            divClassName="h-8 w-full"
            className="bg-transparent w-full pl-8 text-gray-600"
          />
          <PrInputCV
            ref={positionRef}
            placeholder=" + Chức vụ"
            divClassName="h-8 w-full"
            className="bg-transparent w-full pl-8 text-gray-600"
          />
          <PrInputCV
            ref={phoneRef}
            placeholder=" + Số điện thoại"
            divClassName="h-8 w-full"
            className="bg-transparent w-full pl-8 mt-0.5"
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
