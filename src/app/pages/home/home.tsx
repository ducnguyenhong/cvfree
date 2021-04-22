import { useEffect } from 'react'
import EnterpriseHome from './home-enterprise'
import FeatureHome from './home-feature'
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
      <EnterpriseHome />
    </HomeStyle>
  )
}

export default HomeLayout
