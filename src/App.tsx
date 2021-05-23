import RouteURL from 'app/configs/routes/index'
import PrNotify from 'app/partials/pr-notify'
import { RecoilRoot } from 'recoil'

const AppLayout = () => {
  return (
    <div style={{ fontFamily: `'Quicksand', sans-serif`, backgroundColor: '#EEF0F8' }}>
      <RecoilRoot>
        <RouteURL />
        <PrNotify />
      </RecoilRoot>
    </div>
  )
}

export default AppLayout
