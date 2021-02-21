import { Link } from 'react-router-dom'
import packageJson from '../../../../package.json'

const HomeIntro: React.FC = () => {
  return (
    <div>
      <div>
        <span className="bg-green-500 text-white font-semibold px-4 py-2 rounded-xl mr-3">MỚI</span>
        <span className="font-medium">Phiên bản thử nghiệm {`${packageJson.version}`}</span>
      </div>
      <div className="mt-12">
        <span className="uppercase text-4xl text-green-700 font-bold">Hồ sơ trực tuyến miễn phí</span>
      </div>
      <div className="mt-10 pl-8">
        <div>
          <i className="fas fa-check-circle text-green-600 mr-4"></i>
          <span className="font-semibold text-lg">Tạo hồ sơ cá nhân nhanh chóng</span>
        </div>
        <div className="mt-3">
          <i className="fas fa-check-circle text-green-600 mr-4"></i>
          <span className="font-semibold text-lg">Tìm việc làm siêu tốc</span>
        </div>
      </div>
      <div className="mt-20">
        <Link to="/create-cv" className="px-4 py-3 bg-green-600 mr-8 text-white rounded-md font-semibold">
          Tạo hồ sơ ngay
        </Link>
        <Link to="/abc" className="px-4 py-3 bg-purple-700 text-white rounded-md font-semibold">
          Tìm việc làm
        </Link>
      </div>
    </div>
  )
}

export default HomeIntro
