// import { useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'

import viLanguage from './vi.json'
import enLanguage from './en.json'

interface LanguageProps {
  children: React.ReactElement | React.ReactElement[]
}

const allLanguage = {
  vi: viLanguage,
  en: enLanguage
}

// addLocaleData([...vi, ...en])

const LanguageLayout: React.FC<LanguageProps> = (props) => {
  const { children } = props
  // const locale = useSelector(({ i18n }) => i18n.lang)
  const messages = allLanguage['vi']

  return (
    <IntlProvider locale={'vi'} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default LanguageLayout
