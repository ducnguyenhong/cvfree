import { atom, DefaultValue, selector } from 'recoil'

interface ActiveState {
  showPopup: boolean
  id?: number | string
}

export const POPUP_ACTIVE_JOB_ADMIN_ATOM_KEY = 'POPUP_ACTIVE_JOB_ADMIN_ATOM_KEY'
export const POPUP_ACTIVE_JOB_ADMIN_STATE_KEY = 'POPUP_ACTIVE_JOB_ADMIN_STATE_KEY'

export const showActiveJobAdminAtom = atom<ActiveState>({
  key: POPUP_ACTIVE_JOB_ADMIN_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined
  }
})

export const showActiveJobAdminState = selector<ActiveState>({
  key: POPUP_ACTIVE_JOB_ADMIN_STATE_KEY,
  get: ({ get }) => {
    const state = get(showActiveJobAdminAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showActiveJobAdminAtom, { ...get(showActiveJobAdminAtom), ...data })
  }
})
