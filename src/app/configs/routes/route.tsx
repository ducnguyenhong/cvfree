import { lazy, LazyExoticComponent } from 'react'

const SignUp = lazy(() => import('app/pages/auth/sign-up'))
const ForgotPassword = lazy(() => import('app/pages/auth/forgot-password'))
const VerifyAccount = lazy(() => import('app/pages/auth/verify'))

const ErrorComponent = lazy(() => import('app/pages/error'))
const Home = lazy(() => import('app/pages/home'))

const JobsListGeneral = lazy(() => import('app/pages/job/job-list-general'))
const JobsDetail = lazy(() => import('app/pages/job/job-detail'))

const EmployerDashboard = lazy(() => import('app/pages/employer/employer-dashboard'))
const EmployerIntro = lazy(() => import('app/pages/employer/employer-intro'))
const EmployerSignUp = lazy(() => import('app/pages/employer/employer-sign-up'))
const EmployerSignIn = lazy(() => import('app/pages/employer/employer-sign-in'))
const EmployerCompanyInfo = lazy(() => import('app/pages/employer/employer-company-info'))
const EmployerLookingForCandidates = lazy(() => import('app/pages/employer/employer-looking-for-candidates'))
const EmployerRecruitment = lazy(() => import('app/pages/employer/employer-recruitment'))
const EmployerCreateJobPostings = lazy(() => import('app/pages/employer/employer-create-job-postings'))

const CvForm = lazy(() => import('app/pages/cv/cv-create'))
const CvDetail = lazy(() => import('app/pages/cv/cv-detail'))
const CvManage = lazy(() => import('app/pages/cv/cv-manage'))
const CvTemplateList = lazy(() => import('app/pages/cv/cv-template-select'))

interface RouteType {
  path: string
  component: LazyExoticComponent<React.FC>
  exact: boolean
}

export const PUBLIC_ROUTES: RouteType[] = [
  // Home
  {
    path: '/',
    component: Home,
    exact: true
  },

  // error
  {
    path: '/error',
    component: ErrorComponent,
    exact: true
  },

  // auth
  {
    path: '/sign-up',
    component: SignUp,
    exact: true
  },
  {
    path: '/verify-account/:id',
    component: VerifyAccount,
    exact: true
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true
  },

  {
    path: '/template-cv',
    component: CvTemplateList,
    exact: true
  },
  {
    path: '/cv-public/:name.:id',
    component: CvDetail,
    exact: true
  },

  // Employer
  {
    path: '/employer/sign-up',
    component: EmployerSignUp,
    exact: true
  },
  {
    path: '/employer/sign-in',
    component: EmployerSignIn,
    exact: true
  },
  {
    path: '/employer-intro',
    component: EmployerIntro,
    exact: true
  },

  // Job
  {
    path: '/jobs',
    component: JobsListGeneral,
    exact: true
  },
  {
    path: '/jobs/:slug.:id',
    component: JobsDetail,
    exact: true
  }
]

export const PRIVATE_ROUTES: RouteType[] = [
  // auth
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/error',
    component: ErrorComponent,
    exact: true
  },
  {
    path: '/template-cv',
    component: CvTemplateList,
    exact: true
  },
  {
    path: '/cv-public/:name.:id',
    component: CvDetail,
    exact: true
  },

  //employer
  {
    path: '/employer',
    component: EmployerDashboard,
    exact: true
  },
  {
    path: '/employer/publish-recruitment',
    component: EmployerRecruitment,
    exact: true
  },
  {
    path: '/employer/looking-for-candidates',
    component: EmployerLookingForCandidates,
    exact: true
  },
  {
    path: '/employer/company-info',
    component: EmployerCompanyInfo,
    exact: true
  },
  {
    path: '/employer/create-job-postings',
    component: EmployerCreateJobPostings,
    exact: true
  },

  // Jobs

  {
    path: '/jobs',
    component: JobsListGeneral,
    exact: true
  },
  {
    path: '/jobs/:slug.:id',
    component: JobsDetail,
    exact: true
  },
  //

  {
    path: '/create-cv',
    component: CvForm,
    exact: true
  },
  {
    path: '/update-cv/:name.:id',
    component: CvForm,
    exact: true
  },
  {
    path: '/manage-cv',
    component: CvManage,
    exact: true
  }
]
