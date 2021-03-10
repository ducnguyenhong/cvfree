import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import PrInputCV from 'app/partials/pr-input-cv'
import IdeaIcon from 'assets/icons/idea.svg'
import Rate from 'rc-rate'

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
    <div className="mt-4 flex items-center">
      <img src={IdeaIcon} alt="skill" className="w-7 h-7" />
      <div>
        <PrInputCV placeholder="Kỹ năng cá nhân" divClassName="h-10 w-full" className="bg-transparent w-full py-2" />
        <div className="-m-3 ml-3">
          <Rate count={5} style={{ fontSize: 27 }} allowHalf allowClear={false} defaultValue={3} />
        </div>
      </div>
      <span onClick={onTouchRemove} className="cursor-pointer mt-6 ml-6">
        <i className="text-red-500 fas fa-times-circle text-xl hover:text-red-600"></i>
      </span>
    </div>
  )
})

Items.displayName = 'Items'

export default Items
