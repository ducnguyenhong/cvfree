export interface RequestUpdateCompanyInfo {
  userRequest: {
    id?: string
    fullname?: string
    avatar?: string
  }
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
}
