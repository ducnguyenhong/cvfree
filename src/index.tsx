import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'tailwindcss/tailwind.css'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'react-datepicker/dist/react-datepicker.css'

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<></>}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
