import './sidebar.css'
import { Link, useLocation } from 'react-router-dom'

interface MenuType {
  route?: string
  title: string
  icon?: string
  type: 'menu' | 'section'
}

const ListMenu: MenuType[] = [
  {
    route: '/dashboard',
    title: 'Bảng điều khiển',
    icon: 'fas fa-home',
    type: 'menu'
  },
  {
    title: 'CV',
    type: 'section'
  },
  {
    route: '/dashboard/cvs',
    title: 'Danh sách CV',
    icon: 'fas fa-paste',
    type: 'menu'
  },
  {
    title: 'Việc làm',
    type: 'section'
  },
  {
    route: '/dashboard/jobs',
    title: 'Danh sách việc làm',
    icon: 'fas fa-briefcase',
    type: 'menu'
  },
  {
    title: 'Công ty',
    type: 'section'
  },
  {
    route: '/dashboard/companies',
    title: 'Danh sách công ty',
    icon: 'fas fa-building',
    type: 'menu'
  },
  {
    title: 'Người dùng',
    type: 'section'
  },
  {
    route: '/dashboard/users',
    title: 'Tất cả người dùng',
    icon: 'fas fa-users',
    type: 'menu'
  },
  {
    route: '/dashboard/candidates',
    title: 'Ứng viên',
    icon: 'fas fa-user-edit',
    type: 'menu'
  },
  {
    route: '/dashboard/employers',
    title: 'Nhà tuyển dụng',
    icon: 'fas fa-user-tag',
    type: 'menu'
  },
  {
    title: 'Yêu cầu/Khiếu nại',
    type: 'section'
  },
  {
    route: '/dashboard/request-update-company',
    title: 'Chỉnh sửa công ty',
    icon: 'fas fa-align-left',
    type: 'menu'
  },
  {
    route: '/dashboard/report-job',
    title: 'Tin tuyển dụng',
    icon: 'fas fa-exclamation-triangle',
    type: 'menu'
  },

  {
    title: 'Cài đặt',
    type: 'section'
  },
  {
    route: '/dashboard/send-email',
    title: 'Gửi email',
    icon: 'fas fa-envelope',
    type: 'menu'
  },
  {
    route: '/dashboard/feedbacks',
    title: 'Góp ý',
    icon: 'fas fa-comment',
    type: 'menu'
  }
]

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const currentRoute = location.pathname

  return (
    <div
      className="h-screen bg-gray-800 fixed overflow-y-auto pb-20 left-0 duration-300"
      style={{ width: 270 }}
      id="scrollbar"
    >
      <div className="sidebar-content py-5">
        {ListMenu &&
          ListMenu.length > 0 &&
          ListMenu.map((item) => {
            const { route, title, type, icon } = item
            if (type === 'section') {
              return (
                <div key={title} className="flex items-center mt-9 px-5">
                  <span className="text-gray-500 uppercase text-sm">{title}</span>
                </div>
              )
            }
            return (
              <Link
                to={route || '/dashboard'}
                key={title}
                className={`${
                  currentRoute === route ? 'bg-gray-900' : 'hover:bg-gray-900'
                } flex px-5 py-2.5 items-center mb-2 duration-300`}
              >
                <i className={`${icon} mr-2 text-gray-300 text-sm`} />
                <span className="text-gray-300">{title}</span>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
