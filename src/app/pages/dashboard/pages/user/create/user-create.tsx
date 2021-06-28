import { DropdownAsync } from 'app/partials/dropdown-async'
import { Portlet, PortletBody, PortletHeader } from 'app/partials/portlet'
import PrDropdown, { OptionProps, PrDropdownRefProps } from 'app/partials/pr-dropdown'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify'
import PrUpload from 'app/partials/pr-upload'
import { refreshUserDetailState } from 'app/states/dashboard/refresh-user-info'
import { userDetailState } from 'app/states/dashboard/user-detail-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DataGender, DataVerify } from 'constants/data-common'
import { DataOptionActive } from 'constants/data-filter'
import { SERVER_URL } from 'constants/index'
import vi from 'date-fns/locale/vi'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseUserDetail } from 'models/response-api'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { checkEmail, checkPhone, uploadServer, getDefaultDataDropdown, checkUsername } from 'utils/helper'
import { v4 as uuid } from 'uuid'
import queryString from 'query-string'
import { DataUserType } from 'constants/data-dashboard'

import { useHistory, useLocation } from 'react-router-dom'
import { DropdownSync } from 'app/partials/dropdown-sync'
import md5 from 'md5'
import { UserInfo } from 'models/user-info'

export const UserCreate: React.FC = () => {
  const userDetail = useRecoilValue(userDetailState)
  const history = useHistory()
  const location = useLocation()
  const refreshUserDetail = useSetRecoilState(refreshUserDetailState)
  const [birthday, setBirthday] = useState<any>(userDetail?.birthday ? moment(userDetail?.birthday).toDate() : null)
  const [city, setCity] = useState<OptionProps | null>(null)
  const [district, setDistrict] = useState<OptionProps | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [addressInput, setAddressInput] = useState<
    { value: { district: string; city: string }; label: string } | null | undefined
  >(userDetail?.address || null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const usernameRef = useRef<PrInputRefProps>(null)
  const passwordRef = useRef<PrInputRefProps>(null)
  const confPasswordRef = useRef<PrInputRefProps>(null)
  const fullnameRef = useRef<PrInputRefProps>(null)
  const genderRef = useRef<PrDropdownRefProps>(null)
  const phoneRef = useRef<PrInputRefProps>(null)
  const emailRef = useRef<PrInputRefProps>(null)
  const addressRef = useRef<PrInputRefProps>(null)
  const modalAddressRef = useRef<PrModalRefProps>(null)
  const numberOfCreateCvRef = useRef<PrInputRefProps>(null)
  const numberOfPostingRef = useRef<PrInputRefProps>(null)
  const numberOfRequestUpdateCompanyRef = useRef<PrInputRefProps>(null)
  const numberOfCandidateOpeningRef = useRef<PrInputRefProps>(null)
  const numberOfReportJobRef = useRef<PrInputRefProps>(null)
  const statusRef = useRef<PrDropdownRefProps>(null)
  const typeRef = useRef<PrDropdownRefProps>(null)
  const verifyRef = useRef<PrDropdownRefProps>(null)

  const [typeUser, setTypeUser] = useState<string | null>('')

  const validate = () => {
    if (!usernameRef.current?.checkRequired()) {
      return false
    }
    if (!passwordRef.current?.checkRequired()) {
      return false
    }
    if (!confPasswordRef.current?.checkRequired()) {
      return false
    }
    if (!fullnameRef.current?.checkRequired()) {
      return false
    }
    if (!emailRef.current?.checkRequired()) {
      return false
    }
    if (!typeRef.current?.checkRequired()) {
      return false
    }
    if (usernameRef.current.getValue().length < 6 || usernameRef.current.getValue().length > 14) {
      usernameRef.current.setErrorMessage('Tài khoản phải từ 6 đến 14 ký tự!')
      return false
    }
    if (!checkUsername(usernameRef.current.getValue())) {
      usernameRef.current.setErrorMessage('Tài khoản phải là chữ cái a-z hoặc số 0-9!')
      return false
    }
    if (passwordRef.current.getValue().length < 6 || passwordRef.current.getValue().length > 14) {
      passwordRef.current.setErrorMessage('Mật khẩu phải từ 6 đến 14 ký tự!')
      return false
    }
    if (passwordRef.current?.getValue() !== confPasswordRef.current.getValue()) {
      confPasswordRef.current.setErrorMessage('Xác nhận mật khẩu không chính xác!')
      return false
    }
    if (!checkEmail(emailRef.current.getValue())) {
      emailRef.current.setErrorMessage('Email không hợp lệ!')
      return false
    }
    if (phoneRef.current?.getValue() && !checkPhone(phoneRef.current?.getValue())) {
      phoneRef.current?.setErrorMessage('Số điện thoại không hợp lệ!')
      return false
    }
    return true
  }

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

  const onChangeTypeUser = (data: OptionProps[]) => {
    const params = queryString.parse(location.search)
    params.type = data[0].value
    history.replace({
      pathname: location.pathname,
      search: queryString.stringify(params)
    })
  }

  const resetInput = () => {
    usernameRef.current?.reset()
    passwordRef.current?.reset()
    confPasswordRef.current?.reset()
    setAvatarFile(null)
    fullnameRef.current?.reset()
    genderRef.current?.reset()
    setBirthday(null)
    emailRef.current?.reset()
    phoneRef.current?.reset()
    addressRef.current?.reset()
    setAddressInput(null)
    numberOfReportJobRef.current?.setValue('1')
    verifyRef.current?.setValue(DataVerify[0])
    statusRef.current?.setValue(DataOptionActive[0])
    typeRef.current?.setValue(getDefaultDataDropdown(DataUserType, typeUser ? [`${typeUser}`] : ['']))
    if (typeUser === 'USER') {
      numberOfCreateCvRef.current?.setValue('3')
    }
    if (typeUser === 'USER') {
      numberOfPostingRef.current?.setValue('3')
      numberOfCandidateOpeningRef.current?.setValue('3')
      numberOfRequestUpdateCompanyRef.current?.setValue('1')
    }
  }

  const callApiCreate = (data: UserInfo) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/users`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
      headers,
      url,
      data,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseUserDetail>) => {
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        resetInput()
        showNotify.success(message)
        refreshUserDetail(true)
      })
      .catch((e) => {
        setErrorMessage(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onCreateUser = async () => {
    if (!validate()) {
      return
    }
    const avatarId = uuid()
    let avatarURL = ''
    if (avatarFile) {
      avatarURL = await uploadServer(avatarFile, avatarId)
    }
    const username = usernameRef.current?.getValue()
    const password = passwordRef.current?.getValue()
    const fullname = fullnameRef.current?.getValue()
    const email = emailRef.current?.getValue()
    const phone = phoneRef.current?.getValue()
    const gender = genderRef.current?.getValue()[0].value
    const numberOfReportJob = parseInt(numberOfReportJobRef.current?.getValue() || '0')
    const status = statusRef.current?.getValue()[0].value
    const verify = verifyRef.current?.getValue()[0].value === 'true'

    const data: UserInfo = {
      username: username || '',
      password: md5(password || ''),
      fullname,
      email: email || '',
      phone,
      gender,
      address: addressInput,
      birthday,
      avatar: avatarURL,
      avatarId,
      numberOfReportJob,
      status,
      verify,
      type: typeUser
    }

    if (typeUser === 'USER') {
      const numberOfCreateCv = parseInt(numberOfCreateCvRef.current?.getValue() || '0')
      data.numberOfCreateCv = numberOfCreateCv
    }
    if (typeUser === 'EMPLOYER') {
      const numberOfCandidateOpening = parseInt(numberOfCandidateOpeningRef.current?.getValue() || '0')
      const numberOfPosting = parseInt(numberOfPostingRef.current?.getValue() || '0')
      const numberOfRequestUpdateCompany = parseInt(numberOfRequestUpdateCompanyRef.current?.getValue() || '0')
      data.numberOfCandidateOpening = numberOfCandidateOpening
      data.numberOfPosting = numberOfPosting
      data.numberOfRequestUpdateCompany = numberOfRequestUpdateCompany
    }

    callApiCreate(data)
  }

  useEffect(() => {
    const parsed = queryString.parse(location.search)
    if (Array.isArray(parsed.type)) {
      console.warn('Duplicate "type" param on URL. The sorted value is taken by the first "type" parameter.')
    }
    setTypeUser(Array.isArray(parsed.type) ? parsed.type[0] : parsed.type)
  }, [location])

  useEffect(() => {
    if (typeRef && typeRef.current) {
      typeRef.current.setValue(getDefaultDataDropdown(DataUserType, typeUser ? [`${typeUser}`] : ['']))
    }
  }, [typeUser])

  useEffect(() => {
    document.title = 'CVFREE | Tạo người dùng'
  }, [])

  return (
    <Portlet>
      <PortletHeader title="Tạo người dùng" />
      <PortletBody>
        <div className="mt-10 px-10 pb-20 rounded-md mx-auto w-2/3">
          <span className="block uppercase font-semibold text-xl">1. Thông tin đăng nhập</span>

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">
                Tài khoản <span className="ml-1 text-red-500 font-bold">*</span>
              </span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrInput
                  ref={usernameRef}
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
                Mật khẩu <span className="ml-1 text-red-500 font-bold">*</span>
              </span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrInput
                  type="password"
                  ref={passwordRef}
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
                Nhập lại mật khẩu <span className="ml-1 text-red-500 font-bold">*</span>
              </span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrInput
                  type="password"
                  ref={confPasswordRef}
                  maxLength={255}
                  onChange={(e) => {
                    e && setErrorMessage('')
                  }}
                />
              </div>
            </div>
          </div>

          <span className="block uppercase font-semibold text-xl mt-10">2. Thông tin cá nhân</span>

          <div className="grid grid-cols-3 gap-x-8 mt-10">
            <div className="col-span-1">
              <span className="font-medium">Avatar</span>
            </div>
            <div className="col-span-2">
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <PrUpload
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
              <span className="font-medium">Giới tính</span>
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
              <span className="font-medium">Ngày sinh</span>
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
              <span className="font-medium">Địa chỉ</span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrInput ref={addressRef} onFocus={() => modalAddressRef.current?.show()} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">Số lần báo cáo tin giả</span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrInput
                  type="number"
                  ref={numberOfReportJobRef}
                  defaultValue="1"
                  onChange={(e) => {
                    e && setErrorMessage('')
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">Xác thực</span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrDropdown isClearable={false} defaultValue={DataVerify[0]} ref={verifyRef} options={DataVerify} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">Trạng thái</span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrDropdown
                  isClearable={false}
                  defaultValue={DataOptionActive[0]}
                  ref={statusRef}
                  options={DataOptionActive}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">
                Loại tài khoản <span className="ml-1 text-red-500 font-bold">*</span>
              </span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <DropdownSync isClearable={false} ref={typeRef} onChange={onChangeTypeUser} options={DataUserType} />
              </div>
            </div>
          </div>

          {typeUser === 'USER' && (
            <div className="grid grid-cols-3 gap-x-10 mt-10">
              <div className="col-span-1">
                <span className="font-medium">Số lần tạo CV</span>
              </div>
              <div className="col-span-2">
                <div className="w-full">
                  <PrInput
                    type="number"
                    ref={numberOfCreateCvRef}
                    defaultValue="3"
                    onChange={(e) => {
                      e && setErrorMessage('')
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {typeUser === 'EMPLOYER' && (
            <>
              <div className="grid grid-cols-3 gap-x-10 mt-10">
                <div className="col-span-1">
                  <span className="font-medium">Số lần đăng tin tuyển dụng</span>
                </div>
                <div className="col-span-2">
                  <div className="w-full">
                    <PrInput
                      type="number"
                      ref={numberOfPostingRef}
                      defaultValue="3"
                      onChange={(e) => {
                        e && setErrorMessage('')
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-10 mt-10">
                <div className="col-span-1">
                  <span className="font-medium">Số lần yêu cầu chỉnh sửa công ty</span>
                </div>
                <div className="col-span-2">
                  <div className="w-full">
                    <PrInput
                      type="number"
                      defaultValue="1"
                      ref={numberOfRequestUpdateCompanyRef}
                      onChange={(e) => {
                        e && setErrorMessage('')
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-x-10 mt-10">
                <div className="col-span-1">
                  <span className="font-medium">Số lần mở khóa ứng viên</span>
                </div>
                <div className="col-span-2">
                  <div className="w-full">
                    <PrInput
                      type="number"
                      defaultValue="3"
                      ref={numberOfCandidateOpeningRef}
                      onChange={(e) => {
                        e && setErrorMessage('')
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {errorMessage && (
            <div className="mt-20">
              <span className="text-red-500 block text-center font-semibold">{errorMessage}</span>
            </div>
          )}
          <div className="text-center mt-20">
            <span
              onClick={onCreateUser}
              className="cursor-pointer text-white px-6 py-3 rounded bg-green-600 font-semibold text-md duration-300 hover:bg-green-700"
            >
              <i className="fas fa-plus mr-2 text-white" />
              Tạo mới
            </span>
          </div>

          <PrModal
            ref={modalAddressRef}
            title={'Chọn địa chỉ'}
            cancelTitle="Đóng"
            position="fixed"
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
      </PortletBody>
    </Portlet>
  )
}
