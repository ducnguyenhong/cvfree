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
  } | null
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
  status?: string
  type: string | null
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
  numberOfReportJob?: number
  createdAt?: Date
  updatedAt?: Date
}
