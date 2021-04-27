import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import { showNotify } from 'app/partials/pr-notify'
import PrUpload from 'app/partials/pr-upload'
import { userInfoState } from 'app/states/user-info-state'
import axios, { AxiosRequestConfig } from 'axios'
import { DataPersonnelSize, DataRecruitmentPosition } from 'constants/data-employer'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CompanyInfo } from 'models/company-info'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { getValueDropdown, uploadServer } from 'utils/helper'
import { v4 as uuid } from 'uuid'

export const EmployerRegisterCompany: React.FC = () => {
  const [city, setCity] = useState<OptionProps | null>(null)
  const [address, setAddress] = useState<{ value: { district: string; city: string }; label: string } | null>(null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const [logo, setLogo] = useState<File | null>(null)
  const [background, setBackground] = useState<File | null>(null)
  const [employeeIdCard, setEmployeeIdCard] = useState<File | null>(null)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [errorMessage, setErrorMessage] = useState<string>('')

  // ref
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

  const callApiRegister = (data: CompanyInfo) => {
    const url = `${SERVER_URL}/companies`

    const accessToken = Cookies.get('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'POST',
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
        const { userDetail } = data
        if (userInfo) {
          setUserInfo({ ...userInfo, companyId: userDetail.companyId })
        }
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
    if (!employeeIdCard) {
      setErrorMessage('Bạn cần cung cấp ảnh thẻ nhân viên của mình')
      return false
    }
    if (!positionRef.current?.checkRequired()) {
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
    if (logo) {
      logoUrl = await uploadServer(logo, logoId)
    }
    if (background) {
      backgroundUrl = await uploadServer(background, backgroundId)
    }
    if (employeeIdCard) {
      emplyeeIdCardUrl = await uploadServer(employeeIdCard, employeeIdCardId)
    }

    const data: CompanyInfo = {
      logo: logoUrl,
      logoId,
      backgroundId,
      staffList: [userInfo?.id || 0],
      background: backgroundUrl,
      name: nameRef.current?.getValue() ?? '',
      email: emailRef.current?.getValue() ?? '',
      phone: phoneRef.current?.getValue() ?? '',
      website: websiteRef.current?.getValue(),
      creator: {
        employeeIdCard: emplyeeIdCardUrl,
        employeeIdCardId,
        position: positionRef.current?.getValue()[0]
      },
      address: {
        value: {
          district: address?.value.district ?? '',
          city: address?.value.city ?? ''
        },
        label: address?.label ?? '',
        street: streetRef.current?.getValue() ?? ''
      },
      taxCode: taxCodeRef.current?.getValue(),
      intro: introRef.current?.getValue(),
      personnelSize: getValueDropdown(personnelSizeRef.current?.getValue())[0],
      status: 'ACTIVE'
    }

    console.log('ducnh3', data)
    callApiRegister(data)
  }

  const getBackground = (e: File) => {
    setBackground(e)
  }

  const getLogo = (e: File) => {
    setLogo(e)
  }

  const getEmployeeIdCard = (e: File) => {
    setEmployeeIdCard(e)
  }

  return (
    <WrapperPage title="Đăng ký công ty">
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
              <PrUpload getImage={getLogo} shape="square" className="w-full" />
            </div>
          </div>
          <div className="col-span-3">
            <span className="block text-green-700 font-semibold mb-2">Ảnh nền công ty</span>
            <div className="w-1/3 mx-auto border">
              <PrUpload getImage={getBackground} shape="square" className="w-full" ratio={{ x: 2, y: 1 }} />
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
                setAddress({
                  label: `${e[0].label}, ${city?.label}`,
                  value: {
                    district: `${e[0].value}`,
                    city: `${city?.value}`
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
          <PrDropdown label="Quy mô nhân sự (người)" required options={DataPersonnelSize} ref={personnelSizeRef} />
        </div>
        <div className="mt-8">
          <PrInput label="Giới thiệu" type="textarea" ref={introRef} divClassName="h-44" />
        </div>

        <span className="block mt-20 uppercase font-semibold text-xl">2. Thông tin của bạn trong công ty</span>

        <div className="mt-8 grid grid-cols-5 gap-x-20">
          <div className="col-span-2">
            <span className="block font-medium mb-2">
              Ảnh thẻ nhân viên <span className="font-bold text-red-500">*</span>
            </span>
            <div className="w-1/2 mx-auto border">
              <PrUpload getImage={getEmployeeIdCard} shape="square" ratio={{ x: 3, y: 2 }} className="w-full" />
            </div>
          </div>
          <div className="col-span-2 h-12">
            <PrDropdown label="Chức vụ/Vị trí" required options={DataRecruitmentPosition} ref={positionRef} />
          </div>
        </div>

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
            Đăng ký công ty
          </span>
        </div>
      </div>
    </WrapperPage>
  )
}
