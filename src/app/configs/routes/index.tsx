import { lazy } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Navbar from 'app/pages/navbar'

const SignInComponent = lazy(() => import('app/pages/sign-in'))
const SignUpComponent = lazy(() => import('app/pages/sign-up'))
const ForgotPasswordComponent = lazy(() => import('app/pages/forgot-password'))

const ErrorComponent = lazy(() => import('app/pages/error'))
const HomeComponent = lazy(() => import('app/pages/home'))

const SampleCvComponent = lazy(() => import('app/pages/sample-cv'))
const JobsNewComponent = lazy(() => import('app/pages/job-new'))
const EmployerComponent = lazy(() => import('app/pages/employer'))
const EmployerSignUpComponent = lazy(() => import('app/pages/employer-sign-up'))

const CvFormComponent = lazy(() => import('app/pages/cv-form'))
const CvDetailComponent = lazy(() => import('app/pages/cv-detail'))

const RouteURL: React.FC = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/employer/sign-up" component={EmployerSignUpComponent} />
          <Route path="/employer" component={EmployerComponent} />
          <Route path="/jobs-new" component={JobsNewComponent} />
          <Route path="/sample-cv" component={SampleCvComponent} />

          {/* Auth */}
          <Route path="/sign-in" component={SignInComponent} />
          <Route path="/sign-up" component={SignUpComponent} />
          <Route path="/forgot-password" component={ForgotPasswordComponent} />

          {/* CV */}
          <Route path="/create-cv" component={CvFormComponent} />
          <Route path="/cv/:name.:id" component={CvDetailComponent} />

          <Route path="/error" component={ErrorComponent} />
          <Route exact path="/" component={HomeComponent} />
        </Switch>
      </Router>
    </div>
  )
}

export default RouteURL
