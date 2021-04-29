export interface CompanyInfo {
  _id?: string
  id?: number
  name: string
  taxCode?: string
  background?: string
  backgroundId?: string
  website?: string
  personnelSize: string
  email: string
  phone: string
  creatorId?: string
  creator: {
    employeeIdCard: string
    employeeIdCardId: string
    position?: {
      value: string
      label: string
    }
  }
  staffList: number[]
  address: {
    value: {
      city?: { value: string; label: string }
      district?: { value: string; label: string }
      street?: string
    }
    label: string
  }
  intro?: string
  logo?: string
  logoId?: string
  status: string
  createdAt?: number
  updatedAt?: number
}
