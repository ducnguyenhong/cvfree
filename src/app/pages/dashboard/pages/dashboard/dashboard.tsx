import { DashboardStyle } from './dashboard.style'

export const Dashboard: React.FC = () => {
  return (
    <DashboardStyle>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-th mr-2" />
            <span className="font-semibold uppercase">Dashboard</span>
          </div>
          <hr />
          <div className="p-5">Body</div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-th mr-2" />
            <span className="font-semibold uppercase">Thao tác nhanh</span>
          </div>
          <hr />
          <div className="py-8 px-10 grid grid-cols-2 gap-x-10 gap-y-8">
            <div className="col-span-1 bg-purple-100 rounded-md px-4 py-4 duration-300 hover:bg-purple-200">
              <i className="fas fa-user-plus block text-2xl text-purple-700 text-center" />
              <span className="block text-center mt-2 text-purple-700 font-semibold">Tạo ứng viên</span>
            </div>
            <div className="col-span-1 bg-green-100 rounded-md px-4 py-4 duration-300 hover:bg-green-200">
              <i className="fas fa-plus-circle block text-2xl text-green-700 text-center" />
              <span className="block text-center mt-2 text-green-700 font-semibold">Tạo nhà tuyển dụng</span>
            </div>
            <div className="col-span-1 bg-red-100 rounded-md px-4 py-4 duration-300 hover:bg-red-200">
              <i className="fas fa-envelope block text-2xl text-red-700 text-center" />
              <span className="block text-center mt-2 text-red-700 font-semibold">Gửi email</span>
            </div>
            <a
              href="https://www.facebook.com/cvfreevn"
              target="_blank"
              rel="noopener noreferrer"
              className="block col-span-1 bg-blue-100 rounded-md px-4 py-4 duration-300 hover:bg-blue-200"
            >
              <i className="fab fa-facebook block text-2xl text-blue-700 text-center" />
              <span className="block text-center mt-2 text-blue-700 font-semibold">Fanpage</span>
            </a>
          </div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-th mr-2" />
            <span className="font-semibold uppercase">Dashboard</span>
          </div>
          <hr />
          <div className="p-5">Body</div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-th mr-2" />
            <span className="font-semibold uppercase">Dashboard</span>
          </div>
          <hr />
          <div className="p-5">Body</div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-th mr-2" />
            <span className="font-semibold uppercase">Dashboard</span>
          </div>
          <hr />
          <div className="p-5">Body</div>
        </div>

        <div className="col-span-1 bg-white shadow-md rounded-md">
          <div className="py-3 px-5 flex items-center">
            <i className="fas fa-th mr-2" />
            <span className="font-semibold uppercase">Dashboard</span>
          </div>
          <hr />
          <div className="p-5">Body</div>
        </div>
      </div>
    </DashboardStyle>
  )
}
