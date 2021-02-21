import EnterpriseHome from './home-enterprise'
import FeatureHome from './home-feature'
import JobHome from './home-job'
import TopHome from './home-top'
import FooterHome from './homt-footer'

interface HomeProps {}

const HomeLayout: React.FC<HomeProps> = (props) => {
  return (
    <div style={{ backgroundColor: '#f9fffa' }}>
      <TopHome />
      <JobHome />
      <FeatureHome />
      <EnterpriseHome />
      <FooterHome />
    </div>
  )
}

export default HomeLayout
