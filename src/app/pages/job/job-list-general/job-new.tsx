import { Link } from 'react-router-dom'
import { slugURL } from 'utils/helper'

const JobNew: React.FC = () => {
  return (
    <div className="bg-green-100">
      <div className="bg-white w-2/3 mx-auto py-40 grid-cols-2 grid gap-y-20">
        <span className="uppercase text-2xl font-semibold block col-span-2 text-center">
          Việc làm hot nhất & Tin tuyển dụng
        </span>

        {/* New */}
        <div className="col-span-1">
          <div className="pl-16 pr-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm mới nhất</span>
              <span className="text-white">Xem thêm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <Link to="/jobs/nhan-vien-thiet-ke.12">
                      <img
                        src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                        alt="logo"
                        className="w-20 h-20"
                      />
                    </Link>
                  </div>
                  <div className="col-span-3">
                    <Link to="/jobs/nhan-vien-thiet-ke.12" className="block">
                      <span className="block font-bold">Nhân viên kế toán</span>
                    </Link>
                    <span className="block">Công ty TNHH ABC</span>
                    <div className="grid-cols-2 grid gap-x-8">
                      <span className="block col-span-1">10 - 15 triệu</span>
                      <span className="block col-span-1">Hà Nội</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Parttime */}
        <div className="col-span-1">
          <div className="pr-16 pl-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm bán thời gian</span>
              <span className="text-white">Xem thêm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Nhân viên kế toán</span>
                    <span className="block">Công ty TNHH ABC</span>
                    <div className="grid-cols-2 grid gap-x-8">
                      <span className="block col-span-1">10 - 15 triệu</span>
                      <span className="block col-span-1">Hà Nội</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Salary */}
        <div className="col-span-1">
          <div className="pl-16 pr-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm lương cao</span>
              <span className="text-white">Xem thêm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Nhân viên kế toán</span>
                    <span className="block">Công ty TNHH ABC</span>
                    <div className="grid-cols-2 grid gap-x-8">
                      <span className="block col-span-1">10 - 15 triệu</span>
                      <span className="block col-span-1">Hà Nội</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Intern */}
        <div className="col-span-1">
          <div className="pr-16 pl-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Tuyển dụng thực tập sinh</span>
              <span className="text-white">Xem thêm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Nhân viên kế toán</span>
                    <span className="block">Công ty TNHH ABC</span>
                    <div className="grid-cols-2 grid gap-x-8">
                      <span className="block col-span-1">10 - 15 triệu</span>
                      <span className="block col-span-1">Hà Nội</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Career */}
        <div className="col-span-1">
          <div className="pl-16 pr-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm theo ngành nghề</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Việc làm Kế toán</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Address */}
        <div className="col-span-1">
          <div className="pr-16 pl-8">
            <div className="flex justify-between items-center bg-blue-500 px-4 py-3">
              <span className="block text-white uppercase">Việc làm theo địa điểm</span>
            </div>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div key={item} className="grid grid-cols-4 gap-x-8 mt-4 border p-2 rounded">
                  <div className="col-span-1">
                    <img
                      src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2021/01/logo-viettel-4-1.jpg"
                      alt="logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="col-span-3">
                    <span className="block">Việc làm tại Hà Nội</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobNew
