import RouteURL from 'app/configs/routes/index'
import PrNotify from 'app/partials/pr-notify'

const AppLayout = () => {
  return (
    <div className="App" style={{ fontFamily: `'Quicksand', sans-serif` }}>
      <RouteURL />
      <PrNotify />
    </div>
  )
}

export default AppLayout
