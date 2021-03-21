import { AvatarUser } from 'app/partials/image-ratio/user-avatar'
import Button from 'app/partials/pr-button'
import { userInfoState, userTokenState } from 'app/states/user-info-state'
import Logo from 'assets/images/logo.png'
import { languageList } from 'constants/data-language'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const NavbarHome: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)
  const history = useHistory()
  const languageRef = useRef<HTMLDivElement>(null)
  const dialogUserRef = useRef<HTMLDivElement>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showLangugage, setShowLanguage] = useState(false)
  const setUserInfoRecoil = useSetRecoilState(userInfoState)
  const setUserTokenRecoil = useSetRecoilState(userTokenState)
  const language: string = localStorage.getItem('i18n-language') || 'vi'
  const helloName = userInfo?.fullname
    ? userInfo.fullname.split(' ')[userInfo.fullname.split.length]
    : userInfo?.username

  const onSignOut = useCallback(() => {
    setShowUserDialog(false)
    setUserInfoRecoil(undefined)
    setUserTokenRecoil(undefined)
    // history.push('/sign-in')
  }, [])

  const onChangeLanguage = useCallback((lang: string) => {
    localStorage.setItem('i18n-language', lang)
    setShowLanguage(false)
    window.location.reload()
  }, [])

  const useOutsideDialog = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const onClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowUserDialog(false)
        }
      }
      document.addEventListener('mousedown', onClickOutside)
      return () => {
        document.removeEventListener('mousedown', onClickOutside)
      }
    }, [ref])
  }

  const useOutsideLanguage = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const onClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowLanguage(false)
        }
      }
      document.addEventListener('mousedown', onClickOutside)
      return () => {
        document.removeEventListener('mousedown', onClickOutside)
      }
    }, [ref])
  }

  useOutsideLanguage(languageRef)
  useOutsideDialog(dialogUserRef)

  return (
    <div className="w-full py-2 z-50 shadow-md fixed top-0 left-0 bg-white">
      <nav>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-40">
          <div className="relative flex items-center justify-between" style={{ height: 60 }}>
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
                    className="text-gray-500 cursor-pointer px-3 py-2 text-md font-semibold hover:text-gray-700 duration-300"
                  >
                    Trang chủ
                  </Link>
                  <Link
                    to="/sample-cv"
                    className="text-gray-500 cursor-pointer px-3 py-2 text-md font-semibold hover:text-gray-700 duration-300"
                  >
                    Mẫu CV
                  </Link>
                  <Link
                    to="/jobs-new"
                    className="text-gray-500 cursor-pointer px-3 py-2 text-md font-semibold hover:text-gray-700 duration-300"
                  >
                    Việc làm mới
                  </Link>
                  <Link
                    to="/about-us"
                    className="text-gray-500 cursor-pointer px-3 py-2 text-md font-semibold hover:text-gray-700 duration-300"
                  >
                    Về chúng tôi
                  </Link>
                  <Link
                    to="/employer"
                    className="uppercase rounded-md bg-purple-50 text-purple-700 cursor-pointer px-3 py-2 text-md font-semibold hover:bg-green-200 duration-300"
                  >
                    Nhà tuyển dụng
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Language */}
              <div
                ref={languageRef}
                className={`ml-8 px-4 py-2 cursor-pointer relative rounded-md hover:bg-gray-100 duration-300 ${
                  showLangugage && 'bg-gray-100'
                }`}
              >
                {languageList &&
                  languageList.length > 0 &&
                  languageList.map((item) => {
                    const { title, value, icon } = item
                    if (value === language) {
                      return (
                        <div
                          key={`lang_${item.value}`}
                          onClick={() => setShowLanguage(!showLangugage)}
                          className="flex items-center"
                        >
                          <img src={icon} className="block mr-3 w-5 h-5 rounded overflow-hidden" alt="lang" />

                          <span className="whitespace-nowrap">{title}</span>
                        </div>
                      )
                    }
                    return null
                  })}
                {/* Dialog language */}
                {showLangugage && (
                  <div className="dialog-user rounded-lg overflow-hidden origin-top-right absolute right-0 top-16 shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-48 py-3">
                    {languageList &&
                      languageList.length > 0 &&
                      languageList.map((item) => {
                        const { titleSelect, value, icon } = item
                        return (
                          <div
                            key={`lang_list_${item.value}`}
                            className={`flex px-8 py-2.5 duration-300 hover:bg-gray-100 ${
                              value === language && 'bg-gray-100'
                            }`}
                            onClick={() => onChangeLanguage(value)}
                          >
                            <img src={icon} className="block mr-3 w-5 h-5 rounded overflow-hidden" alt="lang" />
                            <span className="whitespace-nowrap">{titleSelect}</span>
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="ml-5 relative" ref={dialogUserRef}>
                {!userInfo ? (
                  <div className="flex items-center">
                    <Link
                      to="/sign-in"
                      className="text-white rounded-xl bg-blue-500 shadow-lg block hover:bg-blue-600 duration-300 px-4 py-1.5 text-md font-semibold mr-5"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="sign-up"
                      className="text-blue-600 rounded-2xl bg-gray-50 shadow-lg block hover:bg-gray-100 duration-300 px-4 py-1.5 text-md font-semibold"
                    >
                      Đăng ký
                    </Link>
                  </div>
                ) : (
                  <div>
                    <span
                      className={`flex cursor-pointer px-3 py-1 rounded-lg items-center hover:bg-gray-100 duration-300 ${
                        showUserDialog && 'bg-gray-100'
                      }`}
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={() => setShowUserDialog(!showUserDialog)}
                    >
                      <div className="flex items-center mr-4">
                        <span>Xin chào</span>
                        <span className="ml-2 font-semibold">{helloName}</span>
                      </div>
                      <AvatarUser classNameDiv="w-10 h-10" src={userInfo.avatar} gender={userInfo.gender} />
                    </span>
                    {showUserDialog && (
                      <div className="rounded origin-top-right absolute right-0 mt-8 w-96 shadow-lg bg-white">
                        <div className="bg-indigo-700 flex p-4">
                          <AvatarUser classNameDiv="w-16 h-16" src={userInfo.avatar} gender={userInfo.gender} />
                          <div className="ml-4">
                            <span className="text-white text-xl">Nguyễn Đức (ID: 1)</span>
                            <div className="flex items-center text-white">
                              <i className="fas fa-user-circle text-white mr-2"></i>
                              <span className="text-white text-md">ducnh</span>
                            </div>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          className="px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <i className="fas fa-info-circle mr-2"></i>
                          <span className="text-md">Your Profile</span>
                        </Link>
                        <Link
                          to="/create-cv"
                          className="px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setShowUserDialog(false)}
                        >
                          <i className="fas fa-info-circle mr-2"></i>
                          <span className="text-md">Create CV</span>
                        </Link>
                        <div onClick={onSignOut}>
                          <Button type="primary" className="">
                            <i className="fas fa-sign-out-alt "></i>
                            <span className="text-gray-900 text-md">Logout</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
        </div>
      </nav>
    </div>
  )
}

export default NavbarHome
