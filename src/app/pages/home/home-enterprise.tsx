import { Link } from 'react-router-dom'
const EnterpriseHome: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 mt-20 py-20 bg-gray-200">
      <div className="text-center">
        <span className="uppercase font-bold text-4xl">Doanh nghiệp tuyển dụng trên CVFREE</span>
      </div>
      <div className="grid grid-cols-2 mt-12 gap-10">
        <div className="col-span-1 text-center mb-10">
          <i className="block text-5xl text-green-600 fas fa-address-card"></i>
          <span className="mt-4 block text-3xl uppercase font-semibold">CV Hiện đại</span>
          <span className="mt-3 text-xl block">Mẫu CV đẹp, hiện đại phù hợp với người sử dụng</span>
        </div>

        <div className="col-span-1 text-center mb-10">
          <i className="block text-5xl text-green-600 fas fa-briefcase"></i>
          <span className="mt-4 block text-3xl uppercase font-semibold">Việc làm siêu tốc</span>
          <span className="mt-3 text-xl block">Mẫu CV đẹp, hiện đại phù hợp với người sử dụng</span>
        </div>

        <div className="col-span-1 text-center mb-10">
          <i className="block text-5xl text-green-600 fas fa-shield-alt"></i>
          <span className="mt-4 block text-3xl uppercase font-semibold">Bảo mật tuyệt đối</span>
          <span className="mt-3 text-xl block">Mẫu CV đẹp, hiện đại phù hợp với người sử dụng</span>
        </div>

        <div className="col-span-1 text-center mb-10">
          <i className="block text-5xl text-green-600 fas fa-rocket"></i>
          <span className="mt-4 block text-3xl uppercase font-semibold">Hoàn toàn miễn phí</span>
          <span className="mt-3 text-xl block">Mẫu CV đẹp, hiện đại phù hợp với người sử dụng</span>
        </div>
      </div>
      <div className="text-center mt-10">
        <Link
          to="/"
          className="rounded-md bg-purple-600 text-white px-5 py-3 uppercase font-medium text-lg duration-300 hover:bg-purple-700"
        >
          Tuyển dụng ngay
        </Link>
      </div>
    </div>
  )
}

export default EnterpriseHome
