import { Link } from 'react-router-dom'
import Button from 'app/partials/pr-button'
import Logo from 'assets/images/logo.png'
import { useState } from 'react'

const NavbarHome: React.FC = () => {
  const [showUserDialog, setShowUserDialog] = useState(false)
  return (
    <div className="w-full py-2 z-50 shadow-md fixed top-0 left-0 bg-white">
      <nav>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-64">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                {/*
      Heroicon name: menu

      Menu open: "hidden", Menu closed: "block"
    */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open. */}
                {/*
      Heroicon name: x

      Menu open: "block", Menu closed: "hidden"
    */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img className="block h-16 w-auto" src={Logo} alt="Logo" />
                </Link>
                {/* <img className="hidden lg:block h-8 w-auto" src={Logo} alt="Workflow" /> */}
              </div>
              <div className="hidden sm:flex sm:ml-12 items-center">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300  hover:text-white" */}
                  <Link
                    to="/"
                    className="text-gray-500 cursor-pointer px-3 py-2 text-lg font-semibold hover:text-gray-700 duration-300"
                  >
                    Trang chủ
                  </Link>
                  <Link
                    to="/sample-cv"
                    className="text-gray-500 cursor-pointer px-3 py-2 text-lg font-semibold hover:text-gray-700 duration-300"
                  >
                    Mẫu CV
                  </Link>
                  <Link
                    to="/jobs-new"
                    className="text-gray-500 cursor-pointer px-3 py-2 text-lg font-semibold hover:text-gray-700 duration-300"
                  >
                    Việc làm mới
                  </Link>
                  <Link
                    to="/about-us"
                    className="text-gray-500 cursor-pointer px-3 py-2 text-lg font-semibold hover:text-gray-700 duration-300"
                  >
                    Về chúng tôi
                  </Link>
                  <Link
                    to="/employer"
                    className="uppercase rounded-md bg-green-100 text-green-700 cursor-pointer px-3 py-2 text-lg font-semibold hover:bg-green-200 duration-300"
                  >
                    Nhà tuyển dụng
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Link
                    to="/sign-in"
                    className="text-white rounded-2xl bg-green-600 shadow-lg block hover:bg-green-500 duration-300 px-4 py-2 text-lg font-semibold mr-5"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="sign-up"
                    className="text-green-600 rounded-2xl bg-gray-50 shadow-lg block hover:bg-gray-100 duration-300 px-4 py-2 text-lg font-semibold"
                  >
                    Đăng ký
                  </Link>
                  {/* <button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                    onClick={() => setShowUserDialog(!showUserDialog)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button> */}
                </div>
                {showUserDialog && (
                  <div className="rounded origin-top-right absolute right-0 mt-8 w-96 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="bg-indigo-700 flex p-4">
                      <img
                        className="rounded-full w-16"
                        src="https://cms-staging.ekidpro.com/static/media/default-avatar.3413aef6.svg"
                        alt="user avtar"
                      />
                      <div className="ml-4">
                        <span className="text-white text-xl">Nguyễn Đức (ID: 1)</span>
                        <div className="flex items-center text-white">
                          <i className="fas fa-user-circle text-white mr-2"></i>
                          <span className="text-white text-lg">ducnh</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/profile" className="px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <i className="fas fa-info-circle mr-2"></i>
                      <span className="text-lg">Your Profile</span>
                    </Link>
                    <Link
                      to="/create-cv"
                      className="px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <i className="fas fa-info-circle mr-2"></i>
                      <span className="text-lg">Create CV</span>
                    </Link>
                    <Link to="/login">
                      <Button type="primary" className="">
                        <i className="fas fa-sign-out-alt text-white"></i>
                        <span className="text-white text-lg">Logout</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  */}
        <div className="hidden sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300  hover:text-white" */}
            <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
              Dashboard
            </a>
            <a href="#" className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Team
            </a>
            <a href="#" className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Projects
            </a>
            <a href="#" className="text-gray-300  hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarHome
