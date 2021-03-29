import PrDropdown from 'app/partials/pr-dropdown'
import { DataFormOfWork, DataRecruitmentPosition, DataExperience, DataAnother } from 'constants/data-employer'
import { DataGender } from 'constants/data-common'
import PrSearch from 'app/partials/pr-component/pr-search'
import { Link } from 'react-router-dom'

export const EmployerLookingForCandidates: React.FC = () => {
  return (
    <div className="bg-green-100">
      <div className="pt-40 w-2/3 mx-auto bg-white px-10">
        <div className="filter grid-cols-4 grid gap-8">
          <div className="col-span-1">
            <PrSearch labelSearch="Tìm kiếm" placeholder="Vị trí ứng tuyển" />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Giới tính" options={DataGender} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Năm sinh" options={DataGender} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Hình thức làm việc" isMulti options={DataFormOfWork} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Ngành nghề" isMulti options={DataRecruitmentPosition} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Kinh nghiệm làm việc" isMulti options={DataExperience} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Địa điểm" isMulti options={DataExperience} />
          </div>
          <div className="col-span-1">
            <PrDropdown label="Bộ lọc khác" isMulti options={DataAnother} />
          </div>
        </div>

        <div className="mt-20">
          <span className="block uppercase text-2xl font-semibold text-center">Kết quả tìm kiếm ứng viên</span>
          <div className="mt-24">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
              return (
                <div key={item} className="mt-10 block">
                  <div className="grid grid-cols-4 gap-x-8 pb-10">
                    <div className="col-span-1">
                      <Link to="/" className="block">
                        <img
                          src="http://localhost:1112/static/media/logo.f26dbc28.png"
                          alt="avatar"
                          className="rounded-full overflow-hidden w-28 h-28 block mx-auto"
                        />
                      </Link>
                    </div>
                    <div className="col-span-3">
                      <Link to="/" className="block">
                        <span className="block text-xl font-bold">Nguyễn T...</span>
                      </Link>
                      <span className="block">Nữ</span>
                      <span className="block">26 tuổi</span>
                      <span className="block">Vị trí ứng tuyển: Nhân Viên Kế Toán</span>
                      <span className="block">Địa điểm: Hà Nội</span>
                      <span className="block">Đã có kinh nghiệm làm việc</span>
                    </div>
                  </div>
                  <hr />
                </div>
              )
            })}
          </div>
        </div>

        <div className="pb-60 flex justify-center mt-12">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              3
            </a>
            <a
              href="#"
              className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              4
            </a>
            <a
              href="#"
              className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              5
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
