import { DropdownAsync } from 'app/partials/dropdown-async'
import { Portlet, PortletBody, PortletHeader } from 'app/partials/portlet'
import PrDropdown, { OptionProps, PrDropdownRefProps } from 'app/partials/pr-dropdown'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify'
import PrUpload from 'app/partials/pr-upload'
import { refreshUserDetailState } from 'app/states/dashboard/refresh-user-info'
import { userDetailState } from 'app/states/dashboard/user-detail-state'
import DefaultAvatarFemale from 'assets/images/default-avatar-female.png'
import DefaultAvatar from 'assets/images/default-avatar.png'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DataGender, DataVerify } from 'constants/data-common'
import { SERVER_URL } from 'constants/index'
import vi from 'date-fns/locale/vi'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { ResponseUserDetail } from 'models/response-api'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { List } from 'react-content-loader'
import DatePicker from 'react-datepicker'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { checkEmail, checkPhone, getDefaultDataDropdown, uploadServer } from 'utils/helper'
import { v4 as uuid } from 'uuid'
import { DataOptionActive } from 'constants/data-filter'

export const TabUpdateInfo: React.FC = () => {
  const userDetail = useRecoilValue(userDetailState)
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
  const verifyRef = useRef<PrDropdownRefProps>(null)

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

  const callApiUpdate = (data: any) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/users/${userDetail?._id}`
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
        const { success, message, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        showNotify.success(message)
        refreshUserDetail(true)
      })
      .catch((e) => {
        setErrorMessage(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onUpdateInfo = async () => {
    if (!validate()) {
      return
    }
    const avatarId = userDetail?.avatarId || uuid()
    let avatarURL = userDetail?.avatar ?? ''
    if (avatarFile) {
      avatarURL = await uploadServer(avatarFile, avatarId)
    }
    const fullname = fullnameRef.current?.getValue()
    const email = emailRef.current?.getValue()
    const phone = phoneRef.current?.getValue()
    const gender = genderRef.current?.getValue()[0].value
    const numberOfReportJob = parseInt(numberOfReportJobRef.current?.getValue() || '0')
    const numberOfCandidateOpening = parseInt(numberOfCandidateOpeningRef.current?.getValue() || '0')
    const numberOfCreateCv = parseInt(numberOfCreateCvRef.current?.getValue() || '0')
    const numberOfPosting = parseInt(numberOfPostingRef.current?.getValue() || '0')
    const numberOfRequestUpdateCompany = parseInt(numberOfRequestUpdateCompanyRef.current?.getValue() || '0')
    const status = statusRef.current?.getValue()[0].value
    const verify = verifyRef.current?.getValue()[0].value === 'true'

    const data = {
      fullname,
      email,
      phone,
      gender,
      address: addressInput,
      birthday,
      avatar: avatarURL,
      avatarId,
      numberOfReportJob,
      numberOfCandidateOpening,
      numberOfCreateCv,
      numberOfPosting,
      numberOfRequestUpdateCompany,
      status,
      verify
    }

    callApiUpdate(data)
  }

  useEffect(() => {
    if (userDetail) {
      const {
        fullname,
        email,
        phone,
        gender,
        address,
        birthday,
        numberOfReportJob,
        numberOfCandidateOpening,
        numberOfCreateCv,
        numberOfPosting,
        numberOfRequestUpdateCompany,
        type,
        verify,
        status
      } = userDetail
      const defaultGender = getDefaultDataDropdown(DataGender, [gender || ''])
      setBirthday(birthday ? moment(userDetail.birthday).toDate() : null)
      genderRef.current?.setValue(defaultGender[0])
      fullnameRef.current?.setValue(fullname || '')
      emailRef.current?.setValue(email)
      phoneRef.current?.setValue(phone || '')
      addressRef.current?.setValue(address ? address.label : '')
      numberOfReportJobRef.current?.setValue(numberOfReportJob || numberOfReportJob === 0 ? `${numberOfReportJob}` : '')
      if (type === 'USER') {
        numberOfCreateCvRef.current?.setValue(numberOfCreateCv || numberOfCreateCv === 0 ? `${numberOfCreateCv}` : '')
      }
      if (type === 'EMPLOYER') {
        numberOfPostingRef.current?.setValue(numberOfPosting || numberOfPosting === 0 ? `${numberOfPosting}` : '')
        numberOfRequestUpdateCompanyRef.current?.setValue(
          numberOfRequestUpdateCompany || numberOfRequestUpdateCompany === 0 ? `${numberOfRequestUpdateCompany}` : ''
        )
        numberOfCandidateOpeningRef.current?.setValue(
          numberOfCandidateOpening || numberOfCandidateOpening === 0 ? `${numberOfCandidateOpening}` : ''
        )
      }
      verifyRef.current?.setValue(getDefaultDataDropdown(DataVerify, [`${verify}`]))
      statusRef.current?.setValue(getDefaultDataDropdown(DataOptionActive, [status || '']))
    }
  }, [userDetail])

  if (!userDetail) {
    return <List />
  }

  return (
    <Portlet>
      <PortletHeader title="Chỉnh sửa thông tin" />
      <PortletBody>
        <div className="mt-10 px-10 pb-20 rounded-md mx-auto w-2/3">
          <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-1">
              <span className="font-medium">Avatar</span>
            </div>
            <div className="col-span-2">
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <PrUpload
                  defaultURL={
                    userDetail?.avatar || (userDetail?.gender === 'FEMALE' ? DefaultAvatarFemale : DefaultAvatar)
                  }
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
                    showYearDropdown
                    showMonthDropdown
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

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">Số lần báo cáo tin giả</span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrInput
                  ref={numberOfReportJobRef}
                  onChange={(e) => {
                    e && setErrorMessage('')
                  }}
                />
              </div>
            </div>
          </div>

          {userDetail.type === 'USER' && (
            <div className="grid grid-cols-3 gap-x-10 mt-10">
              <div className="col-span-1">
                <span className="font-medium">Số lần tạo CV</span>
              </div>
              <div className="col-span-2">
                <div className="w-full">
                  <PrInput
                    ref={numberOfCreateCvRef}
                    onChange={(e) => {
                      e && setErrorMessage('')
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {userDetail.type === 'EMPLOYER' && (
            <>
              <div className="grid grid-cols-3 gap-x-10 mt-10">
                <div className="col-span-1">
                  <span className="font-medium">Số lần đăng tin tuyển dụng</span>
                </div>
                <div className="col-span-2">
                  <div className="w-full">
                    <PrInput
                      ref={numberOfPostingRef}
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

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">Xác thực</span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrDropdown isClearable={false} ref={verifyRef} options={DataVerify} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-10 mt-10">
            <div className="col-span-1">
              <span className="font-medium">Trạng thái</span>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <PrDropdown isClearable={false} ref={statusRef} options={DataOptionActive} />
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
      </PortletBody>
    </Portlet>
  )
}
