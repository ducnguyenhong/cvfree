import { BreadCrumb } from '../bread-crumb'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { List } from 'react-content-loader'
import moment from 'moment'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import DefaultAvatar from 'assets/images/default-avatar.png'
import { Link } from 'react-router-dom'

export const Profile: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)

  if (!userInfo) {
    return <List />
  }

  const {
    fullname,
    email,
    typeAccount,
    gender,
    username,
    numberOfCandidateOpening,
    numberOfPosting,
    avatar,
    phone,
    address,
    birthday,
    type
  } = userInfo

  return (
    <WrapperPage title="Thông tin cá nhân">
      <div className="mt-10 px-10 pt-20 pb-32 rounded-md w-2/3 mx-auto">
        <div className="flex items-center">
          <img src={avatar || DefaultAvatar} alt="avatar" className="block w-28 h-28 rounded-full" />
          <div className="ml-20">
            <span className="block text-xl font-semibold">
              {fullname || <span className="opacity-50">Chưa cập nhật</span>}
            </span>
            <div className="mt-2">
              <i className="fas fa-user-circle mr-2" />
              <span>{username}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <span className="font-semibold">Giới tính:</span>
          <span className="font-medium">{gender || <span className="opacity-50">Chưa cập nhật</span>}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold">Ngày sinh:</span>
          <span className="font-medium">
            {birthday ? moment(birthday).format('DD/MM/YYYY') : <span className="opacity-50">Chưa cập nhật</span>}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold">Điện thoại:</span>
          <span className="font-medium">{phone || <span className="opacity-50">Chưa cập nhật</span>}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold">Email:</span>
          <span className="font-medium">{email}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold">Địa chỉ:</span>
          <span className="font-medium">{address?.label || <span className="opacity-50">Chưa cập nhật</span>}</span>
        </div>

        {type === 'EMPLOYER' && (
          <>
            <div className="flex items-center justify-between mt-3">
              <span className="font-semibold">Số lượt đăng tuyển dụng:</span>
              <span className="font-medium">{numberOfPosting || 0}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="font-semibold">Số lượt mở ứng viên:</span>
              <span className="font-medium">{numberOfCandidateOpening || 0}</span>
            </div>
          </>
        )}

        <div className="text-center mt-20">
          <Link
            to="/profile/update"
            className="text-white px-6 py-3 rounded bg-blue-500 font-semibold text-md duration-300 hover:bg-blue-600"
          >
            Cập nhật thông tin
          </Link>
        </div>
      </div>
    </WrapperPage>
  )
}
