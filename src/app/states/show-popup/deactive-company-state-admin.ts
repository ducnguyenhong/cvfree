import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showPopup: boolean
  id?: number | string
}

export const POPUP_DEACTIVE_COMPANY_ADMIN_ATOM_KEY = 'POPUP_DEACTIVE_COMPANY_ADMIN_ATOM_KEY'
export const POPUP_DEACTIVE_COMPANY_ADMIN_STATE_KEY = 'POPUP_DEACTIVE_COMPANY_ADMIN_STATE_KEY'

export const showDeactiveCompanyAdminAtom = atom<DeactiveState>({
  key: POPUP_DEACTIVE_COMPANY_ADMIN_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined
  }
})

export const showDeactiveCompanyAdminState = selector<DeactiveState>({
  key: POPUP_DEACTIVE_COMPANY_ADMIN_STATE_KEY,
  get: ({ get }) => {
    const state = get(showDeactiveCompanyAdminAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showDeactiveCompanyAdminAtom, { ...get(showDeactiveCompanyAdminAtom), ...data })
  }
})
