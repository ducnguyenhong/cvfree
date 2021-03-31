import { AsyncPaginate, reduceGroupedOptions } from 'react-select-async-paginate'
import { DropdownAsyncProps, DropdownAsyncRef, OptionProps } from './dropdown-async.type'
import { FormattedMessage } from 'react-intl'
import { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import axios from 'axios'
import { get } from 'lodash'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { showNotify } from 'app/partials/pr-notify'

const options = (
  url: string
  // convert: any,
  // paramResponse: string | undefined,
  // paramsApi: object | undefined,
  // apiPagination: boolean | undefined,
) => (input: string, loadedOptions: any, response: any) => {
  const { page } = response
  // const queryLimit: string = paramLimit || 'offset'
  axios
    .get(`${url}?keyword=${input}`, {
      // params: { ...paramsApi, status: noNeedFilterStatus ? undefined : 'ACTIVATED' }
    })
    .then((response) => {
      const { data: result } = response
      const { code, data, success } = result
      if ((code && code !== 200) || success === false) {
        throw new Error(get(result, 'data.message') || 'Lỗi hệ thống')
      }
      // const items = paramResponse ? data[`${paramResponse}`] : data
      // const list: ItemType[] = items.map((item: any) => convert(item))
      console.log('ducnh api', data)

      // const hasMore = apiPagination === false ? false : list && list.length > 0

      return {
        options: [
          {
            value: 1,
            label: 'Audi'
          }
        ],
        hasMore: true
        // additional: {
        //   page: page + 1
        // }
      }
    })
    .catch((err) => {
      console.error(err)
      // return {
      //   options: [],
      //   hasMore: false,
      //   additional: {
      //     page: page + 1
      //   }
      // }
    })
  return []
}

export const DropdownAsync = forwardRef((props: DropdownAsyncProps, ref: Ref<DropdownAsyncRef>) => {
  const { labelClassName, required, isLanguage, label, defaultValue, urlApi } = props
  const [dataDropdown, setDataDropdown] = useState<OptionProps | OptionProps[] | null>(defaultValue ?? null)

  const loadOptions = async (search: any, loadedOptions: any) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/locations`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
    console.log('ducnh3', search)

    return await axios
      .get(url, { headers })
      .then((response) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }

        const dataLoad = data.items.map((item: any) => {
          return { value: item.id, label: item.name }
        })

        console.log('dataLoad', dataLoad)

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
      return dataDropdown
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
        // reduceOptions={reduceGroupedOptions}
        onChange={() => {}}
      />
    </div>
  )
})
