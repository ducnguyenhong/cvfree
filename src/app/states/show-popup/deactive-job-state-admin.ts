import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showPopup: boolean
  id?: number | string
}

export const POPUP_DEACTIVE_JOB_ADMIN_ATOM_KEY = 'POPUP_DEACTIVE_JOB_ADMIN_ATOM_KEY'
export const POPUP_DEACTIVE_JOB_ADMIN_STATE_KEY = 'POPUP_DEACTIVE_JOB_ADMIN_STATE_KEY'

export const showDeactiveJobAdminAtom = atom<DeactiveState>({
  key: POPUP_DEACTIVE_JOB_ADMIN_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined
  }
})

export const showDeactiveJobAdminState = selector<DeactiveState>({
  key: POPUP_DEACTIVE_JOB_ADMIN_STATE_KEY,
  get: ({ get }) => {
    const state = get(showDeactiveJobAdminAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showDeactiveJobAdminAtom, { ...get(showDeactiveJobAdminAtom), ...data })
  }
})
