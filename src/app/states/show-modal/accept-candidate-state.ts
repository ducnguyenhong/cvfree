import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showModal: boolean
  cvId?: number | string
  jobId?: string
}

export const POPUP_ACCEPT_CANDIDATE_ATOM_KEY = 'POPUP_ACCEPT_CANDIDATE_ATOM_KEY'
export const POPUP_ACCEPT_CANDIDATE_STATE_KEY = 'POPUP_ACCEPT_CANDIDATE_STATE_KEY'

export const showAcceptCandidateAtom = atom<DeactiveState>({
  key: POPUP_ACCEPT_CANDIDATE_ATOM_KEY,
  default: {
    showModal: false,
    jobId: undefined,
    cvId: undefined
  }
})

export const showAcceptCandidateState = selector<DeactiveState>({
  key: POPUP_ACCEPT_CANDIDATE_STATE_KEY,
  get: ({ get }) => {
    const state = get(showAcceptCandidateAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showAcceptCandidateAtom, { ...get(showAcceptCandidateAtom), ...data })
  }
})
