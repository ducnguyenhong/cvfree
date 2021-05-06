import { AsyncPaginate } from 'react-select-async-paginate'
import { DropdownAsyncProps, DropdownAsyncRef, OptionProps } from './dropdown-async.type'
import { FormattedMessage } from 'react-intl'
import { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import axios from 'axios'
import { get } from 'lodash'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { showNotify } from 'app/partials/pr-notify'
import { getDataDropdown } from 'utils/helper'

export const DropdownAsync = forwardRef((props: DropdownAsyncProps, ref: Ref<DropdownAsyncRef>) => {
  const {
    labelClassName,
    required,
    isLanguage,
    label,
    defaultValue,
    urlApi,
    isMulti,
    onChange,
    isDisabled,
    isSearchable,
    isClearable
  } = props
  const [dataDropdown, setDataDropdown] = useState<OptionProps | OptionProps[] | null>(defaultValue ?? null)

  const loadOptions = async (search: string) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}${urlApi}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
    return await axios
      .get(url, {
        headers,
        params: {
          keyword: search
        }
      })
      .then((response) => {
        const { success, error, data } = response.data
        if (!success) {
          throw Error(error?.message)
        }
        const dataLoad: OptionProps[] = []
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i]) {
            dataLoad.push({
              value: data.items[i].value,
              label: data.items[i].label
            })
          }
        }
        return {
          options: dataLoad,
          hasMore: false
        }
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
        return {
          options: [],
          hasMore: false
        }
      })
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return getDataDropdown(dataDropdown)
    },
    setValue(data: OptionProps | OptionProps[] | null) {
      setDataDropdown(data)
    },
    checkRequired() {
      if (!dataDropdown) {
        // setValidateRequired(true)
        // setFocus(true)
        return false
      }
      return true
    },
    reset() {
      setDataDropdown(null)
      // setValidateRequired(false)
    }
  }))

  return (
    <div>
      <span className={`${labelClassName} font-medium block mb-1 text-base`}>
        {isLanguage && label ? <FormattedMessage id={label} /> : label}
        {required && <span className="text-red-500 font-bold">&nbsp;*</span>}
      </span>
      <AsyncPaginate
        value={dataDropdown}
        loadOptions={loadOptions}
        debounceTimeout={500}
        isSearchable={isSearchable}
        placeholder="Chọn..."
        isDisabled={isDisabled}
        isClearable={isClearable}
        isMulti={isMulti}
        onChange={(e) => {
          const data = getDataDropdown(e)
          onChange && onChange(data)
          setDataDropdown(data)
        }}
      />
    </div>
  )
})
