export interface JobPostingInfo {
  _id?: string
  id?: number
  name: string
  isApplied?: boolean
  creatorId?: string
  company?: {
    name: string
    logo: string
  }
  candidateApplied?: string[]
  address?: {
    label: string
    value: {
      city: string
      district: string
    }
  }
  career: string[]
  recruitmentPosition: string[]
  timeToApply: number
  formOfWork: string[]
  numberRecruited: number
  genderRequirement: string[]
  salary: {
    salaryType: string
    salaryFrom?: number
    salaryTo?: number
    salaryCurrency?: string
  }
  jobDescription: string
  requirementForCandidate: string
  benefitToEnjoy: string
  status: string
  createdAt?: Date
  updatedAt?: Date
}
