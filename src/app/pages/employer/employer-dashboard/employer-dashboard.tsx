import { WrapperPage } from 'app/partials/layout/wrapper-page'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const EmployerDashboard: React.FC = () => {
  useEffect(() => {
    document.title = `CVFREE | Bảng điều khiển`
  }, [])

  return (
    <WrapperPage title="Bảng điều khiển">
      <div className="grid grid-cols-4 gap-16 mt-52 pb-52 px-20">
        <Link
          to="employer/manage-job"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-600 hover:bg-gray-700 px-6 py-12 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-50">Tin tuyển dụng</span>
          <i className="fas fa-address-card text-5xl block text-center mt-10 text-gray-300"></i>
        </Link>
        <Link
          to="employer/looking-for-candidates"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-600 hover:bg-gray-700 px-6 py-12 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-50">Tìm ứng viên</span>
          <i className="fas fa-search text-5xl block text-center mt-10 text-gray-300"></i>
        </Link>
        <Link
          to="employer/manage-candidate"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-600 hover:bg-gray-700 px-6 py-12 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-50">CV ứng tuyển</span>
          <i className="fas fa-users text-5xl block text-center mt-10 text-gray-300"></i>
        </Link>
        {/* <Link
          to="employer/payment"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-600 hover:bg-gray-700 px-6 py-12 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-50">Nạp thẻ/Thanh toán</span>
          <i className="fas fa-coins text-5xl block text-center mt-10 text-gray-300"></i>
        </Link> */}

        <Link
          to={`employer/company-info`}
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-gray-600 hover:bg-gray-700 px-6 py-12 block duration-300 hover:shadow-xl "
        >
          <span className="uppercase text-md font-bold block text-center text-gray-50">Công ty</span>
          <i className="fas fa-building text-5xl block text-center mt-10 text-gray-300"></i>
        </Link>
      </div>
    </WrapperPage>
  )
}
