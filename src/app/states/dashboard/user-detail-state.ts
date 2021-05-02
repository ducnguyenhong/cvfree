import { atom, DefaultValue, selector } from 'recoil'
import { UserInfo } from 'models/user-info'

export const USER_DETAIL_ATOM_KEY = 'USER_DETAIL_ATOM_KEY'
export const USER_DETAIL_STATE_KEY = 'USER_DETAIL_STATE_KEY'

const userDetailAtom = atom<UserInfo | undefined>({
  key: USER_DETAIL_ATOM_KEY,
  default: undefined
})

export const userDetailState = selector<UserInfo | undefined>({
  key: USER_DETAIL_STATE_KEY,
  get: ({ get }) => {
    const state = get(userDetailAtom)
    return state
  },
  set: ({ set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(userDetailAtom, data)
  }
})
