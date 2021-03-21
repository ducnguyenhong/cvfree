import localeData from 'app/language'
import SignIn from 'app/pages/sign-in'
import ErrorFallback from 'app/partials/layout/error-fallback'
import { userTokenState } from 'app/states/user-info-state'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { IntlProvider } from 'react-intl'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { MainRouteWrapper } from './main-route-wrapper'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './route'

const ErrorPage = lazy(() => import('app/pages/error'))

const PublicRoute: React.FC = () => {
  const token = useRecoilValue(userTokenState)?.token

  console.log('token', token)

  return (
    <Switch>
      {PUBLIC_ROUTES.map((props, index) => {
        const { path, component, exact } = props
        return <Route key={`public_${index}`} path={path} component={component} exact={exact} />
      })}
      {!token ? <Route path="/sign-in" component={SignIn} /> : <Redirect to="/" />}
      <Route path="/404" exact={true} component={ErrorPage} />
      <Redirect to="/404" />
    </Switch>
  )
}

const PrivateRoute: React.FC = () => {
  const token = useRecoilValue(userTokenState)?.token
  return (
    <Switch>
      {!token ? (
        <Redirect to="/sign-in" />
      ) : (
        <>
          {PRIVATE_ROUTES.map((props, index) => {
            const { path, component, exact } = props
            return <Route key={`private_${index}`} path={path} component={component} exact={exact} />
          })}
        </>
      )}
      <Route path="/404" exact={true} component={ErrorPage} />
      <Redirect to="/404" />
    </Switch>
  )
}

const SwitchRenderer: React.FC = () => {
  return (
    <MainRouteWrapper>
      <Switch>
        <PublicRoute />
        <PrivateRoute />
      </Switch>
    </MainRouteWrapper>
  )
}

const RouteURL: React.FC = () => {
  const language: string = localStorage.getItem('i18n-language') || 'vi'
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
