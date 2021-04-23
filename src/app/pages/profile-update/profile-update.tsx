import { DropdownAsync } from 'app/partials/dropdown-async'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrDropdown, { OptionProps, PrDropdownRefProps } from 'app/partials/pr-dropdown'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify'
import PrUpload from 'app/partials/pr-upload'
import { userInfoState } from 'app/states/user-info-state'
import DefaultAvatar from 'assets/images/default-avatar.png'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DataGender } from 'constants/data-common'
import { SERVER_URL } from 'constants/index'
import vi from 'date-fns/locale/vi'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseUserDetail } from 'models/response-api'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { List } from 'react-content-loader'
import DatePicker from 'react-datepicker'
import { useRecoilState } from 'recoil'
import { checkEmail, checkPhone, getDefaultDataDropdown, uploadServer } from 'utils/helper'
import DefaultAvatarFemale from 'assets/images/default-avatar-female.png'
import { v4 as uuid } from 'uuid'

export const ProfileUpdate: React.FC = () => {
  const [userInfo, setUserRecoil] = useRecoilState(userInfoState)
  const [birthday, setBirthday] = useState<any>(userInfo?.birthday ? moment(userInfo?.birthday).toDate() : null)
  const [city, setCity] = useState<OptionProps | null>(null)
  const [district, setDistrict] = useState<OptionProps | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [addressInput, setAddressInput] = useState<
    { value: { district: string; city: string }; label: string } | null | undefined
  >(userInfo?.address || null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const fullnameRef = useRef<PrInputRefProps>(null)
  const genderRef = useRef<PrDropdownRefProps>(null)
  const phoneRef = useRef<PrInputRefProps>(null)
  const emailRef = useRef<PrInputRefProps>(null)
  const addressRef = useRef<PrInputRefProps>(null)
  const modalAddressRef = useRef<PrModalRefProps>(null)

  const onHideAddress = () => {
    setAddressInput(addressInput)
  }

  const onChangeAddress = () => {
    setAddressInput({
      label: `${district?.label}, ${city?.label}`,
      value: {
        city: city?.value ?? '',
        district: district?.value ?? ''
      }
    })
    addressRef.current?.setValue(`${district?.label}, ${city?.label}`)
    modalAddressRef.current?.hide()
  }

  if (!userInfo) {
    return <List />
  }

  const { avatar } = userInfo

  const validate = () => {
    if (!fullnameRef.current?.checkRequired()) {
      return false
    }
    if (!genderRef.current?.checkRequired()) {
      return false
    }
    if (!birthday) {
      setErrorMessage('* Ngày sinh là bắt buộc')
      return false
    }
    if (!checkEmail(emailRef.current?.getValue())) {
      emailRef.current?.setErrorMessage('Email không hợp lệ!')
      return false
    }
    if (phoneRef.current?.getValue() && !checkPhone(phoneRef.current?.getValue())) {
      phoneRef.current?.setErrorMessage('Số điện thoại không hợp lệ!')
      return false
    }
    return true
  }

  const callApiUpdate = (data: any) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/users/${userInfo._id}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'PUT',
      headers,
      url,
      data,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseUserDetail>) => {
        const { success, message, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        showNotify.success(message)
        setUserRecoil(data.userDetail)
      })
      .catch((e) => {
        setErrorMessage(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onUpdateInfo = async () => {
    if (!validate()) {
      return
    }
    const avatarId = userInfo.avatarId || uuid()
    let avatarURL = avatar ?? ''
    if (avatarFile) {
      avatarURL = await uploadServer(avatarFile, avatarId)
    }
    const fullname = fullnameRef.current?.getValue()
    const email = emailRef.current?.getValue()
    const phone = phoneRef.current?.getValue()
    const gender = genderRef.current?.getValue()[0].value

    const data = {
      fullname,
      email,
      phone,
      gender,
      address: addressInput,
      birthday,
      avatar: avatarURL,
      avatarId
    }

    callApiUpdate(data)
  }

  useEffect(() => {
    if (userInfo) {
      const { fullname, email, phone, gender, address } = userInfo
      const defaultGender = getDefaultDataDropdown(DataGender, [gender || ''])
      genderRef.current?.setValue(defaultGender[0])
      fullnameRef.current?.setValue(fullname || '')
      emailRef.current?.setValue(email)
      phoneRef.current?.setValue(phone || '')
      addressRef.current?.setValue(address ? address.label : '')
    }
  }, [userInfo])

  return (
    <WrapperPage title="Cập nhật thông tin cá nhân">
      <div className="mt-10 px-10 pt-20 pb-32 rounded-md mx-auto w-2/3">
        <div className="grid grid-cols-3 gap-x-8">
          <div className="col-span-1">
            <span className="font-medium">Avatar</span>
          </div>
          <div className="col-span-2">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <PrUpload
                defaultURL={avatar || (userInfo.gender === 'FEMALE' ? DefaultAvatarFemale : DefaultAvatar)}
                ratio={{ x: 1, y: 1 }}
                shape="square"
                className="w-full h-full"
                getImage={(e) => setAvatarFile(e)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">
              Họ và tên <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrInput
                ref={fullnameRef}
                maxLength={255}
                onChange={(e) => {
                  e && setErrorMessage('')
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">
              Giới tính <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrDropdown
                options={DataGender}
                ref={genderRef}
                isClearable={false}
                onChange={(e: any) => {
                  e && setErrorMessage('')
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">
              Ngày sinh <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <div className="border border-gray-300 rounded overflow-hidden">
                <DatePicker
                  wrapperClassName="w-full"
                  className="w-full h-9 px-4"
                  selected={birthday}
                  onChange={(e) => {
                    e && setErrorMessage('')
                    setBirthday(e)
                  }}
                  popperPlacement="auto"
                  locale={vi}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">Điện thoại</span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrInput ref={phoneRef} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">
              Email <span className="ml-1 text-red-500 font-bold">*</span>
            </span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrInput
                ref={emailRef}
                onChange={(e) => {
                  e && setErrorMessage('')
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 mt-10">
          <div className="col-span-1">
            <span className="font-medium">Địa chỉ</span>
          </div>
          <div className="col-span-2">
            <div className="w-full">
              <PrInput ref={addressRef} onFocus={() => modalAddressRef.current?.show()} />
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-20">
            <span className="text-red-500 block text-center font-semibold">{errorMessage}</span>
          </div>
        )}
        <div className="text-center mt-20">
          <span
            onClick={onUpdateInfo}
            className="cursor-pointer text-white px-6 py-3 rounded bg-blue-500 font-semibold text-md duration-300 hover:bg-blue-600"
          >
            <i className="fas fa-edit mr-2 text-white" />
            Cập nhật
          </span>
        </div>

        <PrModal
          ref={modalAddressRef}
          title={'Chọn địa chỉ của bạn'}
          cancelTitle="Đóng"
          okTitle="Xác nhận"
          onChange={onChangeAddress}
          onHide={onHideAddress}
        >
          <div className="grid-cols-2 grid gap-x-12 p-8">
            <DropdownAsync
              label="Tỉnh/Thành phố"
              urlApi="/locations/cities"
              onChange={(e) => {
                setCity(e[0])
                setDisableDistrict(false)
              }}
            />
            <DropdownAsync
              label="Quận/Huyện"
              isDisabled={disableDistrict}
              urlApi={`/locations/cities/${city?.value}`}
              onChange={(e) => {
                setDistrict(e[0])
              }}
            />
          </div>
        </PrModal>
      </div>
    </WrapperPage>
  )
}
