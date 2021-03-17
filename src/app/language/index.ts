import flatten from 'flat'
import en from './en'
import vi from './vi'

export const languages: { [key: string]: unknown } = {
  en: flatten(en),
  vi: flatten(vi)
}

export default languages
