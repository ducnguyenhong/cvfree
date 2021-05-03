import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { PrInputProps, PrInputRefProps } from './pr-input.type'
import { InputStyle } from './pr-input.style'

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
    required,
    divClassName,
    disabled,
    isCurrency
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
    if (isCurrency) {
      const nf = new Intl.NumberFormat()
      const value = e.target.value.replaceAll('.', '')
      const numberValue = Number(value)
      const format = nf.format(numberValue)
      setValueInput(format)
    } else {
      setValueInput(e.target.value)
    }
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
      setFocus(inputRef)
      setError(err)
    }
  }))

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage)
      setFocus(inputRef)
    }
  }, [errorMessage])

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          value={valueInput}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeInput(e)}
          minLength={minLength}
          maxLength={maxLength}
          onFocus={onFocus}
          ref={inputRef}
          disabled={disabled}
          onBlur={onBlur}
          rows={6}
          placeholder={placeholder}
          style={style}
          className={`${
            disabled ? 'bg-gray-100' : ''
          } pl-4 block border pr-4 py-2 rounded-md absolute top-0 left-0 w-full h-full border-gray-300 focus:outline-none ${
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
        disabled={disabled}
        onFocus={onFocus}
        ref={inputRef}
        onBlur={onBlur}
        placeholder={placeholder}
        style={style}
        className={`${disabled ? 'bg-gray-100' : ''} ${className} ${
          icon ? 'pl-10' : 'pl-4'
        } block pr-10 py-5 rounded-md absolute top-0 left-0 w-full h-full border border-gray-300 bg-white  focus:outline-none ${
          validateRequired || error ? 'focus:border-red-600' : 'focus:border-green-600'
        } `}
      />
    )
  }

  return (
    <InputStyle>
      {label && (
        <span className="block font-semibold text-green-800 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <div className={`${divClassName} h-10 relative`}>
        {renderInput()}
        {type === 'password' && valueInput && (
          <i
            className={`absolute right-3 cursor-pointer top-1.5 text-lg text-green-700 fas ${
              showPassword ? 'fa-eye' : 'fa-eye-slash'
            }`}
            onClick={onShowPassword}
          ></i>
        )}
        {icon && type !== 'textarea' && (
          <i
            className={`absolute opacity-70 left-3 top-1.5 text-lg fas ${icon} ${
              validateRequired || error ? 'text-red-700' : 'text-green-900'
            }`}
            onClick={onShowPassword}
          ></i>
        )}
      </div>
      {validateRequired && <span className="text-red-500 font-medium block text-base mt-1">* Bắt buộc!</span>}
      {!validateRequired && error && <span className="text-red-500 font-medium block text-base mt-1">{error}</span>}
    </InputStyle>
  )
})

export default PrInputLayout
