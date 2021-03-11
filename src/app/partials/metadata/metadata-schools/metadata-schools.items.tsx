import PrInputCV from 'app/partials/pr-input-cv'
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {}

export interface ItemsRefProps {
  getValue: () => void
  setValue?: (newValue: { newSchool: string; newMajor: string }) => void
  validate?: () => void
}

const StyleLayout = styled.div`
  .metadata-root {
    border: 1px solid #fff;
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
  const [school, setSchool] = useState<string>('')
  const [major, setMajor] = useState<string>('')
  const [status, setStatus] = useState<boolean>(true)
  // const [errMessageValue, setErrMessageValue] = useState<string>('')
  // const [errMessageKey, setErrMessageKey] = useState<string>('')
  const keyRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)

  const setValue = (newValue: { newSchool: string; newMajor: string }) => {
    const { newSchool, newMajor } = newValue
    setSchool(newSchool)
    setMajor(newMajor)
  }

  const validate = () => {
    // if (!status) {
    //   return true
    // }
    // if (!keyInput) {
    //   keyRef.current?.focus()
    //   setErrMessageKey('Metadata name is required')
    //   return false
    // }
    // if (!valueInput) {
    //   valueRef.current?.focus()
    //   setErrMessageValue('Metadata value is required')
    //   return false
    // }
    return true
  }

  const getValue = () => {
    if (!status) {
      return null
    }
    const data = {
      school: school.trim(),
      major: major.trim()
    }
    return data
  }

  useImperativeHandle(ref, () => ({
    checkValidate() {
      return validate()
    },
    getValue() {
      return getValue()
    },
    setValue(newValue: { newSchool: string; newMajor: string }) {
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
      <div className="metadata-root flex w-full pb-1 relative">
        <div className="w-full metadata-content">
          <PrInputCV
            placeholder="- Trường học/Trung tâm"
            divClassName="h-8 w-full mt-0.5"
            className="bg-transparent w-full"
            value={school}
            onChange={(e) => setSchool(e)}
          />
          <PrInputCV
            placeholder=" + Chuyên ngành"
            divClassName="h-8 w-full"
            className="bg-transparent w-full pl-8"
            value={major}
            onChange={(e) => setMajor(e)}
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
    </StyleLayout>
  )
})

export default Items
