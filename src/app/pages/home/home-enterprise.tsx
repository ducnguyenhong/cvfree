import { Link } from 'react-router-dom'
const EnterpriseHome: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64 mt-16 pt-40 pb-32 bg-blue-50">
      <div className="text-center">
        <span className="uppercase font-bold text-3xl">Doanh nghiệp tuyển dụng</span>
      </div>
      <div className="grid grid-cols-4 mt-28 gap-x-10 gap-y-20">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
          return (
            <Link to="/company/abc" className="col-span-1 block" key={index}>
              <img
                src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                alt="logo"
                className="block w-40 h-24 rounded shadow mx-auto"
              />
              <span className="block text-center mt-4 font-semibold">Công ty TNHH ABCDEFGHIJK</span>
            </Link>
          )
        })}
      </div>
      <div className="text-center mt-24">
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
