import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showPopup: boolean
  id?: string
}

export const BAN_STAFF_ATOM_KEY = 'BAN_STAFF_ATOM_KEY'
export const BAN_STAFF_STATE_KEY = 'BAN_STAFF_STATE_KEY'

export const showBanStaffAtom = atom<DeactiveState>({
  key: BAN_STAFF_ATOM_KEY,
  default: {
    showPopup: false
  }
})

export const showBanStaffState = selector<DeactiveState>({
  key: BAN_STAFF_STATE_KEY,
  get: ({ get }) => {
    const state = get(showBanStaffAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showBanStaffAtom, { ...get(showBanStaffAtom), ...data })
  }
})
