import { Link } from 'react-router-dom'
import { BreadCrumb } from 'app/pages/bread-crumb'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'

export const EmployerDashboard: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)

  return (
    <div className="py-32 w-2/3 mx-auto">
      <BreadCrumb title="Bảng điều khiển" />
      <div className="grid grid-cols-4 gap-16 mt-40">
        <Link
          to="employer/publish-recruitment"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-200 px-6 py-16 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-600">Quản lý tin tuyển dụng</span>
          <i className="fas fa-address-card text-5xl block text-center mt-10 text-gray-500"></i>
        </Link>
        <Link
          to="employer/looking-for-candidates"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-200 px-6 py-16 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-600">Tìm kiếm ứng viên</span>
          <i className="fas fa-search text-5xl block text-center mt-10 text-gray-500"></i>
        </Link>
        <Link
          to="employer/manage-candidate"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-200 px-6 py-16 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-600">Quản lý CV ứng viên</span>
          <i className="fas fa-users text-5xl block text-center mt-10 text-gray-500"></i>
        </Link>
        {/* <Link
          to="employer/payment"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-200 px-6 py-16 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-600">Nạp thẻ/Thanh toán</span>
          <i className="fas fa-coins text-5xl block text-center mt-10 text-gray-500"></i>
        </Link> */}

        <Link
          to={`employer/company-info`}
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-200 px-6 py-16 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-600">Thông tin công ty</span>
          <i className="fas fa-building text-5xl block text-center mt-10 text-gray-500"></i>
        </Link>
      </div>
    </div>
  )
}
