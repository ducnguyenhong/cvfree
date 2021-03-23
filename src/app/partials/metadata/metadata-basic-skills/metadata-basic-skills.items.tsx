import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import PrInputCV from 'app/partials/pr-input-cv'
import styled from 'styled-components'
import { PrRate } from 'app/partials/pr-rate'
import { InactiveStarIcon } from 'assets/icons'

interface Props {
  test?: string
}

export interface ItemsRefProps {
  getValue: () => void
  setValue?: (newValue: { key: string; value: string }) => void
  validate?: () => void
}

const StyleLayout = styled.div`
  .metadata-root {
    border: 1px solid #f3f4f6;
    .metadata-control {
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
    }
    transition: 0.3s;
    &:hover {
      border: 1px dashed #e1e1e1 !important;
      .metadata-control {
        transition: 0.3s;
        opacity: 1;
        visibility: visible;
      }
    }
  }
`

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

  const onRemove = () => {
    setStatus(false)
  }

  return (
    <StyleLayout>
      <div className="metadata-root flex w-full pb-3 relative">
        <div className="w-full metadata-content pb-1.5">
          <PrInputCV
            placeholder="Tên kỹ năng"
            divClassName="h-9 w-full"
            className="bg-transparent w-full text-gray-600 uppercase font-medium"
          />
          <div className="-m-3 ml-5 mt-0.5">
            <PrRate count={5} defaultValue={3} />
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
    </StyleLayout>
  )
})

Items.displayName = 'Items'

export default Items