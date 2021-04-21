import { Link } from 'react-router-dom'
import ImageFeature1 from 'assets/images/img-feature-1.png'
import ImageFeature2 from 'assets/images/img-feature-2.png'
import ImageFeature3 from 'assets/images/img-feature-3.png'
import ImageFeature4 from 'assets/images/img-feature-4.png'
import BgFeature from 'assets/images/bg-feature-home.png'

const FeatureHome: React.FC = () => {
  return (
    <div
      className="home-feature max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 mt-20 py-32"
      style={{ backgroundImage: `url(${BgFeature})` }}
    >
      <div className="text-center mb-16">
        <span className="uppercase font-bold text-4xl text-gray-200">CVFREE CÓ GÌ ?</span>
      </div>
      <div className="px-20">
        <div className="flex items-center">
          <img src={ImageFeature1} alt="feature" className="block w-40 h-40 rounded-full" />
          <div className="ml-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-gray-200">CV Hiện đại</span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">
              Mẫu CV đẹp, hiện đại phù hợp với nhu cầu người sử dụng
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end mt-10">
          <div className="mr-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-right text-gray-200">
              Việc làm siêu tốc
            </span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">
              Tìm kiếm việc làm và liên hệ với nhà tuyển dụng nhanh chóng
            </span>
          </div>
          <img src={ImageFeature2} alt="feature" className="block w-40 h-40 rounded-full" />
        </div>
        <div className="flex items-center mt-10">
          <img src={ImageFeature3} alt="feature" className="block w-40 h-40 rounded-full" />
          <div className="ml-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-gray-200">Bảo mật tuyệt đối</span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">
              Bảo mật an toàn thông tin người sử dụng
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end mt-10">
          <div className="mr-12">
            <span className="mt-4 block text-2xl uppercase font-semibold text-right text-gray-200">
              Hoàn toàn miễn phí
            </span>
            <span className="mt-3 text-lg block text-gray-200 font-medium">Và ở đây, mọi thứ đều là miễn phí</span>
          </div>
          <img src={ImageFeature4} alt="feature" className="block w-40 h-40 rounded-full" />
        </div>
      </div>
      <div className="text-center mt-20">
        <Link
          to="/template-cv"
          className="rounded-md bg-green-600 text-gray-200 px-5 py-3 uppercase font-medium text-lg duration-300 hover:bg-green-700"
        >
          Tạo hồ sơ ngay
        </Link>
      </div>
    </div>
  )
}

export default FeatureHome
