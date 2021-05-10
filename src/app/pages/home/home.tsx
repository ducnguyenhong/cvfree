import { useEffect } from 'react'
import EnterpriseHome from './home-enterprise'
import FeatureHome from './home-feature'
import TopHome from './home-top'
import { HomeStyle } from './home.style'
import { useIntl } from 'react-intl'

interface HomeProps {}

const HomeLayout: React.FC<HomeProps> = () => {
  const intl = useIntl()

  useEffect(() => {
    document.title = `CVFREE | ${intl.formatMessage({ id: 'HOME.CVFREE' })}`
  }, [])

  return (
    <HomeStyle className="bg-white">
      <TopHome />
      <FeatureHome />
      <EnterpriseHome />
    </HomeStyle>
  )
}

export default HomeLayout
