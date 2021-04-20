import { lazy, LazyExoticComponent } from 'react'

const SignUp = lazy(() => import('app/pages/auth/sign-up'))
const ForgotPassword = lazy(() => import('app/pages/auth/forgot-password'))
const VerifyAccount = lazy(() => import('app/pages/auth/verify'))

const ErrorComponent = lazy(() => import('app/pages/error'))
const Home = lazy(() => import('app/pages/home'))
const Profile = lazy(() => import('app/pages/profile'))

const JobsListGeneral = lazy(() => import('app/pages/job/job-list-general'))
const JobsDetail = lazy(() => import('app/pages/job/job-detail'))

const CandidateDetail = lazy(() => import('app/pages/candidate/candidate-detail'))
const CandidateManageApply = lazy(() => import('app/pages/candidate/candidate-manage-apply'))

const EmployerDashboard = lazy(() => import('app/pages/employer/employer-dashboard'))
const EmployerIntro = lazy(() => import('app/pages/employer/employer-intro'))
const EmployerSignUp = lazy(() => import('app/pages/employer/employer-sign-up'))
const EmployerCompanyInfo = lazy(() => import('app/pages/employer/employer-company-info'))
const EmployerLookingForCandidates = lazy(() => import('app/pages/employer/employer-looking-for-candidates'))
const EmployerRecruitment = lazy(() => import('app/pages/employer/employer-recruitment'))
const EmployerCreateJobPostings = lazy(() => import('app/pages/employer/employer-create-job-postings'))
const EmployerManageCandidate = lazy(() => import('app/pages/employer/employer-manage-candidate'))
const EmployerPayment = lazy(() => import('app/pages/employer/employer-payment'))
const EmployerRegisterCompany = lazy(() => import('app/pages/employer/employer-register-company'))

const CvForm = lazy(() => import('app/pages/cv/cv-create'))
const CvDetail = lazy(() => import('app/pages/cv/cv-detail'))
const CvManage = lazy(() => import('app/pages/cv/cv-manage'))
const CvTemplateList = lazy(() => import('app/pages/cv/cv-template-select'))

const CompanyDetail = lazy(() => import('app/pages/company/company-detail'))

const Dashboard = lazy(() => import('app/pages/dashboard/pages/dashboard'))
const AllUserList = lazy(() => import('app/pages/dashboard/pages/user/all-user'))
const CandidateList = lazy(() => import('app/pages/dashboard/pages/user/candidate'))
const EmployerList = lazy(() => import('app/pages/dashboard/pages/user/employer'))
const CompanyList = lazy(() => import('app/pages/dashboard/pages/company'))
const JobList = lazy(() => import('app/pages/dashboard/pages/job'))
const CvList = lazy(() => import('app/pages/dashboard/pages/cv'))

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
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  // error
  {
    path: '/error',
    component: ErrorComponent,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  // auth
  {
    path: '/sign-up',
    component: SignUp,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },
  {
    path: '/verify-account/:id',
    component: VerifyAccount,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

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
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  // Employer
  {
    path: '/employer/sign-up',
    component: EmployerSignUp,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/employer-intro',
    component: EmployerIntro,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },

  // Job
  {
    path: '/jobs',
    component: JobsListGeneral,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },
  {
    path: '/jobs/:slug.:id',
    component: JobsDetail,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  // Company
  {
    path: '/companies/:id',
    component: CompanyDetail,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  }
]

export const PRIVATE_ROUTES: RouteType[] = [
  // auth
  {
    path: '/',
    component: Home,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  // profile
  {
    path: '/profile',
    component: Profile,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  // error
  {
    path: '/error',
    component: ErrorComponent,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  // cv
  {
    path: '/template-cv',
    component: CvTemplateList,
    exact: true,
    role: ['ADMIN', 'USER']
  },
  {
    path: '/cv-public/:name.:id',
    component: CvDetail,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },

  //employer
  {
    path: '/employer',
    component: EmployerDashboard,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/employer/publish-recruitment',
    component: EmployerRecruitment,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/employer/manage-candidate',
    component: EmployerManageCandidate,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/employer/looking-for-candidates',
    component: EmployerLookingForCandidates,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/employer/company/:id',
    component: EmployerCompanyInfo,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },
  {
    path: '/employer/create-job-postings',
    component: EmployerCreateJobPostings,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/employer/payment',
    component: EmployerPayment,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/employer/register-company',
    component: EmployerRegisterCompany,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },

  // candidate
  {
    path: '/candidate/:id',
    component: CandidateDetail,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/manage-apply',
    component: CandidateManageApply,
    exact: true,
    role: ['ADMIN', 'USER']
  },

  // Jobs

  {
    path: '/jobs',
    component: JobsListGeneral,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },
  {
    path: '/jobs/:slug.:id',
    component: JobsDetail,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
  },
  //

  {
    path: '/create-cv',
    component: CvForm,
    exact: true,
    role: ['ADMIN', 'USER']
  },
  {
    path: '/update-cv/:name.:id',
    component: CvForm,
    exact: true,
    role: ['ADMIN', 'USER']
  },
  {
    path: '/manage-cv',
    component: CvManage,
    exact: true,
    role: ['ADMIN', 'USER']
  },

  // Company
  {
    path: '/employer/company-info',
    component: EmployerCompanyInfo,
    exact: true,
    role: ['ADMIN', 'EMPLOYER']
  },
  {
    path: '/companies/:id',
    component: CompanyDetail,
    exact: true,
    role: ['ADMIN', 'USER', 'EMPLOYER']
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
  }
  // ...PRIVATE_ROUTES,
  // ...PUBLIC_ROUTES
]
