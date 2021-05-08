import { ReportJobInfo } from './report-job-info'
import { CvInfo } from './cv-info'
import { JobPostingInfo } from './job-posting-info'
import { CompanyInfo } from './company-info'

export interface DashboardInfo {
  statis: {
    cv: number
    job: number
    company: number
  }
  reportJobs: ReportJobInfo[]
  cvs: CvInfo[]
  jobs: JobPostingInfo[]
  companies: CompanyInfo[]
}
