import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'

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
    <div className="grid grid-cols-2 gap-24 mb-5">
      <div className="col-span-1">
        <div className="flex justify-end">
          <div className="w-5/6">
            <label className="pb-1 block">
              Key
              <span className="text-red-500">&nbsp;*</span>
            </label>
            <div className="flex items-center h-11">
              <div className="h-full border rounded-l-md border-r-0 border-gray-200 flex items-center justify-center bg-gray-50">
                <i className="fas fa-key px-3.5 block text-lg text-gray-500"></i>
              </div>
              <input
                value={keyInput}
                ref={keyRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setKeyInput(e.target.value)
                  setErrMessageKey('')
                }}
                className="block w-full px-4 h-full border rounded-l-none border-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              />
            </div>
            {errMessageKey && <span className="text-red-500 mt-2">{errMessageKey}</span>}
          </div>
        </div>
      </div>
      <div className="col-span-1 flex items-center">
        <div className="w-5/6">
          <label className="pb-1 block">
            Value
            <span className="text-red-500">&nbsp;*</span>
          </label>
          <div className="flex items-center h-11">
            <div className="h-full border rounded-l-md border-r-0 border-gray-200 flex items-center justify-center bg-gray-50">
              <i className="fas fa-database px-3.5 block text-lg text-gray-500"></i>
            </div>
            <input
              value={valueInput}
              ref={valueRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValueInput(e.target.value)
                setErrMessageValue('')
              }}
              className="block w-full px-4 h-full border rounded-l-none border-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
            />
          </div>
          {errMessageValue && <span className="text-red-500 mt-2">{errMessageValue}</span>}
        </div>
        <div className="w-1/6 h-full flex items-center">
          <span onClick={onTouchRemove} className="cursor-pointer mt-6 ml-6">
            <i className="text-red-500 fas fa-times-circle text-2xl hover:text-red-600"></i>
          </span>
        </div>
      </div>
    </div>
  )
})

Items.displayName = 'Items'

export default Items
