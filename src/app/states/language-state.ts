import { atom, DefaultValue, selector } from 'recoil'

export const LANGUAGE_ATOM_KEY = 'LANGUAGE_ATOM_KEY'
export const LANGUAGE_STATE_KEY = 'LANGUAGE_STATE_KEY'

const languageAtom = atom<string>({
  key: LANGUAGE_ATOM_KEY,
  default: new Promise<string>((resolve) => {
    const language = localStorage.getItem('i18n-language') || 'vi'
    resolve(language)
  })
})

export const languageState = selector<string>({
  key: LANGUAGE_STATE_KEY,
  get: ({ get }) => {
    const state = get(languageAtom)
    return state
  },
  set: ({ set }, data) => {
    if (!data || data instanceof DefaultValue) {
      return
    }

    localStorage.setItem('i18n-language', data)
    set(languageAtom, data)
  }
})
