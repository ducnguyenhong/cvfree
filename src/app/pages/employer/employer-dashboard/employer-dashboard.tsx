import { Link } from 'react-router-dom'

export const EmployerDashboard: React.FC = () => {
  return (
    <div className="py-60 bg-green-100">
      <div className="grid grid-cols-3 gap-x-16 w-2/3 mx-auto">
        <Link
          to="employer/publish-recruitment"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-purple-800 px-6 py-16 block duration-300 hover:shadow-lg"
        >
          <span className="uppercase text-xl font-bold block text-center text-gray-100">Đăng tin tuyển dụng</span>
          <i className="fas fa-address-card text-5xl block text-center mt-10 text-gray-100"></i>
          <span className="text-justify block mt-10 text-gray-100">
            Tạo bài tin tuyển dụng cho công ty của bạn. Ứng viên sẽ có thể nhìn thấy việc làm từ công ty bạn một cách
            tốt hơn
          </span>
        </Link>
        <Link
          to="employer/looking-for-candidates"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-yellow-700 px-6 py-16 block duration-300 hover:shadow-lg"
        >
          <span className="uppercase text-xl font-bold block text-center text-gray-100">Tìm kiếm ứng viên</span>
          <i className="fas fa-search text-5xl block text-center mt-10 text-gray-100"></i>
          <span className="text-justify block mt-10 text-gray-100">
            Tìm kiếm ứng viên phù hợp với công việc mà bạn đang tuyển dụng một cách nhanh chóng và chính xác
          </span>
        </Link>
        <Link
          to="employer/company-info"
          className="col-span-1 rounded-md overflow-hidden shadow-md bg-green-700 px-6 py-16 block duration-300 hover:shadow-lg"
        >
          <span className="uppercase text-xl font-bold block text-center text-gray-100">Thông tin công ty</span>
          <i className="fas fa-building text-5xl block text-center mt-10 text-gray-100"></i>
          <span className="text-justify block mt-10 text-gray-100">
            Cập nhật thông tin công ty của bạn để tạo sự tin cậy cho ứng viên khi muốn ứng tuyển
          </span>
        </Link>
      </div>
    </div>
  )
}
