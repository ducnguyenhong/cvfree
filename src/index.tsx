import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'tailwindcss/tailwind.css'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'react-datepicker/dist/react-datepicker.css'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://59e6e53994464978b0a37074457589da@o750151.ingest.sentry.io/5791541',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
})

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<></>}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
