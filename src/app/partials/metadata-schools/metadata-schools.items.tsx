import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import PrInputCV from 'app/partials/pr-input-cv'

interface Props {
  test?: string
}

export interface ItemsRefProps {
  getValue: () => void
  setValue?: (newValue: { key: string; value: string }) => void
  validate?: () => void
}

const Items = forwardRef((props: Props, ref: Ref<ItemsRefProps>) => {
  const [valueInput, setValueInput] = useState<string>('')
  const [keyInput, setKeyInput] = useState<string>('')
  const [status, setStatus] = useState<boolean>(true)
  const [errMessageValue, setErrMessageValue] = useState<string>('')
  const [errMessageKey, setErrMessageKey] = useState<string>('')
  const keyRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)

  const setValue = (newValue: { key: string; value: string }) => {
    const { key, value } = newValue
    setKeyInput(key)
    setValueInput(value)
  }

  const validate = () => {
    if (!status) {
      return true
    }
    if (!keyInput) {
      keyRef.current?.focus()
      setErrMessageKey('Metadata name is required')
      return false
    }
    if (!valueInput) {
      valueRef.current?.focus()
      setErrMessageValue('Metadata value is required')
      return false
    }
    return true
  }

  const getValue = () => {
    if (!status) {
      return null
    }
    return { [keyInput.trim()]: valueInput.trim() }
  }

  useImperativeHandle(ref, () => ({
    checkValidate() {
      return validate()
    },
    getValue() {
      return getValue()
    },
    setValue(newValue: { key: string; value: string }) {
      setValue(newValue)
    }
  }))

  if (!status) {
    return null
  }

  const onTouchRemove = () => {
    setStatus(false)
  }

  return (
    <div className="mt-2 flex w-full">
      <div className="w-11/12">
        <PrInputCV
          placeholder="- Trường học/Trung tâm"
          divClassName="h-8 w-full"
          className="bg-transparent w-full py-2 mt-2 text-sm"
        />
        <PrInputCV
          placeholder=" + Chuyên ngành"
          divClassName="h-8 w-full"
          className="bg-transparent w-full py-2 pl-8 mt-2 text-sm"
        />
      </div>
      <div className="w-1/12 pt-3 flex justify-end">
        <span onClick={onTouchRemove} className="cursor-pointer">
          <i className="text-red-500 fas fa-times-circle text-xl hover:text-red-600"></i>
        </span>
      </div>
    </div>
  )
})

Items.displayName = 'Items'

export default Items
