import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showModal: boolean
  id?: string
}

export const MODAL_REJECT_REQUEST_UPDATE_COMPANY_ATOM_KEY = 'MODAL_REJECT_REQUEST_UPDATE_COMPANY_ATOM_KEY'
export const MODAL_REJECT_REQUEST_UPDATE_COMPANY_STATE_KEY = 'MODAL_REJECT_REQUEST_UPDATE_COMPANY_STATE_KEY'

export const showRejectAtom = atom<DeactiveState>({
  key: MODAL_REJECT_REQUEST_UPDATE_COMPANY_ATOM_KEY,
  default: {
    showModal: false
  }
})

export const showRejectRequestUpdateCompanyState = selector<DeactiveState>({
  key: MODAL_REJECT_REQUEST_UPDATE_COMPANY_STATE_KEY,
  get: ({ get }) => {
    const state = get(showRejectAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showRejectAtom, { ...get(showRejectAtom), ...data })
  }
})
