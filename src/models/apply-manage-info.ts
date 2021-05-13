export interface ApplyManageInfo {
  _id?: string
  jobId: string
  jobName: string
  applyType: string
  applyValue: string
  applyCandidate: {
    userId: string
    fullname: string
  }
  status: string // WAITING => DINIED/APPROVED => DONE,
  createdAt: Date
}
