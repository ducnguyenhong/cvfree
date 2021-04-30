import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showModal: boolean
  cvId?: number | string
  jobId?: string
}

export const MODAL_BAN_REQUEST_UPDATE_COMPANY_ATOM_KEY = 'MODAL_BAN_REQUEST_UPDATE_COMPANY_ATOM_KEY'
export const MODAL_BAN_REQUEST_UPDATE_COMPANY_STATE_KEY = 'MODAL_BAN_REQUEST_UPDATE_COMPANY_STATE_KEY'

export const showBanRequestUpdateCompanyAtom = atom<DeactiveState>({
  key: MODAL_BAN_REQUEST_UPDATE_COMPANY_ATOM_KEY,
  default: {
    showModal: false,
    jobId: undefined,
    cvId: undefined
  }
})

export const showBanRequestUpdateCompanyState = selector<DeactiveState>({
  key: MODAL_BAN_REQUEST_UPDATE_COMPANY_STATE_KEY,
  get: ({ get }) => {
    const state = get(showBanRequestUpdateCompanyAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showBanRequestUpdateCompanyAtom, { ...get(showBanRequestUpdateCompanyAtom), ...data })
  }
})
