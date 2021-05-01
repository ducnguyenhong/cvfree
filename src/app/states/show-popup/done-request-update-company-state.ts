import { atom, DefaultValue, selector } from 'recoil'

interface DoneState {
  showPopup: boolean
  id?: string
}

export const POPUP_DONE_REQUEST_UPDATE_COMPANY_ATOM_KEY = 'POPUP_DONE_REQUEST_UPDATE_COMPANY_ATOM_KEY'
export const POPUP_DONE_REQUEST_UPDATE_COMPANY_STATE_KEY = 'POPUP_DONE_REQUEST_UPDATE_COMPANY_STATE_KEY'

export const showDoneRequestUpdateCompanyAtom = atom<DoneState>({
  key: POPUP_DONE_REQUEST_UPDATE_COMPANY_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined
  }
})

export const showDoneRequestUpdateCompanyState = selector<DoneState>({
  key: POPUP_DONE_REQUEST_UPDATE_COMPANY_STATE_KEY,
  get: ({ get }) => {
    const state = get(showDoneRequestUpdateCompanyAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showDoneRequestUpdateCompanyAtom, { ...get(showDoneRequestUpdateCompanyAtom), ...data })
  }
})
