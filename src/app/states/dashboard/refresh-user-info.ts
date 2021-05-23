import { atom, DefaultValue, selector } from 'recoil'

export const REFRESH_USER_DETAIL_ATOM_KEY = 'REFRESH_USER_DETAIL_ATOM_KEY'
export const REFRESH_USER_DETAIL_STATE_KEY = 'REFRESH_USER_DETAIL_STATE_KEY'

const refreshUserDetailAtom = atom<boolean>({
  key: REFRESH_USER_DETAIL_ATOM_KEY,
  default: false
})

export const refreshUserDetailState = selector<boolean>({
  key: REFRESH_USER_DETAIL_STATE_KEY,
  get: ({ get }) => {
    const state = get(refreshUserDetailAtom)
    return state
  },
  set: ({ set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(refreshUserDetailAtom, data)
  }
})
