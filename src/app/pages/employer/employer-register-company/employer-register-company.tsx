import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import {
  DataFormOfWork,
  DataRecruitmentPosition,
  DataGender,
  DataCareer,
  DataCurrency,
  DataPersonnelSize
} from 'constants/data-employer'
import DatePicker from 'react-datepicker'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { BreadCrumb } from 'app/pages/bread-crumb'
import vi from 'date-fns/locale/vi'
import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import { JobPostingInfo } from 'models/job-posting-info'
import { getValueDropdown, uploadServer } from 'utils/helper'
import moment from 'moment'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'
import PrUpload from 'app/partials/pr-upload'
import { CompanyInfo } from '../../../../models/company-info'
import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'

export const EmployerRegisterCompany: React.FC = () => {
  const [city, setCity] = useState<OptionProps | null>(null)
  const [address, setAddress] = useState<{ value: { district: string; city: string }; label: string } | null>(null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const [logo, setLogo] = useState<File | null>(null)
  const [background, setBackground] = useState<File | null>(null)
  const userInfo = useRecoilValue(userInfoState)

  // ref
  const nameRef = useRef<PrInputRefProps>(null)
  const emailRef = useRef<PrInputRefProps>(null)
  const phoneRef = useRef<PrInputRefProps>(null)
  const websiteRef = useRef<PrInputRefProps>(null)
  const taxCodeRef = useRef<PrInputRefProps>(null)
  const streetRef = useRef<PrInputRefProps>(null)
  const personnelSizeRef = useRef<PrDropdownRefProps>(null)
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
        const { success, message, error } = response.data
        if (!success) {
          throw Error(error)
        }

        showNotify.success(message)
        // setLoading(false)
        // resetInput()
      })
      .catch((e) => {
        // setLoading(false)
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onRegisterCompany = async () => {
    let logoUrl = ''
    let backgroundUrl = ''
    if (logo) {
      logoUrl = await uploadServer(logo, 'company')
    }
    if (background) {
      backgroundUrl = await uploadServer(background, 'company')
    }

    const data: CompanyInfo = {
      logo: logoUrl,
      staffList: [userInfo?.id || 0],
      background: backgroundUrl,
      name: nameRef.current?.getValue() ?? '',
      email: emailRef.current?.getValue() ?? '',
      phone: phoneRef.current?.getValue() ?? '',
      website: websiteRef.current?.getValue(),
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

  return (
    <div className="w-2/3 py-32 mx-auto">
      <BreadCrumb title="Đăng ký công ty" />
      <div className="mt-10 bg-blue-50 px-16 pt-5 pb-20 shadow rounded">
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
            <div className="w-1/2 mx-auto">
              <PrUpload getImage={getLogo} shape="square" />
            </div>
          </div>
          <div className="col-span-3">
            <span className="block text-green-700 font-semibold mb-2">Ảnh nền công ty</span>
            <div className="w-1/3 mx-auto">
              <PrUpload getImage={getBackground} shape="rectangle" ratio={{ x: 2, y: 1 }} />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <span className="block text-green-700 font-semibold">
            Địa chỉ công ty<span className="text-red-500 ml-1">*</span>
          </span>
          <div className="grid-cols-2 grid gap-x-12 pl-10 mt-2">
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
            <PrInput label="Tên đường/phố" icon="fas fa-map-marker-alt" ref={streetRef} />
          </div>
        </div>
        <div className="mt-8">
          <PrDropdown label="Quy mô nhân sự (người)" required options={DataPersonnelSize} ref={personnelSizeRef} />
        </div>
        <div className="mt-8">
          <PrInput label="Giới thiệu" type="textarea" ref={introRef} divClassName="h-44" />
        </div>

        <div className="mt-20 text-center">
          <span
            onClick={onRegisterCompany}
            className="bg-blue-500 text-white rounded px-6 py-3 uppercase text-lg font-semibold cursor-pointer"
          >
            Đăng ký công ty
          </span>
        </div>
      </div>
    </div>
  )
}
