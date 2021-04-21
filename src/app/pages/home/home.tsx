import { useEffect } from 'react'
import EnterpriseHome from './home-enterprise'
import FeatureHome from './home-feature'
import JobHome from './home-job'
import TopHome from './home-top'
import { HomeStyle } from './home.style'

interface HomeProps {}

const HomeLayout: React.FC<HomeProps> = () => {
  useEffect(() => {
    document.title = 'CVFREE | Hồ sơ miễn phí trực tuyến'
  }, [])

  return (
    <HomeStyle className="bg-white">
      <TopHome />
      <FeatureHome />
      <JobHome />

      <EnterpriseHome />
    </HomeStyle>
  )
}

export default HomeLayout
