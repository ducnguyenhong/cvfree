import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showModal: boolean
  jobId?: number | string
  candidateApplied: {
    userId: string
    applyType: string // OTHER , CVFREE, PDF
    applyValue: string
    appliedAt: Date
  }[]
}

export const POPUP_APPLY_CANDIDATE_ATOM_KEY = 'POPUP_APPLY_CANDIDATE_ATOM_KEY'
export const POPUP_APPLY_CANDIDATE_STATE_KEY = 'POPUP_APPLY_CANDIDATE_STATE_KEY'

export const showApplyCandidateAtom = atom<DeactiveState>({
  key: POPUP_APPLY_CANDIDATE_ATOM_KEY,
  default: {
    showModal: false,
    jobId: undefined,
    candidateApplied: []
  }
})

export const showApplyCandidateState = selector<DeactiveState>({
  key: POPUP_APPLY_CANDIDATE_STATE_KEY,
  get: ({ get }) => {
    const state = get(showApplyCandidateAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showApplyCandidateAtom, { ...get(showApplyCandidateAtom), ...data })
  }
})
