export interface CompanyInfo {
  id?: number
  name: string
  taxCode?: string
  background?: string
  backgroundId?: string
  website?: string
  personnelSize: string
  email: string
  phone: string
  staffList: number[]
  address: {
    value: { district: string; city: string }
    label: string
    street: string
  }
  intro?: string
  logo?: string
  logoId?: string
  status: string
  createdAt?: number
  updatedAt?: number
}
