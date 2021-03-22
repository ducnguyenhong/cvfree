import { UserInfo } from 'models/user-info'

export interface ResponseUserDetail {
  success: boolean
  data: {
    userDetail: UserInfo
  }
  code: number
  error?: { message: string }
  message?: string
}
