import { lazy, LazyExoticComponent } from 'react'

const SignUp = lazy(() => import('app/pages/auth/sign-up'))
const ForgotPassword = lazy(() => import('app/pages/auth/forgot-password'))
const VerifyAccount = lazy(() => import('app/pages/auth/verify'))

const ErrorComponent = lazy(() => import('app/pages/error'))
const Home = lazy(() => import('app/pages/home'))
const Profile = lazy(() => import('app/pages/profile'))
const ProfileUpdate = lazy(() => import('app/pages/profile-update'))
const AboutUs = lazy(() => import('app/pages/about-us'))

const JobsListGeneral = lazy(() => import('app/pages/job/job-list-general'))
const JobsDetail = lazy(() => import('app/pages/job/job-detail'))
const JobListNew = lazy(() => import('app/pages/job/job-list-new'))
const JobListHighSalary = lazy(() => import('app/pages/job/job-list-high-salary'))
const JobListIntern = lazy(() => import('app/pages/job/job-list-intern'))
const JobListLocation = lazy(() => import('app/pages/job/job-list-location'))
const JobListCareer = lazy(() => import('app/pages/job/job-list-career'))

const CandidateDetail = lazy(() => import('app/pages/candidate/candidate-detail'))
const CandidateManageApply = lazy(() => import('app/pages/candidate/candidate-manage-apply'))
const CandidateManageCv = lazy(() => import('app/pages/candidate/candidate-manage-cv'))

const EmployerDashboard = lazy(() => import('app/pages/employer/employer-dashboard'))
const EmployerIntro = lazy(() => import('app/pages/employer/employer-intro'))
const EmployerSignUp = lazy(() => import('app/pages/employer/employer-sign-up'))
const EmployerCompanyInfo = lazy(() => import('app/pages/employer/employer-company-info'))
const EmployerLookingForCandidates = lazy(() => import('app/pages/employer/employer-looking-for-candidates'))
const EmployerManageJob = lazy(() => import('app/pages/employer/employer-manage-job'))
const EmployerCreateJobPostings = lazy(() => import('app/pages/employer/employer-create-job-postings'))
const EmployerManageCandidate = lazy(() => import('app/pages/employer/employer-manage-candidate'))
const EmployerPayment = lazy(() => import('app/pages/employer/employer-payment'))
const EmployerRegisterCompany = lazy(() => import('app/pages/employer/employer-register-company'))
const EmployerRequestUpdateCompany = lazy(() => import('app/pages/employer/employer-request-update-company'))

const CvForm = lazy(() => import('app/pages/cv/cv-create'))
const CvDetail = lazy(() => import('app/pages/cv/cv-detail'))
const CvTemplateList = lazy(() => import('app/pages/cv/cv-template-select'))

const CompanyDetail = lazy(() => import('app/pages/company/company-detail'))
const CompanyRequestUpdate = lazy(() => import('app/pages/company/company-request-update'))

const Dashboard = lazy(() => import('app/pages/dashboard/pages/dashboard'))
const AllUserList = lazy(() => import('app/pages/dashboard/pages/user/all-user'))
const CandidateList = lazy(() => import('app/pages/dashboard/pages/user/candidate'))
const EmployerList = lazy(() => import('app/pages/dashboard/pages/user/employer'))
const CompanyList = lazy(() => import('app/pages/dashboard/pages/company'))
const JobList = lazy(() => import('app/pages/dashboard/pages/job'))
const CvList = lazy(() => import('app/pages/dashboard/pages/cv'))
const RequestUpdateCompanyList = lazy(() => import('app/pages/dashboard/pages/request-update-company'))
const SendEmail = lazy(() => import('app/pages/dashboard/pages/send-email'))
const ReportJobList = lazy(() => import('app/pages/dashboard/pages/report-job'))
const UserDetail = lazy(() => import('app/pages/dashboard/pages/user/user-detail'))

interface RouteType {
  path: string
  component: LazyExoticComponent<React.FC>
  exact: boolean
  role: string[]
}

export const PUBLIC_ROUTES: RouteType[] = [
  // Home
  {
    path: '/',
    component: Home,
    exact: true,
    role: []
  },
  {
    path: '/about-us',
    component: AboutUs,
    exact: true,
    role: []
  },

  // error
  {
    path: '/error',
    component: ErrorComponent,
    exact: true,
    role: []
  },

  // auth
  {
    path: '/sign-up',
    component: SignUp,
    exact: true,
    role: []
  },
  {
    path: '/verify-account/:id',
    component: VerifyAccount,
    exact: true,
    role: []
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
    role: []
  },

  {
    path: '/template-cv',
    component: CvTemplateList,
    exact: true,
    role: []
  },
  {
    path: '/cv-public/:name.:id',
    component: CvDetail,
    exact: true,
    role: []
  },

  // Employer
  {
    path: '/employer/sign-up',
    component: EmployerSignUp,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer-intro',
    component: EmployerIntro,
    exact: true,
    role: ['EMPLOYER']
  },

  // Job
  {
    path: '/jobs',
    component: JobsListGeneral,
    exact: true,
    role: []
  },
  {
    path: '/jobs/:slug.:id',
    component: JobsDetail,
    exact: true,
    role: []
  },
  {
    path: '/jobs/newest',
    component: JobListNew,
    exact: true,
    role: []
  },
  {
    path: '/jobs/high-salary',
    component: JobListHighSalary,
    exact: true,
    role: []
  },
  {
    path: '/jobs/intern',
    component: JobListIntern,
    exact: true,
    role: []
  },
  {
    path: '/jobs/city/:cityRoute',
    component: JobListLocation,
    exact: true,
    role: []
  },
  {
    path: '/jobs/career/:careerRoute',
    component: JobListCareer,
    exact: true,
    role: []
  },

  // Company
  {
    path: '/companies/:id',
    component: CompanyDetail,
    exact: true,
    role: []
  }
]

export const PRIVATE_ROUTES: RouteType[] = [
  // home
  {
    path: '/',
    component: Home,
    exact: true,
    role: []
  },
  {
    path: '/about-us',
    component: AboutUs,
    exact: true,
    role: []
  },

  // profile
  {
    path: '/profile',
    component: Profile,
    exact: true,
    role: []
  },
  {
    path: '/profile/update',
    component: ProfileUpdate,
    exact: true,
    role: []
  },

  // error
  {
    path: '/error',
    component: ErrorComponent,
    exact: true,
    role: []
  },

  // cv
  {
    path: '/template-cv',
    component: CvTemplateList,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },
  {
    path: '/cv-public/:name.:id',
    component: CvDetail,
    exact: true,
    role: []
  },

  //employer
  {
    path: '/employer',
    component: EmployerDashboard,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/manage-job',
    component: EmployerManageJob,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/manage-candidate',
    component: EmployerManageCandidate,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/looking-for-candidates',
    component: EmployerLookingForCandidates,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/company/:id',
    component: EmployerCompanyInfo,
    exact: true,
    role: []
  },
  {
    path: '/employer/jobs/create',
    component: EmployerCreateJobPostings,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/jobs/update/:id',
    component: EmployerCreateJobPostings,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/payment',
    component: EmployerPayment,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/register-company',
    component: EmployerRegisterCompany,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/update-company',
    component: EmployerRegisterCompany,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/employer/request-update-company',
    component: EmployerRequestUpdateCompany,
    exact: true,
    role: ['EMPLOYER']
  },

  // candidate
  {
    path: '/candidate/:id',
    component: CandidateDetail,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/manage-apply',
    component: CandidateManageApply,
    exact: true,
    role: ['USER']
  },

  // Jobs

  {
    path: '/jobs',
    component: JobsListGeneral,
    exact: true,
    role: []
  },
  {
    path: '/jobs/:slug.:id',
    component: JobsDetail,
    exact: true,
    role: []
  },
  {
    path: '/jobs/newest',
    component: JobListNew,
    exact: true,
    role: []
  },
  {
    path: '/jobs/high-salary',
    component: JobListHighSalary,
    exact: true,
    role: []
  },
  {
    path: '/jobs/intern',
    component: JobListIntern,
    exact: true,
    role: []
  },
  {
    path: '/jobs/city/:cityRoute',
    component: JobListLocation,
    exact: true,
    role: []
  },
  {
    path: '/jobs/career/:careerRoute',
    component: JobListCareer,
    exact: true,
    role: []
  },
  //

  {
    path: '/create-cv',
    component: CvForm,
    exact: true,
    role: ['USER']
  },
  {
    path: '/update-cv/:name.:id',
    component: CvForm,
    exact: true,
    role: ['USER']
  },
  {
    path: '/manage-cv',
    component: CandidateManageCv,
    exact: true,
    role: ['USER']
  },

  // Company
  {
    path: '/employer/company-info',
    component: EmployerCompanyInfo,
    exact: true,
    role: ['EMPLOYER']
  },
  {
    path: '/companies/:id',
    component: CompanyDetail,
    exact: true,
    role: []
  },
  {
    path: '/request-update-company/:id',
    component: CompanyRequestUpdate,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  }
]

export const DASHBOARD_ROUTES: RouteType[] = [
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/users',
    component: AllUserList,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/candidates',
    component: CandidateList,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/employers',
    component: EmployerList,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/companies',
    component: CompanyList,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/jobs',
    component: JobList,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/cvs',
    component: CvList,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/request-update-company',
    component: RequestUpdateCompanyList,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/send-email',
    component: SendEmail,
    exact: true,
    role: ['ADMIN']
  },
  {
    path: '/dashboard/users/:id',
    component: UserDetail,
    exact: true,
    role: ['ADMIN']
  }
  // ...PRIVATE_ROUTES,
  // ...PUBLIC_ROUTES
]
