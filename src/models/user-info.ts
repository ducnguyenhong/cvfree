export interface UserInfo {
  _id?: string
  username: string
  password: string
  deviceId?: string
  email: string
  listCV?: string[]
  address?: {
    label: string
    value: {
      city: string
      district: string
    }
  }
  birthday?: Date
  coin?: number
  country?: string
  fullname?: string
  gender?: string
  id?: number
  companyId?: string
  isAdminOfCompany?: boolean
  beWarned?: boolean
  phone?: string
  status: string
  type: string
  avatar?: string
  avatarId?: string
  verify?: boolean
  seeCV?: boolean
  findJob?: boolean
  typeAccount?: string
  numberOfPosting?: number
  numberOfCreateCv?: number
  numberOfCandidateOpening?: number
  numberOfRequestUpdateCompany?: number
  createdAt?: Date
  updatedAt?: Date
}
