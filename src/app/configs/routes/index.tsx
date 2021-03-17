import localeData from 'app/language'
import Navbar from 'app/pages/navbar'
import ErrorFallback from 'app/partials/layout/error-fallback'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { IntlProvider } from 'react-intl'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { MainRouteWrapper } from './main-route-wrapper'
import { DASHBOARD_ROUTES, MAIN_ROUTES } from './route'

const MainRoute: React.FC = () => {
  return (
    <Switch>
      {MAIN_ROUTES.map((props, index) => {
        const { path, component, exact } = props
        return <Route key={`main_${index}`} path={path} component={component} exact={exact} />
      })}
    </Switch>
  )
}

const DashboardRoute: React.FC = () => {
  return (
    <Switch>
      {DASHBOARD_ROUTES.map((props, index) => {
        const { path, component, exact } = props
        return (
          <div key={`${index}${path}`}>
            <Navbar />
            <Route path={path} component={component} exact={exact} />
            <Redirect to="/dashboard" />
          </div>
        )
      })}
    </Switch>
  )
}

const SwitchRenderer: React.FC = () => {
  const token = ''

  if (token) {
    return (
      <div>
        <Navbar />
        <DashboardRoute />
      </div>
    )
  }

  return (
    <MainRouteWrapper>
      <MainRoute />
    </MainRouteWrapper>
  )
}

const RouteURL: React.FC = () => {
  const language = 'vi'
  return (
    <IntlProvider locale={language} messages={localeData[language] as Record<string, string>}>
      <BrowserRouter>
        <Suspense fallback={<span>Loading</span>}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SwitchRenderer />
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default RouteURL
