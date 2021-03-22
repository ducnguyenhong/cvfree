import { atom, DefaultValue, selector } from 'recoil'

export const SELECTED_CV_TEMPLATE_ATOM_KEY = 'SELECTED_CV_TEMPLATE_ATOM_KEY'
export const SELECTED_CV_TEMPLATE_STATE_KEY = 'SELECTED_CV_TEMPLATE_STATE_KEY'

const selectedCVTemplateAtom = atom<string>({
  key: SELECTED_CV_TEMPLATE_ATOM_KEY,
  default: ''
})

export const selectedCVTemplateState = selector<string>({
  key: SELECTED_CV_TEMPLATE_STATE_KEY,
  get: ({ get }) => {
    const state = get(selectedCVTemplateAtom)
    return state
  },
  set: ({ set }, data) => {
    if (!data || data instanceof DefaultValue) {
      return
    }
    set(selectedCVTemplateAtom, data)
  }
})
