export interface JobPostingInfo {
  _id?: string
  name: string
  isApplied?: boolean
  companyId?: number
  companyName?: string
  companyLogo?: string
  candidateApplied?: string[]
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
