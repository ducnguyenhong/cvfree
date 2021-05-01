import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showPopup: boolean
  id?: string
}

export const POPUP_DEACTIVE_REQUEST_UPDATE_COMPANY_ATOM_KEY = 'POPUP_DEACTIVE_REQUEST_UPDATE_COMPANY_ATOM_KEY'
export const POPUP_DEACTIVE_REQUEST_UPDATE_COMPANY_STATE_KEY = 'POPUP_DEACTIVE_REQUEST_UPDATE_COMPANY_STATE_KEY'

export const showDeactiveRequestUpdateCompanyAtom = atom<DeactiveState>({
  key: POPUP_DEACTIVE_REQUEST_UPDATE_COMPANY_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined
  }
})

export const showDeactiveRequestUpdateCompanyState = selector<DeactiveState>({
  key: POPUP_DEACTIVE_REQUEST_UPDATE_COMPANY_STATE_KEY,
  get: ({ get }) => {
    const state = get(showDeactiveRequestUpdateCompanyAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showDeactiveRequestUpdateCompanyAtom, { ...get(showDeactiveRequestUpdateCompanyAtom), ...data })
  }
})
