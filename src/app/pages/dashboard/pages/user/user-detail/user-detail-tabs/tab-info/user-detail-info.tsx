import { Portlet, PortletBody, PortletHeader } from 'app/partials/portlet'
import { useRecoilValue } from 'recoil'
import { userDetailState } from 'app/states/dashboard/user-detail-state'
import { List } from 'react-content-loader'
import { ImageRatio } from 'app/partials/image-ratio/image-ratio'
import { Gender } from 'app/partials/layout/gender'
import moment from 'moment'

export const TabInfo: React.FC = () => {
  const userDetail = useRecoilValue(userDetailState)
  if (!userDetail) {
    return <List />
  }

  const {
    avatar,
    fullname,
    gender,
    username,
    id,
    phone,
    email,
    status,
    type,
    birthday,
    createdAt,
    updatedAt,
    address,
    beWarned,
    numberOfCandidateOpening,
    numberOfCreateCv,
    numberOfPosting
  } = userDetail

  return (
    <Portlet>
      <PortletHeader title="Thông tin" />
      <PortletBody>
        <div className="w-3/5 mx-auto pb-20 pt-10">
          <div className="grid grid-cols-5 gap-x-10">
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
                <span className="font-semibold text-gray-600 break-words w-full">Ngày sinh</span>
              </div>
              <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                <span className="font-medium hover:text-blue-500 duration-300 text-right">
                  {moment(birthday).format('DD/MM/YYYY')}
                </span>
              </div>
            </div>

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

            <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
              <div className="col-span-1">
                <span className="font-semibold text-gray-600 break-words w-full">Địa chỉ</span>
              </div>
              <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                <span className="font-medium hover:text-blue-500 duration-300 text-right">{address?.label}</span>
              </div>
            </div>

            {/* <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
              <div className="col-span-1">
                <span className="font-semibold text-gray-600 break-words w-full">Cảnh cáo</span>
              </div>
              <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                <span className="font-medium hover:text-blue-500 duration-300 text-right">
                  {beWarned ? 'Cảnh cáo lần 1' : 'Không'}
                </span>
              </div>
            </div> */}

            <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
              <div className="col-span-1">
                <span className="font-semibold text-gray-600 break-words w-full">Ngày tạo</span>
              </div>
              <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                <span className="font-medium hover:text-blue-500 duration-300 text-right">
                  {moment(createdAt).format('DD/MM/YYYY')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
              <div className="col-span-1">
                <span className="font-semibold text-gray-600 break-words w-full">Ngày chỉnh sửa</span>
              </div>
              <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                <span className="font-medium hover:text-blue-500 duration-300 text-right">
                  {moment(updatedAt).format('DD/MM/YYYY')}
                </span>
              </div>
            </div>

            {type === 'USER' && (
              <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
                <div className="col-span-1">
                  <span className="font-semibold text-gray-600 break-words w-full">Số lần tạo CV còn lại</span>
                </div>
                <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                  <span className="font-medium hover:text-blue-500 duration-300 text-right">{numberOfCreateCv}</span>
                </div>
              </div>
            )}

            {type === 'EMPLOYER' && (
              <>
                <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
                  <div className="col-span-1">
                    <span className="font-semibold text-gray-600 break-words w-full">Số lần đăng tin tuyển dụng</span>
                  </div>
                  <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                    <span className="font-medium hover:text-blue-500 duration-300 text-right">{numberOfPosting}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 mt-3 gap-x-2">
                  <div className="col-span-1">
                    <span className="font-semibold text-gray-600 break-words w-full">Số lần mở khóa ứng viên</span>
                  </div>
                  <div className="col-span-2 lg:col-span-1 xl:col-span-2 flex justify-end">
                    <span className="font-medium hover:text-blue-500 duration-300 text-right">
                      {numberOfCandidateOpening}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </PortletBody>
    </Portlet>
  )
}
