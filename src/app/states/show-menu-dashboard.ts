import { atom, DefaultValue, selector } from 'recoil'

export const SHOW_MENU_DASHBOARD_ATOM_KEY = 'SHOW_MENU_DASHBOARD_ATOM_KEY'
export const SHOW_MENU_DASHBOARD_STATE_KEY = 'SHOW_MENU_DASHBOARD_STATE_KEY'

const showMenuDashboardAtom = atom<boolean>({
  key: SHOW_MENU_DASHBOARD_ATOM_KEY,
  default: true
})

export const showMenuDashboardState = selector<boolean>({
  key: SHOW_MENU_DASHBOARD_STATE_KEY,
  get: ({ get }) => {
    const state = get(showMenuDashboardAtom)
    return state
  },
  set: ({ set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showMenuDashboardAtom, data)
  }
})
