import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showModal: boolean
  id?: string
}

export const MODAL_ACCEPT_REQUEST_UPDATE_COMPANY_ATOM_KEY = 'MODAL_ACCEPT_REQUEST_UPDATE_COMPANY_ATOM_KEY'
export const MODAL_ACCEPT_REQUEST_UPDATE_COMPANY_STATE_KEY = 'MODAL_ACCEPT_REQUEST_UPDATE_COMPANY_STATE_KEY'

export const showAcceptAtom = atom<DeactiveState>({
  key: MODAL_ACCEPT_REQUEST_UPDATE_COMPANY_ATOM_KEY,
  default: {
    showModal: false
  }
})

export const showAcceptRequestUpdateCompanyState = selector<DeactiveState>({
  key: MODAL_ACCEPT_REQUEST_UPDATE_COMPANY_STATE_KEY,
  get: ({ get }) => {
    const state = get(showAcceptAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showAcceptAtom, { ...get(showAcceptAtom), ...data })
  }
})
