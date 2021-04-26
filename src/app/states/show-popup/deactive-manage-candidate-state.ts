import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showPopup: boolean
  id?: number | string
}

export const POPUP_DEACTIVE_MANAGE_CANDIDATE_ATOM_KEY = 'POPUP_DEACTIVE_MANAGE_CANDIDATE_ATOM_KEY'
export const POPUP_DEACTIVE_MANAGE_CANDIDATE_STATE_KEY = 'POPUP_DEACTIVE_MANAGE_CANDIDATE_STATE_KEY'

export const showDeactiveManageCandidateAtom = atom<DeactiveState>({
  key: POPUP_DEACTIVE_MANAGE_CANDIDATE_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined
  }
})

export const showDeactiveManageCandidateState = selector<DeactiveState>({
  key: POPUP_DEACTIVE_MANAGE_CANDIDATE_STATE_KEY,
  get: ({ get }) => {
    const state = get(showDeactiveManageCandidateAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showDeactiveManageCandidateAtom, { ...get(showDeactiveManageCandidateAtom), ...data })
  }
})
