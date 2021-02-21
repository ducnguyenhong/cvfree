import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { PrInputProps, PrInputRefProps } from './pr-input.type'

const PrInputLayout = forwardRef((props: PrInputProps, ref: Ref<PrInputRefProps>) => {
  const {
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    className,
    style,
    defaultValue,
    minLength,
    maxLength,
    label,
    type,
    icon,
    errorMessage
  } = props
  const [valueInput, setValueInput] = useState<string>(defaultValue || '')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [typeInput, setTypeInput] = useState<string>(type || 'text')
  const [error, setError] = useState<string>(errorMessage || '')

  const [validateRequired, setValidateRequired] = useState<boolean>(false)
  const inputRef = useRef(null)

  const setFocus = (control: any) => {
    if (control) {
      control.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        control.current.focus()
      }, 500)
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    validateRequired && setValidateRequired(false)
    error && setError('')
    setValueInput(e.target.value)
    onChange && onChange(e.target.value)
  }

  const onShowPassword = () => {
    setTypeInput(typeInput === 'text' ? 'password' : 'text')
    setShowPassword(!showPassword)
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return valueInput.trim()
    },
    setValue(data: string) {
      setValueInput(data)
    },
    checkRequired() {
      if (!valueInput) {
        setValidateRequired(true)
        setFocus(inputRef)
        return false
      }
      return true
    },
    reset() {
      setValueInput('')
      setValidateRequired(false)
    },
    setErrorMessage(err: string) {
      setError(err)
    }
  }))

  return (
    <div>
      {label && <span className="block font-semibold text-green-800 ">{label}</span>}
      <div className="relative" style={{ height: 42 }}>
        {type === 'password' && valueInput && (
          <i
            className={`absolute right-3 cursor-pointer top-1.5 text-lg z-10 text-green-700 fas ${
              showPassword ? 'fa-eye' : 'fa-eye-slash'
            }`}
            onClick={onShowPassword}
          ></i>
        )}
        {icon && (
          <i
            className={`absolute opacity-70 left-3 top-1.5 text-lg z-10 fas ${icon} ${
              validateRequired ? 'text-red-700' : 'text-green-900'
            }`}
            onClick={onShowPassword}
          ></i>
        )}
        <input
          value={valueInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
          minLength={minLength}
          maxLength={maxLength || 255}
          type={typeInput}
          onFocus={onFocus}
          ref={inputRef}
          onBlur={onBlur}
          placeholder={placeholder}
          style={style}
          className={`${className} ${
            icon ? 'pl-10' : 'pl-4'
          } block border-t-0 border-r-0 border-l-0 pr-10 py-5 absolute top-0 left-0 w-full h-full border border-gray-300 bg-white  focus:outline-none ${
            validateRequired ? 'focus:border-red-600' : 'focus:border-green-600'
          } `}
        />
      </div>
      {validateRequired && <span className="text-red-500 font-medium block text-base mt-1">* Bắt buộc!</span>}
      {!validateRequired && error && <span className="text-red-500 font-medium block text-base mt-1">{error}</span>}
    </div>
  )
})

PrInputLayout.displayName = 'PrInputLayout'

export default PrInputLayout
