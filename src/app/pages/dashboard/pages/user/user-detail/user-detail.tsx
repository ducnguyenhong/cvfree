import { TabControl, TabContent } from 'app/partials/tabs/tabs'
import { PortletBody, Portlet, PortletHeader } from 'app/partials/portlet'
import { TabCv } from './user-detail-tabs/tab-cv'
import { TabInfo } from './user-detail-tabs/tab-info'
import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { get } from 'lodash'
import Cookies from 'js-cookie'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseUserDetail } from 'models/response-api'
import { Gender } from 'app/partials/layout/gender'
import { UserInfo } from 'models/user-info'
import { showNotify } from 'app/partials/pr-notify'
import { List } from 'react-content-loader'
import { ImageRatio } from 'app/partials/image-ratio/image-ratio'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { userDetailState } from 'app/states/dashboard/user-detail-state'
import { TabApply } from './user-detail-tabs/tab-applies'
import { TabCandidate } from './user-detail-tabs/tab-candidate'
import { TabJob } from './user-detail-tabs/tab-job'
import { TabUpdateInfo } from './user-detail-tabs/tab-update-info'
import { refreshUserDetailState } from 'app/states/dashboard/refresh-user-info'

export const UserDetail: React.FC = () => {
  const match = useRouteMatch()
  const userId = get(match.params, 'id')
  const [userDetail, setUserDetail] = useState<UserInfo | null | undefined>(undefined)
  const [refreshUserDetail, setRefreshUserDetail] = useRecoilState(refreshUserDetailState)
  const setUserDetailState = useSetRecoilState(userDetailState)

  useEffect(() => {
    document.title = `CVFREE | Chi tiết người dùng`
  }, [])

  useEffect(() => {
    refreshUserDetail && callApiUserInfo()
  }, [refreshUserDetail])

  const callApiUserInfo = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/users/${userId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseUserDetail>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        refreshUserDetail && setRefreshUserDetail(false)
        setUserDetail(data.userDetail)
        setUserDetailState(data.userDetail)
      })
      .catch((e) => {
        refreshUserDetail && setRefreshUserDetail(false)
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (userId) {
      callApiUserInfo()
    }
  }, [userId])

  if (!userDetail) {
    return <List />
  }

  const arrayTab = [
    {
      title: 'Thông tin',
      icon: 'fas fa-th-large',
      route: 'info',
      component: <TabInfo />,
      isActive: true
    },
    {
      title: 'Chỉnh sửa thông tin',
      icon: 'fas fa-edit',
      route: 'update-info',
      component: <TabUpdateInfo />,
      isActive: true
    },
    {
      title: 'Danh sách CV',
      icon: 'fas fa-copy',
      route: 'cvs',
      component: <TabCv />,
      isActive: !!(userDetail?.type === 'USER')
    },
    {
      title: 'Danh sách ứng tuyển',
      icon: 'fas fa-briefcase',
      route: 'applies',
      component: <TabApply />,
      isActive: !!(userDetail?.type === 'USER')
    },
    {
      title: 'Danh sách tin tuyển dụng',
      icon: 'fas fa-briefcase',
      route: 'jobs',
      component: <TabJob />,
      isActive: !!(userDetail?.type === 'EMPLOYER')
    },
    {
      title: 'Danh sách ứng viên đã duyệt',
      icon: 'fas fa-users',
      route: 'candidates',
      component: <TabCandidate />,
      isActive: !!(userDetail?.type === 'EMPLOYER')
    }
  ]

  const { avatar, fullname, gender, username, id, phone, email, status, type } = userDetail

  return (
    <div className="grid grid-cols-4 gap-x-8">
      <div className="col-span-4 lg:col-span-1 mb-8 lg:mb-0">
        <Portlet>
          <PortletHeader title="Thông tin người dùng" />
          <PortletBody>
            <div className="grid grid-cols-4 gap-x-6">
              <div className="col-span-1 mb-3 md:px-2 lg:col-span-4 xl:col-span-1 lg:px-6 xl:px-0 lg:mb-3">
                <ImageRatio src={avatar} />
              </div>
              <div className="col-span-3 lg:col-span-4 xl:col-span-3 flex items-center">
                <div>
                  <span className="block text-lg font-semibold">
                    {fullname} <Gender gender={gender} className="ml-2" />
                    <span className="ml-3">
                      <i
                        className={`fas text-lg ${
                          status === 'ACTIVE' ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'
                        }`}
                      ></i>
                    </span>
                  </span>
                  <div className="flex items-center mt-2 opacity-70">
                    <i className="fas fa-user-circle mr-1"></i>
                    <span>{username}</span>
                  </div>
                  <div className="flex items-center mt-3">
                    <span className="block bg-blue-500 rounded-md px-4 py-1 text-white mr-5 font-medium">#{id}</span>
                    <span className="block text-sm bg-green-600 rounded-md px-4 py-1.5 text-white font-medium">
                      {type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:mt-12 mt-0">
              <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
                <div className="col-span-1">
                  <span className="font-semibold text-gray-600 break-words w-full">Điện thoại</span>
                </div>
                <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                  <a href={`tel:${phone}`} className="font-medium hover:text-blue-500 duration-300 text-right">
                    {phone}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
                <div className="col-span-1">
                  <span className="font-semibold text-gray-600">Email</span>
                </div>
                <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                  <a
                    href={`mailto:${email}`}
                    className="font-medium hover:text-blue-500 duration-300 break-words w-full text-right"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
            <div className="my-16">
              <TabControl arrayTabs={arrayTab} />
            </div>
          </PortletBody>
        </Portlet>
      </div>

      <div className="col-span-4 lg:col-span-3">
        <TabContent arrayTabs={arrayTab} />
      </div>
    </div>
  )
}
