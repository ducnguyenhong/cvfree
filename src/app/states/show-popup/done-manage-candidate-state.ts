import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showPopup: boolean
  id?: number | string
  userId?: string
}

export const POPUP_DONE_MANAGE_CANDIDATE_ATOM_KEY = 'POPUP_DONE_MANAGE_CANDIDATE_ATOM_KEY'
export const POPUP_DONE_MANAGE_CANDIDATE_STATE_KEY = 'POPUP_DONE_MANAGE_CANDIDATE_STATE_KEY'

export const showDoneManageCandidateAtom = atom<DeactiveState>({
  key: POPUP_DONE_MANAGE_CANDIDATE_ATOM_KEY,
  default: {
    showPopup: false,
    id: undefined,
    userId: undefined
  }
})

export const showDoneManageCandidateState = selector<DeactiveState>({
  key: POPUP_DONE_MANAGE_CANDIDATE_STATE_KEY,
  get: ({ get }) => {
    const state = get(showDoneManageCandidateAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showDoneManageCandidateAtom, { ...get(showDoneManageCandidateAtom), ...data })
  }
})
