import { forwardRef, useState, useImperativeHandle, Ref } from 'react'
import { DropdownSyncProps, DropdownSyncRef, OptionProps } from './dropdown-sync.type'
import ReactSelect from 'react-select'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { getDataDropdown } from 'utils/helper'

export const DropdownSync = forwardRef((props: DropdownSyncProps, ref: Ref<DropdownSyncRef>) => {
  const {
    defaultValue,
    isMulti,
    isClearable,
    placeholder,
    options,
    onChange,
    isDisabled,
    label,
    required,
    isLanguage,
    requiredMesseage,
    labelClassName
  } = props
  const [dataDropdown, setDataDropdown] = useState<OptionProps | OptionProps[] | null>(defaultValue || null)
  const [validateRequired, setValidateRequired] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    getValue() {
      return getDataDropdown(dataDropdown)
    },
    setValue(data: OptionProps | OptionProps[] | null) {
      setDataDropdown(data)
    },
    checkRequired() {
      if (!dataDropdown) {
        setValidateRequired(true)
        setFocus(true)
        return false
      }
      return true
    },
    reset() {
      setDataDropdown(null)
      setValidateRequired(false)
    }
  }))

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <span className={`${labelClassName} font-medium block mb-1 text-base`}>
          {isLanguage && label ? <FormattedMessage id={label} /> : label}
          {required && <span className="text-red-500 font-bold">&nbsp;*</span>}
        </span>
        <ReactSelect
          className="w-full h-full"
          key={moment().valueOf()}
          defaultValue={defaultValue}
          value={dataDropdown}
          isMulti={isMulti}
          autoFocus={focus}
          isClearable={isClearable || typeof isClearable === 'undefined'}
          placeholder={isLanguage ? <FormattedMessage id={placeholder || 'SELECT'} /> : placeholder || 'Chọn...'}
          options={options}
          onChange={(e) => {
            const data = getDataDropdown(e)
            onChange && onChange(data)
            setDataDropdown(data)
            setValidateRequired(false)
          }}
          isDisabled={isDisabled}
        />
        {validateRequired && (
          <span className="text-red-500 font-medium block text-base">
            {isLanguage ? <FormattedMessage id={requiredMesseage || 'REQUIRED'} /> : requiredMesseage || 'Required !'}
          </span>
        )}
      </div>
    </div>
  )
})
