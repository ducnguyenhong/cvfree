import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showPopup: boolean
  id?: number | string
}

export const POPUP_DEACTIVE_CV_ATOM_KEY = 'POPUP_DEACTIVE_CV_ATOM_KEY'
export const POPUP_DEACTIVE_CV_STATE_KEY = 'POPUP_DEACTIVE_CV_STATE_KEY'

export const showDeactiveCvAtom = atom<DeactiveState>({
  key: POPUP_DEACTIVE_CV_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined
  }
})

export const showDeactiveCvState = selector<DeactiveState>({
  key: POPUP_DEACTIVE_CV_STATE_KEY,
  get: ({ get }) => {
    const state = get(showDeactiveCvAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showDeactiveCvAtom, { ...get(showDeactiveCvAtom), ...data })
  }
})
