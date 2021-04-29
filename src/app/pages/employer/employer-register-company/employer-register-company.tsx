import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import { showNotify } from 'app/partials/pr-notify'
import PrUpload from 'app/partials/pr-upload'
import { userInfoState } from 'app/states/user-info-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DataPersonnelSize, DataRecruitmentPosition } from 'constants/data-employer'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CompanyInfo } from 'models/company-info'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { getValueDropdown, uploadServer } from 'utils/helper'
import { v4 as uuid } from 'uuid'
import { useLocation } from 'react-router-dom'
import { ResponseCompanyDetail } from 'models/response-api'

import { List } from 'react-content-loader'
import { getDefaultDataDropdown } from '../../../../utils/helper'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { RequestUpdateCompanyInfo } from '../../../../models/request-update-company-info'

export const EmployerRegisterCompany: React.FC = () => {
  const location = useLocation()
  const isUpdate = !!(location.pathname === '/employer/update-company')
  const [city, setCity] = useState<OptionProps | null>(null)
  const [addressInput, setAddressInput] = useState<{
    value: {
      city?: { value: string; label: string }
      district?: { value: string; label: string }
      street?: string
    }
    label: string
  } | null>(null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null)
  const [employeeIdCardFile, setEmployeeIdCardFile] = useState<File | null>(null)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [companyDetail, setCompanyDetail] = useState<CompanyInfo | null>(null)
  const isAdmin = !!(companyDetail?.creatorId === userInfo?._id)

  // ref
  const modalNotifyRequestRef = useRef<PrModalRefProps>(null)
  const nameRef = useRef<PrInputRefProps>(null)
  const emailRef = useRef<PrInputRefProps>(null)
  const phoneRef = useRef<PrInputRefProps>(null)
  const websiteRef = useRef<PrInputRefProps>(null)
  const taxCodeRef = useRef<PrInputRefProps>(null)
  const streetRef = useRef<PrInputRefProps>(null)
  const cityRef = useRef<PrDropdownRefProps>(null)
  const districtRef = useRef<PrDropdownRefProps>(null)
  const personnelSizeRef = useRef<PrDropdownRefProps>(null)
  const positionRef = useRef<PrDropdownRefProps>(null)
  const introRef = useRef<PrInputRefProps>(null)

  const callApiCompanyDetail = () => {
    const url = `${SERVER_URL}/companies/employer`
    const accessToken = Cookies.get('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined
    }

    axios(config)
      .then((response: AxiosResponse<ResponseCompanyDetail>) => {
        const { success, error, data } = response.data
        if (!success) {
          throw Error(error?.message)
        }

        setCompanyDetail(data.companyDetail)
      })
      .catch((e) => showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!'))
  }

  const callApiRegister = (data: CompanyInfo) => {
    const url = isUpdate ? `${SERVER_URL}/companies/employer` : `${SERVER_URL}/companies`
    const accessToken = Cookies.get('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: isUpdate ? 'PUT' : 'POST',
      headers,
      url,
      data
    }

    axios(config)
      .then((response) => {
        const { success, message, error, data } = response.data
        if (!success) {
          throw Error(error)
        }
        if (!isUpdate) {
          const { userDetail } = data
          if (userInfo) {
            setUserInfo({ ...userInfo, companyId: userDetail.companyId })
          }
        } else {
          callApiCompanyDetail()
        }
        showNotify.success(message)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiRequestUpdate = (data: RequestUpdateCompanyInfo) => {
    const url = `${SERVER_URL}/companies/employer`
    const accessToken = Cookies.get('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'PUT',
      headers,
      url,
      data
    }

    axios(config)
      .then((response) => {
        const { success, message, error, data } = response.data
        if (!success) {
          throw Error(error)
        }
        modalNotifyRequestRef.current?.show()
        showNotify.success(message)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const validate = () => {
    if (!nameRef.current?.checkRequired()) {
      return false
    }
    if (!phoneRef.current?.checkRequired()) {
      return false
    }
    if (!emailRef.current?.checkRequired()) {
      return false
    }
    if (!cityRef.current?.checkRequired()) {
      return false
    }
    if (!districtRef.current?.checkRequired()) {
      return false
    }
    if (!streetRef.current?.checkRequired()) {
      return false
    }
    if (!cityRef.current?.checkRequired()) {
      return false
    }
    if (!personnelSizeRef.current?.checkRequired()) {
      return false
    }
    if (
      (!isUpdate && !employeeIdCardFile && isAdmin) ||
      (isUpdate && !companyDetail?.creator.employeeIdCard && !employeeIdCardFile && isAdmin)
    ) {
      setErrorMessage('Bạn cần cung cấp ảnh thẻ nhân viên của mình')
      return false
    }
    if (isAdmin && !positionRef.current?.checkRequired()) {
      return false
    }
    return true
  }

  const onRegisterCompany = async () => {
    if (!validate()) {
      return
    }
    const logoId = uuid()
    const backgroundId = uuid()
    const employeeIdCardId = uuid()
    let logoUrl = ''
    let backgroundUrl = ''
    let emplyeeIdCardUrl = ''
    if (logoFile) {
      logoUrl = await uploadServer(logoFile, logoId)
    }
    if (backgroundFile) {
      backgroundUrl = await uploadServer(backgroundFile, backgroundId)
    }
    if (employeeIdCardFile) {
      emplyeeIdCardUrl = await uploadServer(employeeIdCardFile, employeeIdCardId)
    }

    const data: CompanyInfo = {
      logo: companyDetail?.logo || logoUrl,
      logoId,
      backgroundId,
      staffList: [userInfo?.id || 0],
      background: companyDetail?.background || backgroundUrl,
      name: nameRef.current?.getValue() ?? '',
      email: emailRef.current?.getValue() ?? '',
      phone: phoneRef.current?.getValue() ?? '',
      website: websiteRef.current?.getValue(),
      creator: {
        employeeIdCard: companyDetail?.creator.employeeIdCard || emplyeeIdCardUrl,
        employeeIdCardId,
        position: positionRef.current?.getValue()[0]
      },
      address: companyDetail?.address || {
        value: {
          district: addressInput?.value.district,
          city: addressInput?.value.city,
          street: addressInput?.value.street || ''
        },
        label: addressInput?.label ?? ''
      },
      taxCode: taxCodeRef.current?.getValue(),
      intro: introRef.current?.getValue(),
      personnelSize: getValueDropdown(personnelSizeRef.current?.getValue())[0],
      status: 'ACTIVE'
    }

    const dataRequest: RequestUpdateCompanyInfo = {
      userRequest: {
        id: userInfo?._id,
        fullname: userInfo?.fullname,
        avatar: userInfo?.avatar
      },
      content: {
        logo: companyDetail?.logo || logoUrl,
        logoId,
        backgroundId,
        background: companyDetail?.background || backgroundUrl,
        name: nameRef.current?.getValue() ?? '',
        email: emailRef.current?.getValue() ?? '',
        phone: phoneRef.current?.getValue() ?? '',
        website: websiteRef.current?.getValue(),
        address: companyDetail?.address || {
          value: {
            district: addressInput?.value.district,
            city: addressInput?.value.city,
            street: addressInput?.value.street || ''
          },
          label: addressInput?.label ?? ''
        },
        taxCode: taxCodeRef.current?.getValue(),
        intro: introRef.current?.getValue(),
        personnelSize: getValueDropdown(personnelSizeRef.current?.getValue())[0]
      }
    }

    if (isAdmin) {
      callApiRegister(data)
    } else {
      callApiRequestUpdate(dataRequest)
    }
  }

  const getBackground = (e: File) => {
    setBackgroundFile(e)
  }

  const getLogo = (e: File) => {
    setLogoFile(e)
  }

  const getEmployeeIdCard = (e: File) => {
    setEmployeeIdCardFile(e)
  }

  useEffect(() => {
    if (isUpdate) {
      callApiCompanyDetail()
    }
  }, [isUpdate])

  useEffect(() => {
    if (companyDetail) {
      const { name, phone, email, taxCode, website, personnelSize, creator, address, intro } = companyDetail
      const { position } = creator
      if (address.value.district) {
        setDisableDistrict(false)
      }

      nameRef.current?.setValue(name)
      cityRef.current?.setValue(address.value.city || null)
      districtRef.current?.setValue(address.value.district || null)
      streetRef.current?.setValue(address.value.street || '')
      phoneRef.current?.setValue(phone)
      emailRef.current?.setValue(email)
      taxCodeRef.current?.setValue(taxCode || '')
      websiteRef.current?.setValue(website || '')
      introRef.current?.setValue(intro || '')
      personnelSizeRef.current?.setValue(getDefaultDataDropdown(DataPersonnelSize, [personnelSize]))
      positionRef.current?.setValue(position || null)
    }
  }, [companyDetail])

  if (!companyDetail) {
    return <List />
  }

  const { logo, background, creator } = companyDetail
  const { employeeIdCard } = creator

  const renderTitleButton = () => {
    if (!isUpdate) {
      return 'Đăng ký công ty'
    } else {
      return companyDetail.creatorId === userInfo?._id ? 'Cập nhật công ty' : 'Gửi yêu cầu chỉnh sửa'
    }
  }

  const renderTitleWrapper = () => {
    if (!isUpdate) {
      return 'Đăng ký công ty'
    } else {
      return companyDetail.creatorId === userInfo?._id
        ? 'Cập nhật thông tin công ty'
        : 'Gửi yêu cầu chỉnh sửa thông tin'
    }
  }

  return (
    <WrapperPage title={renderTitleWrapper()}>
      <div className="mt-10 px-16 pt-5 pb-20">
        <span className="block uppercase font-semibold text-xl">1. Thông tin công ty</span>
        <div className="mt-8">
          <PrInput label="Tên công ty" icon="fas fa-building" required ref={nameRef} />
        </div>
        <div className="mt-8">
          <PrInput label="Website công ty" icon="fas fa-globe-americas" ref={websiteRef} />
        </div>
        <div className="mt-8">
          <PrInput label="Mã số thuế" icon="fas fa-cog" ref={taxCodeRef} />
        </div>
        <div className="mt-8">
          <PrInput label="Số điện thoại của công ty" icon="fas fa-envelope" required ref={phoneRef} />
        </div>
        <div className="mt-8">
          <PrInput label="Email của công ty" icon="fas fa-envelope" required ref={emailRef} />
        </div>
        <div className="mt-8 grid grid-cols-5 gap-x-20">
          <div className="col-span-2">
            <span className="block text-green-700 font-semibold mb-2">Logo công ty</span>
            <div className="w-1/2 mx-auto border">
              <PrUpload getImage={getLogo} shape="square" className="w-full" defaultURL={logo} />
            </div>
          </div>
          <div className="col-span-3">
            <span className="block text-green-700 font-semibold mb-2">Ảnh nền công ty</span>
            <div className="w-1/3 mx-auto border">
              <PrUpload
                getImage={getBackground}
                shape="square"
                className="w-full"
                ratio={{ x: 2, y: 1 }}
                defaultURL={background}
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <span className="block text-green-700 font-semibold">
            Địa chỉ công ty<span className="text-red-500 ml-1">*</span>
          </span>
          <div className="grid-cols-2 grid gap-x-12 pl-10 mt-2">
            <DropdownAsync
              required
              ref={cityRef}
              label="Tỉnh/Thành phố"
              urlApi="/locations/cities"
              onChange={(e) => {
                setCity(e[0])
                setDisableDistrict(false)
              }}
            />
            <DropdownAsync
              required
              label="Quận/Huyện"
              ref={districtRef}
              isDisabled={disableDistrict}
              urlApi={`/locations/cities/${city?.value}`}
              onChange={(e) => {
                setAddressInput({
                  label: `${e[0].label}, ${city?.label}`,
                  value: {
                    district: { value: `${e[0].value}`, label: `${e[0].label}` },
                    city: { value: `${city?.value}`, label: `${city?.label}` }
                  }
                })
              }}
            />
          </div>
          <div className="mt-4 px-10">
            <PrInput label="Tên đường/phố" icon="fas fa-map-marker-alt" ref={streetRef} required />
          </div>
        </div>
        <div className="mt-8">
          <PrDropdown
            label="Quy mô nhân sự (người)"
            required
            options={DataPersonnelSize}
            ref={personnelSizeRef}
            isClearable={false}
          />
        </div>
        <div className="mt-8">
          <PrInput label="Giới thiệu" type="textarea" ref={introRef} divClassName="h-44" />
        </div>

        {isAdmin && (
          <>
            <span className="block mt-20 uppercase font-semibold text-xl">2. Thông tin của bạn trong công ty</span>

            <div className="mt-8 grid grid-cols-5 gap-x-20">
              <div className="col-span-2">
                <span className="block font-medium mb-2">
                  Ảnh thẻ nhân viên <span className="font-bold text-red-500">*</span>
                </span>
                <div className="w-1/2 mx-auto border">
                  <PrUpload
                    getImage={getEmployeeIdCard}
                    shape="square"
                    ratio={{ x: 3, y: 2 }}
                    className="w-full"
                    defaultURL={employeeIdCard}
                  />
                </div>
              </div>
              <div className="col-span-2 h-12">
                <PrDropdown
                  label="Chức vụ/Vị trí"
                  required
                  options={DataRecruitmentPosition}
                  ref={positionRef}
                  isClearable={false}
                />
              </div>
            </div>
          </>
        )}

        {errorMessage && (
          <div className="mt-10">
            <span className="text-red-500 font-medium">Lỗi: {errorMessage}</span>
          </div>
        )}

        <div className="mt-24 text-center">
          <span
            onClick={onRegisterCompany}
            className="bg-blue-500 text-white rounded px-6 py-3 uppercase text-lg font-semibold cursor-pointer hover:bg-blue-600 duration-300"
          >
            {renderTitleButton()}
          </span>
        </div>
      </div>
      <PrModal
        title="Thông báo"
        disableFooter
        ref={modalNotifyRequestRef}
        onHide={() => modalNotifyRequestRef.current?.hide()}
      >
        <div className="py-10 px-16">
          <span className="block text-center text-xl font-semibold">Yêu cầu của bạn đã được tiếp nhận</span>
          <span className="block text-center mt-10 font-medium">
            Chúng tôi sẽ liên hệ, thông báo với người đã tạo công ty về yêu cầu của bạn và chờ phản hồi từ họ
          </span>
          <span className="block text-center mt-10 font-medium">
            Chúng tôi sẽ sớm phản hồi yêu cầu này qua địa chỉ email của bạn
          </span>
          <span className="block text-center mt-10 font-medium">
            <span className="text-red-500">* Chú ý:</span> Trong trường hợp xảy ra tranh chấp, khiếu nại, CVFREE sẽ xem
            xét chính xác thông tin đúng và quyết định của CVFREE là quyết định cuối cùng
          </span>
        </div>
      </PrModal>
    </WrapperPage>
  )
}
