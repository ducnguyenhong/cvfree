export interface CompanyInfo {
  name: string
  taxCode?: string
  background?: string
  website?: string
  personnelSize: string
  email: string
  staffList: number[]
  address: {
    value: { district: string; city: string }
    label: string
    street: string
  }
  intro?: string
  logo?: string
  status: string
  createdAt?: number
  updatedAt?: number
}
