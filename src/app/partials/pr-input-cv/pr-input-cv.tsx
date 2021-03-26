import { forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react'
import { PrInputProps, PrInputRefProps } from './pr-input-cv.type'

const PrInputLayout = forwardRef((props: PrInputProps, ref: Ref<PrInputRefProps>) => {
  const {
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
    errorMessage,
    divClassName
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
      return `${valueInput}`.trim()
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

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          value={valueInput}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeInput(e)}
          minLength={minLength}
          maxLength={maxLength || 255}
          onFocus={onFocus}
          ref={inputRef}
          onBlur={onBlur}
          rows={6}
          placeholder={placeholder}
          style={style}
          className={`${
            icon ? 'pl-10' : 'pl-4'
          } block border-0 pr-4 absolute top-0 left-0 w-full h-full border-gray-300 focus:outline-none ${
            validateRequired ? 'focus:border-red-600' : 'focus:border-b-2'
          } ${className}`}
        />
      )
    }
    return (
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
        } block border-0 pr-4 absolute top-0 left-0 w-full h-full border-gray-300 focus:outline-none ${
          validateRequired ? 'focus:border-red-600' : 'focus:border-b-2'
        } `}
      />
    )
  }

  return (
    <div className="w-full">
      {label && <span className="block font-semibold text-green-800 mb-1">{label}</span>}
      <div className={`${divClassName} relative`}>
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
        {renderInput()}
      </div>
      {validateRequired && <span className="text-red-500 font-medium block text-base mt-1">* Bắt buộc!</span>}
      {!validateRequired && error && <span className="text-red-500 font-medium block text-base mt-1">{error}</span>}
    </div>
  )
})

PrInputLayout.displayName = 'PrInputLayout'

export default PrInputLayout
