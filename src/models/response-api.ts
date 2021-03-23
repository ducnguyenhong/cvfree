import { UserInfo } from './user-info'
import { CvInfo } from './cv-info'

export interface ResponseUserDetail {
  success: boolean
  data: {
    userDetail: UserInfo
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
