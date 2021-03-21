import RouteURL from 'app/configs/routes/index'
import PrNotify from 'app/partials/pr-notify'
import { RecoilRoot } from 'recoil'

const AppLayout = () => {
  return (
    <div className="App" style={{ fontFamily: `'Quicksand', sans-serif` }}>
      <RecoilRoot>
        <RouteURL />
        <PrNotify />
      </RecoilRoot>
    </div>
  )
}

export default AppLayout
