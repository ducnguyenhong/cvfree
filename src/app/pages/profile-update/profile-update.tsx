import { BreadCrumb } from '../bread-crumb'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { List } from 'react-content-loader'
import moment from 'moment'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import DefaultAvatar from 'assets/images/default-avatar.png'
import { Link } from 'react-router-dom'
import PrUpload from 'app/partials/pr-upload'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import { useEffect, useRef, useState } from 'react'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import { DataGender } from 'constants/data-common'
import DatePicker from 'react-datepicker'
import vi from 'date-fns/locale/vi'

export const ProfileUpdate: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)
  const [birthday, setBirthday] = useState<any>(userInfo?.birthday ?? new Date())

  const fullnameRef = useRef<PrInputRefProps>(null)
  const genderRef = useRef<PrDropdownRefProps>(null)
  const phoneRef = useRef<PrInputRefProps>(null)
  const emailRef = useRef<PrInputRefProps>(null)

  if (!userInfo) {
    return <List />
  }

  const {
    fullname,
    email,
    gender,
    username,
    numberOfCandidateOpening,
    numberOfPosting,
    avatar,
    phone,
    address,
    type
  } = userInfo

  useEffect(() => {
    if (userInfo) {
      const {
        fullname,
        email,
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

      fullnameRef.current?.setValue(fullname || '')
      emailRef.current?.setValue(email)
      phoneRef.current?.setValue(phone || '')
    }
  }, [userInfo])

  return (
    <WrapperPage title="Cập nhật thông tin cá nhân">
      <div className="mt-10 px-10 pt-20 pb-32 rounded-md w-2/3 mx-auto">
        <div className="flex items-center">
          <div className="w-28 h-28 relative rounded-full overflow-hidden">
            <PrUpload
              defaultURL={avatar || DefaultAvatar}
              ratio={{ x: 1, y: 1 }}
              shape="circle"
              className="absolute top-0 left-0 w-full h-full z-10"
            />
            <div
              className="w-full h-10 flex justify-center items-center absolute bottom-0 left-0 z-20 duration-300 hover:h-0"
              style={{ backgroundColor: '#0000008c' }}
            >
              <i className="fas fa-cloud-upload-alt text-gray-100"></i>
            </div>
          </div>
          <div className="ml-20 w-80">
            <PrInput label="Họ và tên" ref={fullnameRef} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-10">
          <div className="col-span-1">
            <PrDropdown options={DataGender} ref={genderRef} label="Giới tính" />
          </div>
          <div className="col-span-1">
            <span className="block text-green-700 font-semibold mb-1">Ngày sinh</span>
            <div className="border border-gray-300 rounded overflow-hidden">
              <DatePicker
                wrapperClassName="w-full"
                className="w-full h-9 px-4"
                selected={birthday}
                onChange={(e) => setBirthday(e)}
                popperPlacement="auto"
                locale={vi}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="col-span-1">
            <PrInput label="Điện thoại" ref={phoneRef} />
          </div>
          <div className="col-span-1">
            <PrInput label="Email" ref={emailRef} />
          </div>
          <div className="col-span-2">
            <PrInput label="Địa chỉ" />
          </div>
        </div>

        <div className="text-center mt-20">
          <span className="cursor-pointer text-white px-6 py-3 rounded bg-blue-500 font-semibold text-md duration-300 hover:bg-blue-600">
            <i className="fas fa-edit mr-2 text-white" />
            Cập nhật
          </span>
        </div>
      </div>
    </WrapperPage>
  )
}
