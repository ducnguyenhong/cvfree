import { Editor } from '@tinymce/tinymce-react'
import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  DataCareer,
  DataCurrency,
  DataFormOfWork,
  DataGender,
  DataRecruitmentPosition,
  DataSalaryType
} from 'constants/data-employer'
import { SERVER_URL } from 'constants/index'
import vi from 'date-fns/locale/vi'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { JobPostingInfo } from 'models/job-posting-info'
import moment from 'moment'
import { useEffect, useRef, useState, RefObject } from 'react'
import DatePicker from 'react-datepicker'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { getValueDropdown, getDefaultDataDropdown } from 'utils/helper'
import { useRecoilState } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import { ResponseJobDetail } from 'models/response-api'
import { showNotify } from 'app/partials/pr-notify'

export const EmployerCreateJobPostings: React.FC = () => {
  const match = useRouteMatch()
  const jobId = get(match.params, 'id')
  const history = useHistory()
  const [jobDetail, setJobDetail] = useState<JobPostingInfo | null>(null)
  const [timeToApply, setTimeToApply] = useState<any>(new Date())
  const [city, setCity] = useState<OptionProps | null>(null)
  const [district, setDistrict] = useState<OptionProps | null>(null)
  const [addressInput, setAddressInput] = useState<
    { value: { district: string; city: string }; label: string } | undefined
  >(undefined)
  const addressRef = useRef<PrInputRefProps>(null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const [disableSalary, setDisableSalary] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [initJobDes, setInitJobDes] = useState<string>('')
  const [initReqCandidate, setInitReqCandidate] = useState<string>('')
  const [initBenefit, setInitBenefit] = useState<string>('')

  // ref
  const modalOutOfTurnRef = useRef<PrModalRefProps>(null)
  const modalNotifySuccessRef = useRef<PrModalRefProps>(null)
  const modalNotifyErrorRef = useRef<PrModalRefProps>(null)
  const modalAddressRef = useRef<PrModalRefProps>(null)
  const nameRef = useRef<PrInputRefProps>(null)
  const careerRef = useRef<PrDropdownRefProps>(null)
  const recruitmentPositionRef = useRef<PrDropdownRefProps>(null)
  const formOfWorkRef = useRef<PrDropdownRefProps>(null)
  const numberRecruitedRef = useRef<PrInputRefProps>(null)
  const genderRequirementRef = useRef<PrDropdownRefProps>(null)
  const salaryFromRef = useRef<PrInputRefProps>(null)
  const salaryTypeRef = useRef<PrDropdownRefProps>(null)
  const salaryToRef = useRef<PrInputRefProps>(null)
  const salaryCurrencyRef = useRef<PrDropdownRefProps>(null)
  const jobDescriptionRef = useRef<Editor | null>(null)
  const requirementForCandidateRef = useRef<Editor | null>(null)
  const benefitToEnjoyRef = useRef<Editor | null>(null)

  const resetInput = () => {
    nameRef.current?.reset()
    addressRef.current?.reset()
    setCity(null)
    numberRecruitedRef.current?.reset()
    genderRequirementRef.current?.reset()
    setDisableDistrict(true)
    careerRef.current?.reset()
    formOfWorkRef.current?.reset()
    recruitmentPositionRef.current?.reset()
    setTimeToApply(new Date())
    setDisableSalary(true)
    salaryFromRef.current?.reset()
    salaryToRef.current?.reset()
    salaryCurrencyRef.current?.reset()
    salaryTypeRef.current?.reset()
    jobDescriptionRef.current?.editor?.setContent('')
    requirementForCandidateRef.current?.editor?.setContent('')
    benefitToEnjoyRef.current?.editor?.setContent('')
  }

  const callApiCreate = (data: JobPostingInfo) => {
    const url = jobId ? `${SERVER_URL}/jobs/${jobId}` : `${SERVER_URL}/jobs`
    const accessToken = Cookies.get('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: jobId ? 'PUT' : 'POST',
      headers,
      url,
      data
    }

    axios(config)
      .then((response) => {
        const { success, error, message } = response.data
        if (!success) {
          throw Error(error)
        }

        if (jobId) {
          showNotify.success(message)
          callApiJobDetail()
        } else {
          // modalNotifySuccessRef.current?.show()
          showNotify.success(message)
          if (userInfo && userInfo.numberOfPosting && !jobId) {
            setUserInfo({ ...userInfo, numberOfPosting: userInfo.numberOfPosting - 1 })
          }
          history.push('/employer/manage-job')
          resetInput()
        }
      })
      .catch((e) => {
        // setLoading(false)
        if (jobId) {
          showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
        } else {
          setErrorMessage(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
        }
      })
  }

  const validate = () => {
    if (!nameRef.current?.checkRequired()) {
      return false
    }
    if (!addressRef.current?.checkRequired()) {
      return false
    }
    if (!careerRef.current?.checkRequired()) {
      return false
    }
    if (!recruitmentPositionRef.current?.checkRequired()) {
      return false
    }
    if (!formOfWorkRef.current?.checkRequired()) {
      return false
    }
    if (!salaryTypeRef.current?.checkRequired()) {
      return false
    }
    if (salaryTypeRef.current.getValue()[0].value === 'FROM_TO') {
      if (!salaryFromRef.current?.checkRequired()) {
        return false
      }
      if (!salaryToRef.current?.checkRequired()) {
        return false
      }
      if (!salaryCurrencyRef.current?.checkRequired()) {
        return false
      }
    }
    return true
  }

  const onCreateJobPosting = () => {
    if (!validate()) {
      return
    }
    const data: JobPostingInfo = {
      name: nameRef.current?.getValue() ?? '',
      address: addressInput,
      career: getValueDropdown(careerRef.current?.getValue()),
      recruitmentPosition: getValueDropdown(recruitmentPositionRef.current?.getValue()),
      timeToApply: moment(timeToApply).valueOf(),
      formOfWork: getValueDropdown(formOfWorkRef.current?.getValue()),
      numberRecruited: parseInt(numberRecruitedRef.current?.getValue() ?? '1'),
      genderRequirement: getValueDropdown(genderRequirementRef.current?.getValue()),
      salary: {
        salaryType: salaryTypeRef.current?.getValue()[0].value || '',
        salaryFrom: salaryFromRef.current?.getValue() ?? '0',
        salaryTo: salaryToRef.current?.getValue() ?? '0',
        salaryCurrency: getValueDropdown(salaryCurrencyRef.current?.getValue())[0]
      },
      jobDescription: jobDescriptionRef.current?.editor?.getContent() || '',
      requirementForCandidate: requirementForCandidateRef.current?.editor?.getContent() || '',
      benefitToEnjoy: benefitToEnjoyRef.current?.editor?.getContent() || '',
      status: 'ACTIVE'
    }

    callApiCreate(data)
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

  const callApiJobDetail = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/jobs/${jobId}`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers,
      url,
      data: undefined,
      timeout: 20000
    }

    axios(config)
      .then((response: AxiosResponse<ResponseJobDetail>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setJobDetail(data.jobDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (jobId) {
      callApiJobDetail()
    }
  }, [jobId])

  useEffect(() => {
    document.title = `CVFREE | ${jobId ? 'Chỉnh sửa' : 'Tạo'} tin tuyển dụng`
  }, [])

  useEffect(() => {
    if (jobDetail) {
      const {
        name,
        address,
        career,
        recruitmentPosition,
        timeToApply,
        formOfWork,
        numberRecruited,
        genderRequirement,
        salary,
        jobDescription,
        requirementForCandidate,
        benefitToEnjoy
      } = jobDetail

      nameRef.current?.setValue(name)
      addressRef.current?.setValue(address?.label || '')
      careerRef.current?.setValue(getDefaultDataDropdown(DataCareer, career))
      recruitmentPositionRef.current?.setValue(getDefaultDataDropdown(DataRecruitmentPosition, recruitmentPosition))
      setTimeToApply(timeToApply)
      formOfWorkRef.current?.setValue(getDefaultDataDropdown(DataFormOfWork, formOfWork))
      numberRecruitedRef.current?.setValue(`${numberRecruited}`)
      genderRequirementRef.current?.setValue(getDefaultDataDropdown(DataGender, genderRequirement))
      salaryTypeRef.current?.setValue(getDefaultDataDropdown(DataSalaryType, [salary.salaryType]))
      if (salary.salaryType === 'FROM_TO') {
        setDisableSalary(false)
        salaryFromRef.current?.setValue(`${salary.salaryFrom}`)
        salaryToRef.current?.setValue(`${salary.salaryTo}`)
        salaryCurrencyRef.current?.setValue(getDefaultDataDropdown(DataCurrency, [salary.salaryCurrency || '']))
      }
      setInitJobDes(jobDescription)
      setInitReqCandidate(requirementForCandidate)
      setInitBenefit(benefitToEnjoy)
    }
  }, [jobDetail, jobDescriptionRef])

  useEffect(() => {
    if (userInfo && Number(userInfo?.numberOfPosting) < 1 && !jobId) {
      modalOutOfTurnRef.current?.show()
    }
  }, [userInfo])

  return (
    <WrapperPage title={jobId ? 'Cập nhật tin tuyển dụng' : 'Đăng tin tuyển dụng'}>
      <div className="mt-20 px-10">
        <span className="block text-lg font-semibold uppercase">1. Thông tin cơ bản</span>
        <div className="mt-8">
          <PrInput label="Tên việc làm" icon="fas fa-address-card" required ref={nameRef} />
        </div>
        <div className="mt-8">
          <PrInput
            label="Địa chỉ làm việc"
            icon="fas fa-map-marker-alt"
            ref={addressRef}
            required
            onFocus={() => modalAddressRef.current?.show()}
          />
        </div>
        <div className="mt-8">
          <PrDropdown
            required
            ref={careerRef}
            options={DataCareer}
            label="Ngành nghề"
            isMulti
            labelClassName="text-green-700 font-semibold"
          />
        </div>
        <div className="mt-8 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              required
              ref={recruitmentPositionRef}
              options={DataRecruitmentPosition}
              label="Vị trí cần tuyển dụng"
              isMulti
              labelClassName="text-green-700 font-semibold"
            />
          </div>
          <div className="col-span-1">
            <span className="block text-green-700 font-semibold mb-1">Hạn nộp hồ sơ</span>
            <div className="border border-gray-300 rounded overflow-hidden">
              <DatePicker
                wrapperClassName="w-full"
                dateFormat="dd/MM/yyyy"
                className="w-full h-9 px-4"
                selected={timeToApply}
                onChange={(e) => setTimeToApply(e)}
                popperPlacement="auto"
                locale={vi}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              required
              ref={formOfWorkRef}
              options={DataFormOfWork}
              label="Hình thức làm việc"
              isClearable={false}
              isMulti
              labelClassName="text-green-700 font-semibold"
            />
          </div>
          <div className="col-span-1">
            <PrInput
              label="Số lượng cần tuyển (người)"
              icon="fas fa-users"
              required
              ref={numberRecruitedRef}
              type="number"
            />
          </div>
        </div>
        <div className="mt-8 grid-cols-2 grid gap-x-20">
          <div className="col-span-1">
            <PrDropdown
              ref={genderRequirementRef}
              options={DataGender}
              label="Yêu cầu giới tính"
              labelClassName="text-green-700 font-semibold"
            />
          </div>
        </div>
        <div className="mt-8">
          <span className="block text-green-700 font-semibold">
            Mức lương<span className="text-red-500 ml-1">*</span>
          </span>
          <div className="grid grid-cols-7 gap-x-10 mt-2">
            <div className="col-span-2">
              <PrDropdown
                ref={salaryTypeRef}
                options={DataSalaryType}
                isClearable={false}
                label="Hình thức"
                labelClassName="text-green-700 font-semibold"
                onChange={(e: any) => setDisableSalary(!(e && e.value === 'FROM_TO'))}
              />
            </div>
            <div className="col-span-2">
              <PrInput label="Từ" icon="fas fa-coins" isCurrency ref={salaryFromRef} disabled={disableSalary} />
            </div>
            <div className="col-span-2">
              <PrInput label="Đến" icon="fas fa-coins" isCurrency ref={salaryToRef} disabled={disableSalary} />
            </div>
            <div className="col-span-1">
              <PrDropdown
                ref={salaryCurrencyRef}
                isClearable={false}
                defaultValue={DataCurrency[0]}
                options={DataCurrency}
                label="Đơn vị"
                isDisabled={disableSalary}
                labelClassName="text-green-700 font-semibold"
              />
            </div>
          </div>
        </div>

        <span className="block text-lg font-semibold uppercase mt-28">2. Mô tả công việc</span>
        <div className="mt-8">
          <Editor
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            ref={jobDescriptionRef}
            initialValue={initJobDes}
            init={{
              placeholder: 'Mô tả chi tiết về công việc đang tuyển dụng',
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
          />
        </div>

        <span className="block text-lg font-semibold uppercase mt-28">3. Yêu cầu ứng viên</span>
        <div className="mt-8">
          <Editor
            initialValue={initReqCandidate}
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            ref={requirementForCandidateRef}
            init={{
              placeholder: 'Đưa ra các yêu cầu về ứng viên cần tuyển dụng',
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
          />
        </div>

        <span className="block text-lg font-semibold uppercase mt-28">4. Quyền lợi được hưởng</span>
        <div className="mt-8">
          <Editor
            initialValue={initBenefit}
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            ref={benefitToEnjoyRef}
            init={{
              placeholder: 'Nêu các quyền lợi mà ứng viên sẽ được hưởng',
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
          />
        </div>

        <div className="mt-20 text-center pb-20">
          <span
            onClick={onCreateJobPosting}
            className="bg-blue-500 text-white rounded px-6 py-3 uppercase text-lg font-semibold cursor-pointer hover:bg-blue-600 duration-300"
          >
            <i className="fas fa-paper-plane mr-3"></i>
            {jobId ? 'Cập nhật' : 'Đăng tin'}
          </span>
        </div>
      </div>

      <PrModal ref={modalNotifySuccessRef} title="Thông báo" disableFooter>
        <div className="py-16 px-10">
          <span className="text-green-600 block text-center font-semibold text-xl">
            <i className="fas fa-check-circle mr-2" /> Đăng tin tuyển dụng thành công
          </span>
          <span className="block text-center mt-10 font-medium text-lg">
            Bạn có thể theo dõi trong
            <Link to="/employer/manage-job" className="text-red-500 ml-3">
              Quản lý tin tuyển dụng
            </Link>
          </span>
        </div>
      </PrModal>

      <PrModal ref={modalNotifyErrorRef} title="Thông báo" disableFooter>
        <div className="py-16 px-10">
          <span className="text-red-500 block text-center font-semibold text-xl">
            <i className="fas fa-times-circle mr-2" /> Đăng tin tuyển dụng không thành công
          </span>
          <span className="block text-center mt-10 font-medium text-lg">
            Lỗi: <span>{errorMessage}</span>
          </span>
        </div>
      </PrModal>

      <PrModal
        title="Thông báo"
        disableX
        ref={modalOutOfTurnRef}
        disableFooter
        onHide={() => modalOutOfTurnRef.current?.hide()}
      >
        <div className="py-20 px-10">
          <span className="block text-center font-semibold text-lg">Bạn đã sử dụng hết số lượt đăng tin</span>
          <div className="mt-16 text-center flex items-center justify-center">
            <Link
              to="/employer/manage-job"
              className="px-6 py-2.5 rounded-md text-white bg-green-600 text-md font-semibold duration-300 hover:bg-green-700"
            >
              Xem danh sách tin tuyển dụng đã đăng
            </Link>
          </div>
        </div>
      </PrModal>

      <PrModal
        ref={modalAddressRef}
        title={'Chọn địa chỉ'}
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
    </WrapperPage>
  )
}
