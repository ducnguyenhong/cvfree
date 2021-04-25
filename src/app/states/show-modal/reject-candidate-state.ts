import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showModal: boolean
  cvId?: number | string
  jobId?: string
}

export const POPUP_REJECT_CANDIDATE_ATOM_KEY = 'POPUP_REJECT_CANDIDATE_ATOM_KEY'
export const POPUP_REJECT_CANDIDATE_STATE_KEY = 'POPUP_REJECT_CANDIDATE_STATE_KEY'

export const showRejectCandidateAtom = atom<DeactiveState>({
  key: POPUP_REJECT_CANDIDATE_ATOM_KEY,
  default: {
    showModal: false,
    jobId: undefined,
    cvId: undefined
  }
})

export const showRejectCandidateState = selector<DeactiveState>({
  key: POPUP_REJECT_CANDIDATE_STATE_KEY,
  get: ({ get }) => {
    const state = get(showRejectCandidateAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showRejectCandidateAtom, { ...get(showRejectCandidateAtom), ...data })
  }
})
