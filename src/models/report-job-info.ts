export interface ReportJobInfo {
  _id: string
  reporter: {
    id: string
    avatar?: string
    fullname?: string
    phone?: string
    email: string
  }
  content: string
  creator: {
    id: string
    fullname?: string
    phone?: string
    email: string
    avatar?: string
  }
  company: {
    id: string
    name: string
    logo?: string
  }
  expiredAt?: Date
  processStatus?: string
  job: {
    id: string
    name: string
  }
  status?: string
  createdAt?: Date
}
