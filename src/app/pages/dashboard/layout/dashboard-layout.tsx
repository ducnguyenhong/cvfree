import { DashboardStyle } from './dashboard-layout.style'
import { Footer } from './footer'
import { Sidebar } from './sidebar'

export const DashboardLayout: React.FC = (props) => {
  return (
    <DashboardStyle>
      <div className="flex">
        <Sidebar />
        <div className="w-full duration-300" style={{ marginLeft: 270, width: '-webkit-fill-available' }}>
          <div className="content px-6 py-6">
            <div className="">{props.children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </DashboardStyle>
  )
}
