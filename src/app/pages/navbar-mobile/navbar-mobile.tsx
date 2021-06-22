import { AvatarUser } from 'app/partials/image-ratio/user-avatar'
import Button from 'app/partials/pr-button'
import { userInfoState, userTokenState } from 'app/states/user-info-state'
import Logo from 'assets/images/logo.png'
import { languageList } from 'constants/data-language'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { languageState } from 'app/states/language-state'
import { showNotify } from 'app/partials/pr-notify'

interface DialogListType {
  route: string
  title: string
  icon: string
  isActive: boolean
}

export const NavbarMobile: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)
  const userType = userInfo?.type || ''
  const intl = useIntl()
  const history = useHistory()
  const languageRef = useRef<HTMLDivElement>(null)
  const dialogUserRef = useRef<HTMLDivElement>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showLangugage, setShowLanguage] = useState(false)
  const setUserInfoRecoil = useSetRecoilState(userInfoState)
  const setUserTokenRecoil = useSetRecoilState(userTokenState)
  const [language, setLanguage] = useRecoilState(languageState)

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const DialogList: DialogListType[] = [
    {
      route: '/profile',
      title: 'Thông tin cá nhân',
      icon: 'fas fa-info-circle',
      isActive: !!['ADMIN', 'EMPLOYER', 'USER'].includes(userType)
    },
    {
      route: '/manage-cv',
      title: 'Quản lý CV',
      icon: 'fas fa-paste',
      isActive: !!['USER'].includes(userType)
    },
    {
      route: '/manage-apply',
      title: 'Quản lý ứng tuyển',
      icon: 'fas fa-briefcase',
      isActive: !!['USER'].includes(userType)
    },
    {
      route: '/employer',
      title: 'Bảng điều khiển',
      icon: 'fas fa-tasks',
      isActive: !!['EMPLOYER'].includes(userType)
    },
    {
      route: '/dashboard',
      title: 'Bảng điều khiển',
      icon: 'fas fa-tasks',
      isActive: !!['ADMIN'].includes(userType)
    },
    {
      route: '/change-password',
      title: 'Đổi mật khẩu',
      icon: 'fas fa-lock',
      isActive: true
    }
  ]

  const helloName = userInfo?.fullname
    ? userInfo.fullname.split(' ')[userInfo.fullname.split(' ').length - 1]
    : userInfo?.username

  const onSignOut = useCallback(() => {
    history.push('/')
    showNotify.success(intl.formatMessage({ id: 'AUTH.LOGOUT_SUCCESS' }))
    setShowUserDialog(false)
    setUserInfoRecoil(undefined)
    setUserTokenRecoil(undefined)
  }, [])

  const onChangeLanguage = useCallback((lang: string) => {
    setLanguage(lang)
    setShowLanguage(false)
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

  const renderSpecialButton = () => {
    let title = 'NAVBAR.EMPLOYER'
    let route = '/employer-intro'

    if (userInfo?.type === 'USER') {
      title = 'NAVBAR.MANAGE_CV'
      route = '/manage-cv'
    }
    if (userInfo?.type === 'EMPLOYER') {
      title = 'NAVBAR.DASHBOARD'
      route = '/employer'
    }
    if (userInfo?.type === 'ADMIN') {
      title = 'NAVBAR.DASHBOARD'
      route = '/dashboard'
    }
    return (
      <Link
        to={route}
        className="uppercase rounded-md bg-purple-50 text-purple-700 cursor-pointer whitespace-nowrap px-3 py-2 lg:text-lg xl:text-base font-semibold hover:bg-purple-700 hover:text-white duration-300"
      >
        {intl.formatMessage({ id: title })}
      </Link>
    )
  }

  return (
    <div className="w-full py-2 z-50 shadow-md fixed top-0 left-0 bg-gray-800 relative">
      <nav>
        <div className="max-w-8xl mx-auto px-8 xl:px-20 2xl:px-40">
          <div className="relative flex items-center justify-between" style={{ height: 60 }}>
            <div className="flex-1 flex items-center lg:justify-center lg:items-stretch justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img className="block h-10 w-auto" src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 items-center pr-2 hidden lg:flex lg:static lg:inset-auto lg:ml-6 lg:pr-0">
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

                          <span className="whitespace-nowrap font-medium text-gray-600">{title}</span>
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
                            <span className="whitespace-nowrap font-medium text-gray-600">{titleSelect}</span>
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
                      className="text-white whitespace-nowrap rounded-xl bg-blue-500 shadow-lg block hover:bg-blue-600 duration-300 px-4 py-1.5 lg:text-lg xl:text-base font-semibold mr-5"
                    >
                      {intl.formatMessage({ id: 'NAVBAR.SIGN_IN' })}
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-blue-600 whitespace-nowrap rounded-2xl bg-gray-50 shadow-lg block hover:bg-gray-100 duration-300 px-4 py-1.5 lg:text-lg xl:text-base font-semibold"
                    >
                      {intl.formatMessage({ id: 'NAVBAR.SIGN_UP' })}
                    </Link>
                  </div>
                ) : (
                  <div className="relative">
                    <div
                      className={`flex cursor-pointer px-3 py-1 rounded-lg items-center hover:bg-gray-100 duration-300 ${
                        showUserDialog && 'bg-gray-100'
                      }`}
                      id="user-menu"
                      aria-haspopup="true"
                      onClick={() => setShowUserDialog(!showUserDialog)}
                    >
                      <div className="flex items-center mr-4">
                        <span>{intl.formatMessage({ id: 'NAVBAR.HELLO' })}</span>
                        <span className="ml-2 font-semibold">{helloName}</span>
                      </div>
                      <AvatarUser classNameDiv="w-10 h-10" src={userInfo.avatar} gender={userInfo.gender} />
                    </div>
                    {showUserDialog && (
                      <div className="rounded absolute overflow-hidden right-0 top-16 w-96 shadow-lg bg-white">
                        <div className="bg-indigo-800 flex p-4 items-center">
                          <AvatarUser classNameDiv="w-16 h-16" src={userInfo.avatar} gender={userInfo.gender} />
                          <div className="ml-4">
                            <span className="text-white text-lg">{userInfo.fullname || 'Ứng viên'}</span>
                            <div className="flex items-center text-white">
                              <i className="fas fa-user-circle text-white text-lg mr-2"></i>
                              <span className="text-gray-300">{userInfo.username}</span>
                            </div>
                          </div>
                        </div>
                        {DialogList &&
                          DialogList.length > 0 &&
                          DialogList.map((item) => {
                            const { route, title, icon, isActive } = item
                            if (!isActive) {
                              return null
                            }
                            return (
                              <Link
                                onClick={() => setShowUserDialog(false)}
                                key={route}
                                to={route}
                                className="px-6 py-4 text-lg text-gray-700 hover:bg-gray-100 flex items-center"
                              >
                                <i className={`${icon} mr-2`}></i>
                                <span className="lg:text-lg xl:text-base">{title}</span>
                              </Link>
                            )
                          })}
                        <div className="px-6 mb-4 mt-3">
                          <Button type="danger" onClick={onSignOut}>
                            <i className="fas fa-sign-out-alt mr-2"></i>
                            <span className="text-white lg:text-lg xl:text-base">
                              {intl.formatMessage({ id: 'AUTH.LOGOUT' })}
                            </span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                <i className="fas fa-bars text-gray-300 text-3xl" />
              </div>
              <div className="cursor-pointer ml-7">
                <i className="fas fa-ellipsis-v text-gray-300 text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`absolute h-screen z-50 bg-gray-600 top-0 duration-300 ${showMenu ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: showMenu ? 250 : 0 }}
      >
        <div className="w-full">
          <Link
            to="/"
            className="block text-gray-500 whitespace-nowrap cursor-pointer px-3 py-2 lg:text-lg xl:text-base font-semibold hover:text-gray-700 duration-300"
          >
            {intl.formatMessage({ id: 'NAVBAR.HOME' })}
          </Link>
          <Link
            to="/template-cv"
            className="block text-gray-500 whitespace-nowrap cursor-pointer px-3 py-2 lg:text-lg xl:text-base font-semibold hover:text-gray-700 duration-300"
          >
            {intl.formatMessage({ id: 'NAVBAR.CV_TEMPLATE' })}
          </Link>
          <Link
            to="/jobs"
            className="block text-gray-500 whitespace-nowrap cursor-pointer px-3 py-2 lg:text-lg xl:text-base font-semibold hover:text-gray-700 duration-300"
          >
            {intl.formatMessage({ id: 'NAVBAR.NEW_JOB' })}
          </Link>
          <Link
            to="/about-us"
            className="block text-gray-500 whitespace-nowrap cursor-pointer px-3 py-2 lg:text-lg xl:text-base font-semibold hover:text-gray-700 duration-300"
          >
            {intl.formatMessage({ id: 'NAVBAR.ABOUT_US' })}
          </Link>

          {renderSpecialButton()}
        </div>
      </div>
    </div>
  )
}
