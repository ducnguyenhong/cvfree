import { UserInfo } from './user-info'
import { CvInfo } from './cv-info'
import { CandidateInfo } from './candidate-info'
import { EmployerInfo } from './employer-info'

export interface ResponseUserDetail {
  success: boolean
  data: {
    userDetail: UserInfo
  }
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseListCV {
  success: boolean
  data: {
    items: CvInfo[]
  }
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseCVDetail {
  success: boolean
  data: {
    cvDetail: CvInfo
  }
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseUpload {
  success: boolean
  data: {
    url: string
  }
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseDelete {
  success: boolean
  data: undefined | null
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseListCandidate {
  success: boolean
  data: {
    items: CandidateInfo[]
    page: number
    size: number
    totalItems: number
    totalPages: number
  }
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseCandidateDetail {
  success: boolean
  data: {
    candidateDetail: CandidateInfo
  }
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseEmployerDetail {
  success: boolean
  data: {
    employerDetail: EmployerInfo
  }
  code: number
  error?: { message: string }
  message?: string
}

export interface ResponseDefault {
  success: boolean
  data: null | undefined
  code: number
  error?: { message: string }
  message?: string
}
