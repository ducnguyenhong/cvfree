import { atom, selector, DefaultValue } from 'recoil'
import { UserInfo } from 'models/user-info'
import Cookies from 'js-cookie'

interface TokenAtomType {
  token?: string
  expiredAt?: number
}

interface UserAtomType {
  userInfo?: UserInfo
}

export const USER_INFO_ATOM_KEY = 'USER_INFO_ATOM_KEY'
export const USER_INFO_STATE_KEY = 'USER_INFO_STATE_KEY'
export const TOKEN_ATOM_KEY = 'TOKEN_ATOM_KEY'
export const TOKEN_STATE_KEY = 'TOKEN_STATE_KEY'

const tokenAtom = atom<TokenAtomType>({
  key: TOKEN_ATOM_KEY,
  default: new Promise<TokenAtomType>((resolve) => {
    const token = Cookies.get('token')
    const expiredAt = Number(Cookies.get('expired-at'))
    resolve({ token, expiredAt })
  })
})

const userInfoAtom = atom<UserAtomType>({
  key: USER_INFO_ATOM_KEY,
  default: new Promise<UserAtomType>((resolve) => {
    let userInfo: UserInfo | undefined
    const userInfoStorage = localStorage.getItem('user-info')
    if (userInfoStorage) {
      userInfo = JSON.parse(userInfoStorage) as UserInfo
    }
    resolve({ userInfo })
  })
})

export const userTokenState = selector<TokenAtomType | undefined>({
  key: TOKEN_STATE_KEY,
  get: ({ get }) => {
    const state = get(tokenAtom)
    const { token, expiredAt } = state
    return { token, expiredAt }
  },
  set: ({ get, set }, data) => {
    if (!data || data instanceof DefaultValue) {
      Cookies.remove('token')
      Cookies.remove('expired-at')
      set(tokenAtom, { token: undefined, expiredAt: undefined })
      return
    }

    const { token, expiredAt } = data
    token ? Cookies.set('token', token) : Cookies.remove('token')
    expiredAt ? Cookies.set('expired-at', `${expiredAt}`) : Cookies.remove('expired-at')
    set(tokenAtom, { ...get(tokenAtom), token, expiredAt: Number(expiredAt) })
  }
})

export const userInfoState = selector<UserInfo | undefined>({
  key: USER_INFO_STATE_KEY,
  get: ({ get }) => {
    const state = get(userInfoAtom)
    return state.userInfo
  },
  set: ({ get, set }, data) => {
    if (!data || data instanceof DefaultValue) {
      localStorage.removeItem('user-info')
      set(userInfoAtom, { userInfo: undefined })
      return
    }
    localStorage.setItem('user-info', JSON.stringify(data))
    set(userInfoAtom, { ...get(userInfoAtom), userInfo: data })
  }
})
