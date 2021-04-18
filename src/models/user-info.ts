export interface UserInfo {
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
  birthday?: number
  coin?: number
  country?: string
  fullname?: string
  gender?: string
  id?: number
  companyId?: string
  phone?: string
  status: string
  type: string
  avatar?: string
  verify?: boolean
  seeCV?: boolean
  findJob?: boolean
  typeAccount?: string
  numberOfPosting?: number
  numberOfCandidateOpening?: number
  createdAt?: Date
  updatedAt?: Date
}
