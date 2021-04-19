import localeData from 'app/language'
import ErrorFallback from 'app/partials/layout/error-fallback'
import { userTokenState, userInfoState } from 'app/states/user-info-state'
import { Suspense, lazy, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { IntlProvider } from 'react-intl'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { MainRouteWrapper } from './main-route-wrapper'
import { DASHBOARD_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from './route'
import { languageState } from 'app/states/language-state'
import { DashboardLayout } from 'app/pages/dashboard/layout/dashboard-layout'

const ErrorPage = lazy(() => import('app/pages/error'))
const SignInPage = lazy(() => import('app/pages/auth/sign-in'))
const LoadingPage = lazy(() => import('app/partials/layout/loading'))

const PublicRoute: React.FC = () => {
  const token = useRecoilValue(userTokenState)?.token
  const [userInfoRecoil, setUserInfoRecoil] = useRecoilState(userInfoState)
  const setUserTokenRecoil = useSetRecoilState(userTokenState)
  const userType = userInfoRecoil?.type || ''

  useEffect(() => {
    if (!token) {
      setUserInfoRecoil(undefined)
      setUserTokenRecoil(undefined)
    }
  }, [token])

  return (
    <Switch>
      {PUBLIC_ROUTES.map((item) => {
        const { path, component, exact, role } = item
        if (!role.includes(userType)) {
          return <Route path="/404" exact component={ErrorPage} />
        }
        return <Route key={`public_${path}`} path={path} component={component} exact={exact} />
      })}
      {!token ? <Route path="/sign-in" exact component={SignInPage} /> : <Redirect to="/" />}
      <Route path="/404" exact component={ErrorPage} />
      <Redirect to="/sign-in" />
      <Redirect to="/404" />
    </Switch>
  )
}

const PrivateRoute: React.FC = () => {
  const token = useRecoilValue(userTokenState)?.token
  const userInfoRecoil = useRecoilValue(userInfoState)
  const userType = userInfoRecoil?.type || ''

  if (!token) {
    return <Redirect to="/sign-in" />
  }

  return (
    <Switch>
      {PRIVATE_ROUTES.map((item) => {
        const { path, component, exact, role } = item
        if (!role.includes(userType)) {
          return <Route path="/404" exact component={ErrorPage} />
        }

        return <Route key={`private_${path}`} path={path} component={component} exact={exact} />
      })}
      {/* <Redirect to="/" /> */}
      <Route path="/404" exact component={ErrorPage} />
      <Redirect to="/404" />
    </Switch>
  )
}

const DashboardRoute: React.FC = () => {
  const token = useRecoilValue(userTokenState)?.token
  const userInfoRecoil = useRecoilValue(userInfoState)
  const userType = userInfoRecoil?.type || ''

  if (!token) {
    return <Redirect to="/sign-in" />
  }

  return (
    <DashboardLayout>
      <Switch>
        {DASHBOARD_ROUTES.map((item) => {
          const { path, component, exact, role } = item
          if (!role.includes(userType)) {
            return <Route path="/404" exact component={ErrorPage} />
          }
          return <Route key={`private_${path}`} path={path} component={component} exact={exact} />
        })}
        {/* <Redirect to="/" /> */}
        <Route path="/404" exact component={ErrorPage} />
        <Redirect to="/404" />
      </Switch>
    </DashboardLayout>
  )
}

const SwitchRenderer: React.FC = () => {
  const token = useRecoilValue(userTokenState)?.token
  const userInfoRecoil = useRecoilValue(userInfoState)
  const userType = userInfoRecoil?.type || ''

  const renderPrivateRoute = () => {
    if (userType === 'ADMIN') {
      return (
        <Switch>
          {PRIVATE_ROUTES.map((item) => {
            const { path, component, exact, role } = item
            if (!role.includes(userType)) {
              return <Route path="/404" exact component={ErrorPage} />
            }

            return <Route key={`private_${path}`} path={path} component={component} exact={exact} />
          })}

          {PUBLIC_ROUTES.map((item) => {
            const { path, component, exact, role } = item
            if (!role.includes(userType)) {
              return <Route path="/404" exact component={ErrorPage} />
            }
            return <Route key={`public_${path}`} path={path} component={component} exact={exact} />
          })}
          <DashboardRoute />
        </Switch>
      )
    }
    return <PrivateRoute />
  }

  return (
    <MainRouteWrapper>
      <Switch>{token ? <>{renderPrivateRoute()}</> : <PublicRoute />}</Switch>
    </MainRouteWrapper>
  )
}

const RouteURL: React.FC = () => {
  const language = useRecoilValue(languageState)
  return (
    <IntlProvider locale={language} messages={localeData[language] as Record<string, string>}>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SwitchRenderer />
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default RouteURL
