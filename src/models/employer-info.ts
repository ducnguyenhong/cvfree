export interface EmployerInfo {
  username: string
  email: string
  address?: {
    label: string
    value: {
      city: string
      district: string
    }
  }
  birthday?: number
  coin?: number
  fullname?: string
  gender?: string
  companyId?: number
  phone?: string
  avatar?: string
  typeAccount?: string
  numberOfPosting?: number
  numberOfCandidateOpening?: number
}
