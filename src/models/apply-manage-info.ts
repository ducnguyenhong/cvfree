export interface ApplyManageInfo {
  jobId: string
  jobName: string
  cvId: string
  cvName: string
  cvFullname: string
  status: string // WAITING => DINIED/APPROVED => DONE,
  createdAt: Date
}
