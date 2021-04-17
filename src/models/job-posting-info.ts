export interface JobPostingInfo {
  _id?: string
  name: string
  isApplied?: boolean
  companyId?: string
  companyName?: string
  companyLogo?: string
  candidateApplied?: {
    cvId: string
    accept: boolean
  }[]
  address: {
    value: { district: string; city: string }
    label: string
  } | null
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
