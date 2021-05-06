import { CategoryProps } from 'app/pages/cv/cv-template-create/cv-form-1/cv-form.types'
import DefaultImage from 'assets/images/default-avatar.png'
import DefaultImageFemale from 'assets/images/default-avatar-female.png'
import axios, { AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { ResponseUpload } from 'models/response-api'
import { OptionProps } from 'app/partials/pr-dropdown'
import { OptionsType } from 'react-select'
import queryString from 'query-string'
import { DropdownProps } from 'constants/data-employer'
import moment from 'moment'

export const checkEmail = (email?: string | null) => {
  if (!email) {
    return false
  }
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/g.test(email)
}

export const checkPhone = (phone?: string | null) => {
  if (!phone) {
    return false
  }
  return /^([0-9+() ]){9,15}$/.test(phone)
}

export const checkUsername = (username: string) => {
  return /^[a-z0-9]+$/.test(username)
}

export const getCategoryWhenUp = (category: CategoryProps[], name: string) => {
  let index = 0
  const categoryActive: CategoryProps[] = []
  const categoryInactive: CategoryProps[] = []
  for (let x = 0; x < category.length; x++) {
    if (category[x].enable) {
      categoryActive.push(category[x])
    } else {
      categoryInactive.push(category[x])
    }
  }
  for (let i = 0; i < categoryActive.length; i++) {
    if (categoryActive[i].name === name) {
      index = i
    }
  }
  if (index === 0) {
    return null
  }
  const newCategory = [...categoryActive]
  const pr = newCategory[index]
  newCategory[index] = newCategory[index - 1]
  newCategory[index - 1] = pr

  return [...newCategory, ...categoryInactive]
}

export const getCategoryWhenDown = (category: CategoryProps[], name: string) => {
  let index = 0
  const categoryActive: CategoryProps[] = []
  const categoryInactive: CategoryProps[] = []
  for (let x = 0; x < category.length; x++) {
    if (category[x].enable) {
      categoryActive.push(category[x])
    } else {
      categoryInactive.push(category[x])
    }
  }
  for (let i = 0; i < categoryActive.length; i++) {
    if (categoryActive[i].name === name) {
      index = i
    }
  }
  if (index === categoryActive.length - 1) {
    return null
  }
  const newCategory = [...categoryActive]
  const pr = newCategory[index]
  newCategory[index] = newCategory[index + 1]
  newCategory[index + 1] = pr

  return [...newCategory, ...categoryInactive]
}

export const getCategoryWhenRemove = (category: CategoryProps[], name: string) => {
  const newCategory = [...category]
  for (let i = 0; i < newCategory.length; i++) {
    if (newCategory[i].name === name) {
      newCategory[i].enable = false
    }
  }
  return newCategory
}

export const slugURL = (str?: string) => {
  if (!str) return 'cvfree'
  str = str.toLowerCase()
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
  str = str.replace(/(đ)/g, 'd')
  str = str.replace(/([^0-9a-z-\s])/g, '')
  str = str.replace(/(\s+)/g, '-')
  str = str.replace(/^-+/g, '')
  str = str.replace(/-+$/g, '')
  return str
}

export const getDefaultAvatar = (gender?: string) => {
  if (gender === 'FEMALE') {
    return DefaultImageFemale
  }
  return DefaultImage
}

export const uploadServer = async (img: File, id: string, folderServer?: string) => {
  const formData = new FormData()
  formData.append('image', img)
  const accessToken = Cookies.get('token')
  return axios
    .post(`${SERVER_URL}/media/upload/${folderServer ?? 'image'}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 20000
    })
    .then((response: AxiosResponse<ResponseUpload>) => {
      const { data } = response.data
      return data.url
    })
    .catch((e) => {
      throw new Error(e)
    })
}

const isSingleElement = (data: OptionsType<OptionProps> | OptionProps | null): data is OptionProps => {
  return !Array.isArray(data)
}

export const getDataDropdown = (data: OptionsType<OptionProps> | OptionProps | null): OptionProps[] => {
  if (!data) {
    return []
  }

  if (Array.isArray(data)) {
    return data
  }

  if (isSingleElement(data)) {
    return [data]
  }

  return []
}

export const getValueDropdown = (data: OptionsType<OptionProps> | OptionProps | undefined | null): string[] => {
  if (data === null || typeof data === 'undefined') {
    return []
  }

  if (Array.isArray(data)) {
    const arrValue: string[] = []
    for (let i = 0; i < data.length; i++) {
      arrValue.push(data[i].value)
    }
    return arrValue
  }

  if (isSingleElement(data)) {
    return [data.value]
  }

  return []
}

export const checkSpecialCharacter = (data: string) => {
  const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
  if (data.match(format)) {
    return true
  }
  return false
}

export const pushParamURL = (history: any, params: Record<string, string | number>) => {
  const parsed = queryString.parse(window.location.search)
  for (const [key, value] of Object.entries(params)) {
    parsed[`${key}`] = `${value}` || null
  }
  history.push({
    pathname: window.location.pathname,
    search: queryString.stringify(parsed)
  })
}

export const getParamURL = () => {
  const parsed = queryString.parse(window.location.search)
  return parsed
}

export const getDefaultLabelDropdown = (DataDefault: DropdownProps[], dataValue: string[]): string => {
  let labelCareer = ''
  for (let i = 0; i < DataDefault.length; i++) {
    for (let j = 0; j < dataValue.length; j++) {
      if (DataDefault[i].value === dataValue[j]) {
        labelCareer += DataDefault[i].label + ', '
      }
    }
  }
  labelCareer = labelCareer.substring(0, labelCareer.length - 2)
  return labelCareer
}

export const getDefaultDataDropdown = (
  DataDefault: DropdownProps[],
  dataValue: string[]
): { value: string; label: string }[] => {
  const array: DropdownProps[] = []

  for (let i = 0; i < DataDefault.length; i++) {
    for (let j = 0; j < dataValue.length; j++) {
      if (DataDefault[i].value === dataValue[j]) {
        array.push(DataDefault[i])
      }
    }
  }
  return array
}

export const getDefaultFilter = (
  dataOption: OptionProps[],
  paramKey: string,
  isMulti?: boolean
): OptionProps | OptionProps[] | undefined => {
  let valueParsed = ''
  let defaultLabel = ''
  const parsed = queryString.parse(window.location.search)

  for (const [key, value] of Object.entries(parsed)) {
    if (key === paramKey) {
      valueParsed = `${value}`
    }
  }

  if (isMulti && valueParsed) {
    const defaultFilter: OptionProps[] = []
    const arrayValue = valueParsed.split(',')
    for (let i = 0; i < dataOption.length; i++) {
      for (let j = 0; j < dataOption.length; j++) {
        if (arrayValue[i] === dataOption[j].value) {
          defaultFilter.push(dataOption[i])
        }
      }
    }
    return defaultFilter.length === 0 ? undefined : defaultFilter
  }

  if (valueParsed) {
    for (let i = 0; i < dataOption.length; i++) {
      if (dataOption[i].value === valueParsed) {
        defaultLabel = dataOption[i].label
      }
    }
  }

  return defaultLabel
    ? {
        value: valueParsed,
        label: defaultLabel
      }
    : undefined
}

export const getDefaultSearch = (paramKey: string): string => {
  let valueParsed = ''
  const parsed = queryString.parse(window.location.search)

  for (const [key, value] of Object.entries(parsed)) {
    if (key === paramKey) {
      valueParsed = `${value || ''}`
    }
  }
  return valueParsed
}

export const getGenderFromInput = (data: string) => {
  const arrayMale = ['MALE', 'NAM']
  const arrayFemale = ['FEMALE', 'NỮ', 'NU']
  const arrayAnother = ['KHÁC', 'KHAC', 'ANOTHER']
  if (arrayMale.includes(data.toUpperCase())) {
    return 'MALE'
  }
  if (arrayFemale.includes(data.toUpperCase())) {
    return 'FEMALE'
  }
  if (arrayAnother.includes(data.toUpperCase())) {
    return 'ANOTHER'
  }
  return 'UNKNOWN'
}

export const getGenderMultiLanguage = (gender: string, language: string) => {
  if (gender === 'MALE') {
    return language === 'vi' ? 'Nam' : 'Male'
  }
  if (gender === 'FEMALE') {
    return language === 'vi' ? 'Nữ' : 'Female'
  }
  return ''
}

export const getAge = (timestamp?: number | Date) => {
  if (!timestamp) {
    return 0
  }
  return Math.floor((moment().valueOf() - moment(timestamp).valueOf()) / 1000 / 60 / 60 / 24 / 365.25)
}
