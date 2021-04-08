import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrDropdown, { PrDropdownRefProps } from 'app/partials/pr-dropdown'
import {
  DataFormOfWork,
  DataRecruitmentPosition,
  DataGender,
  DataRecruitmentProfession,
  DataCurrency
} from 'constants/data-employer'
import DatePicker from 'react-datepicker'
import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { BreadCrumb } from 'app/pages/bread-crumb'
import vi from 'date-fns/locale/vi'
import { DropdownAsync, OptionProps } from 'app/partials/dropdown-async'
import { JobPostingInfo } from 'models/job-posting-info'
import { getValueDropdown } from 'utils/helper'
import moment from 'moment'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { showNotify } from 'app/partials/pr-notify'
import { get } from 'lodash'

export const EmployerCreateJobPostings: React.FC = () => {
  const [timeToApply, setTimeToApply] = useState<any>(new Date())
  const [city, setCity] = useState<OptionProps | null>(null)
  const [address, setAddress] = useState<{ value: { district: string; city: string }; label: string } | null>(null)
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true)
  const [jobDescription, setJobDescription] = useState<string>('')
  const [requirementForCandidate, setRequirementForCandidate] = useState<string>('')
  const [benefitToEnjoy, setBenefitToEnjoy] = useState<string>('')

  // ref
  const nameRef = useRef<PrInputRefProps>(null)
  const careerRef = useRef<PrDropdownRefProps>(null)
  const recruitmentPositionRef = useRef<PrDropdownRefProps>(null)
  const formOfWorkRef = useRef<PrDropdownRefProps>(null)
  const numberRecruitedRef = useRef<PrInputRefProps>(null)
  const genderRequirementRef = useRef<PrDropdownRefProps>(null)
  const salaryFromRef = useRef<PrInputRefProps>(null)
  const salaryToRef = useRef<PrInputRefProps>(null)
  const salaryCurrencyRef = useRef<PrDropdownRefProps>(null)

  const callApiCreate = (data: JobPostingInfo) => {
    const url = `${SERVER_URL}/jobs`

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

  const onCreateJobPosting = () => {
    const data: JobPostingInfo = {
      name: nameRef.current?.getValue() ?? '',
      address,
      career: getValueDropdown(careerRef.current?.getValue()),
      recruitmentPosition: getValueDropdown(recruitmentPositionRef.current?.getValue()),
      timeToApply: moment(timeToApply).valueOf(),
      formOfWork: getValueDropdown(formOfWorkRef.current?.getValue()),
      numberRecruited: parseInt(numberRecruitedRef.current?.getValue() ?? '1'),
      genderRequirement: getValueDropdown(genderRequirementRef.current?.getValue()),
      salary: {
        salaryType: 'FROM_TO', // AGREE
        salaryFrom: parseInt(salaryFromRef.current?.getValue() ?? '0'),
        salaryTo: parseInt(salaryToRef.current?.getValue() ?? '0'),
        salaryCurrency: getValueDropdown(salaryCurrencyRef.current?.getValue())[0]
      },
      jobDescription,
      requirementForCandidate,
      benefitToEnjoy,
      status: 'ACTIVE'
    }

    console.log('ducnh2', data)
  }

  return (
    <div className="w-2/3 py-32 mx-auto">
      <BreadCrumb title="Đăng tin tuyển dụng mới" />
      <div className="mt-10 bg-blue-50 px-16 py-10 shadow rounded">
        <span className="block text-lg font-semibold uppercase">1. Thông tin cơ bản</span>
        <div className="mt-8">
          <PrInput label="Tên công việc" icon="fas fa-address-card" required ref={nameRef} />
        </div>
        <div className="mt-8">
          <span className="block text-green-700 font-semibold">
            Địa chỉ làm việc<span className="text-red-500 ml-1">*</span>
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
        </div>
        <div className="mt-8">
          <PrDropdown
            required
            ref={careerRef}
            options={DataRecruitmentProfession}
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
            <PrInput label="Số lượng cần tuyển (người)" icon="fas fa-users" required ref={numberRecruitedRef} />
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
          <div className="grid grid-cols-7 gap-x-10 mt-2 pl-10">
            <div className="col-span-2">
              <PrInput label="Từ" icon="fas fa-coins" ref={salaryFromRef} />
            </div>
            <div className="col-span-2">
              <PrInput label="Đến" icon="fas fa-coins" ref={salaryToRef} />
            </div>
            <div className="col-span-1">
              <PrDropdown
                ref={salaryCurrencyRef}
                options={DataCurrency}
                label="Đơn vị"
                labelClassName="text-green-700 font-semibold"
              />
            </div>
            <div className="col-span-2">
              <span>hoặc</span>
              <input type="radio" />
              thỏa thuận
            </div>
          </div>
        </div>

        <span className="block text-lg font-semibold uppercase mt-28">2. Mô tả công việc</span>
        <div className="mt-8">
          <Editor
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            initialValue="<p>M&ocirc; tả c&ocirc;ng việc l&agrave;m a</p>"
            init={{
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
            onEditorChange={(e) => {
              setJobDescription(e)
            }}
          />
        </div>

        <span className="block text-lg font-semibold uppercase mt-28">3. Yêu cầu ứng viên</span>
        <div className="mt-8">
          <Editor
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            initialValue="<p>Mô tả công việc</p>"
            init={{
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
            onEditorChange={(e) => {
              setRequirementForCandidate(e)
            }}
          />
        </div>

        <span className="block text-lg font-semibold uppercase mt-28">4. Quyền lợi được hưởng</span>
        <div className="mt-8">
          <Editor
            apiKey="59sr9opfpahrgsu12eontg1qxohmci93evk3ahxx125hx0jj"
            initialValue="<p>Mô tả công việc</p>"
            init={{
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
            onEditorChange={(e) => {
              setBenefitToEnjoy(e)
            }}
          />
        </div>

        <div className="mt-20 text-center">
          <span
            onClick={onCreateJobPosting}
            className="bg-blue-500 text-white rounded px-6 py-3 uppercase text-lg font-semibold cursor-pointer"
          >
            Đăng tin ngay
          </span>
        </div>
      </div>
    </div>
  )
}
