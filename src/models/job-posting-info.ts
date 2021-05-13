export interface JobPostingInfo {
  _id?: string
  id?: number
  name: string
  isApplied?: boolean
  creatorId?: string
  company?: {
    name: string
    logo: string
    id: string
  }
  candidateApplied?: {
    userId: string
    applyType: string // OTHER , CVFREE, PDF
    applyValue: string
    appliedAt: Date
  }[]
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
    salaryFrom?: string
    salaryTo?: string
    salaryCurrency?: string
  }
  jobDescription: string
  requirementForCandidate: string
  benefitToEnjoy: string
  status: string
  createdAt?: Date
  updatedAt?: Date
}
