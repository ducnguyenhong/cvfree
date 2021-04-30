import { atom, DefaultValue, selector } from 'recoil'

interface DeactiveState {
  showModal: boolean
  id?: string
  emailTo: string
  helloName?: string
  isLoginNow?: boolean
  content?: string
}

export const MODAL_SEND_EMAIL_REQUEST_UPDATE_COMPANY_ATOM_KEY = 'MODAL_SEND_EMAIL_REQUEST_UPDATE_COMPANY_ATOM_KEY'
export const MODAL_SEND_EMAIL_REQUEST_UPDATE_COMPANY_STATE_KEY = 'MODAL_SEND_EMAIL_REQUEST_UPDATE_COMPANY_STATE_KEY'

export const showSendEmailAtom = atom<DeactiveState>({
  key: MODAL_SEND_EMAIL_REQUEST_UPDATE_COMPANY_ATOM_KEY,
  default: {
    showModal: false,
    emailTo: ''
  }
})

export const showSendEmailRequestUpdateCompanyState = selector<DeactiveState>({
  key: MODAL_SEND_EMAIL_REQUEST_UPDATE_COMPANY_STATE_KEY,
  get: ({ get }) => {
    const state = get(showSendEmailAtom)
    return state
  },
  set: ({ get, set }, data) => {
    if (data instanceof DefaultValue) {
      return
    }
    set(showSendEmailAtom, { ...get(showSendEmailAtom), ...data })
  }
})
