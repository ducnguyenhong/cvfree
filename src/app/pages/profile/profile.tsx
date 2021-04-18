import { BreadCrumb } from '../bread-crumb'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { List } from 'react-content-loader'
import moment from 'moment'

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
    <div className="w-2/3 mx-auto py-32">
      <BreadCrumb title="Thông tin cá nhân" />
      <div className="mt-10 p-10 rounded-md w-2/3 mx-auto bg-blue-50">
        <img src={avatar} alt="avatar" className="block w-20 h-20" />
        <span className="block">Họ và tên: {fullname || 'Chưa cập nhật'}</span>
        <span className="block">Tài khoản: {username}</span>
        <span className="block">Giới tính: {gender || 'Chưa cập nhật'}</span>
        <span className="block">Ngày sinh: {moment(birthday).format('DD/MM/YYYY') || 'Chưa cập nhật'}</span>
        <span className="block">Điện thoại: {phone || 'Chưa cập nhật'}</span>
        <span className="block">Email: {email}</span>
        <span className="block">Địa chỉ: {address?.label || 'Chưa cập nhật'}</span>
        <span className="block">Loại tài khoản: {typeAccount}</span>
        {type === 'EMPLOYER' && (
          <>
            <span className="block">Số lượt đăng tuyển dụng: {numberOfPosting || 0}</span>
            <span className="block">Số lượt mở ứng viên: {numberOfCandidateOpening || 0}</span>
          </>
        )}

        <div className="text-center">
          <span className="text-white px-4 py-2 rounded bg-blue-500">Cập nhật thông tin</span>
        </div>
      </div>
    </div>
  )
}
