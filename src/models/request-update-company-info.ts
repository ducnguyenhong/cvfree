export interface RequestUpdateCompanyInfo {
  _id?: string
  userRequest?: {
    id?: string
    fullname?: string
    avatar?: string
    employeeIdCard?: string
    position?: { value: string; label: string }
    email?: string
  }
  expiredAt?: Date
  companyId?: string
  rootInfo?: {
    id: string
    name: string
    logo: string
  }
  userAdmin?: {
    id: string
    fullname: string
    avatar: string
    email: string
  }
  processStatus?: string // WAITING => APPROVED/REJECTED => DONE,
  reasonRejectOfAdminCompany?: string
  content: {
    name: string
    taxCode?: string
    email: string
    logoId?: string
    phone: string
    address?: {
      value: {
        city?: { value: string; label: string }
        district?: { value: string; label: string }
        street?: string
      }
      label: string
    } | null
    website?: string
    personnelSize: string
    background?: string
    backgroundId?: string
    intro?: string
    logo?: string
  }
  status?: string
  createdAt?: Date
}
