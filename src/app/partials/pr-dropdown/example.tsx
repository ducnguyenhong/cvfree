import PrDropdown, { PrDropdownRefProps, OptionProps } from './index'
import { useRef } from 'react'

const Example = () => {
  const dropdownRef = useRef<PrDropdownRefProps>(null)
  const options: OptionProps[] = [
    {
      value: '1',
      label: '1'
    },
    {
      value: '2',
      label: '2'
    }
  ]

  const onCheck = () => {
    if (dropdownRef && dropdownRef.current && dropdownRef.current.getValue) {
      alert(dropdownRef.current.getValue())
    }
  }

  // useEffect(() => {
  //   if (dropdownRef && dropdownRef.current && dropdownRef.current.setValue) {
  //     dropdownRef.current.setValue({label: '1', value: '1'})
  //   }
  // }, [])

  return (
    <div className="grid grid-cols-6">
      <span className="block" onClick={onCheck}>
        CLICK ME
      </span>
      <PrDropdown ref={dropdownRef} required options={options} isLanguage label="Viet nam" />
    </div>
  )
}

export default Example
