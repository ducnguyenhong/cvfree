export interface CandidateManageInfo {
  jobId: string
  jobName: string
  cvId: string
  candidate: {
    candidateId: string
    fullname: string
    avatar: string
    gender: string
    email: string
    phone: string
    address?: {
      label: string
      value: {
        city: string
        district: string
      }
    }
  }
  isDone: boolean
  createdAt: Date
  candidateId: string
}
