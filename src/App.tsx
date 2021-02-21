import RouteURL from 'app/configs/routes/index'
import PrNotify from 'app/partials/pr-notify'

const AppLayout = () => {
  return (
    <div className="App">
      <RouteURL />
      <PrNotify />
    </div>
  )
}

export default AppLayout
