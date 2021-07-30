import { DropdownAsync, DropdownAsyncRef } from 'app/partials/dropdown-async'
import { WrapperPage } from 'app/partials/layout/wrapper-page'
import PrInput, { PrInputRefProps } from 'app/partials/pr-input'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify'
import { userInfoState } from 'app/states/user-info-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DataCareer, DataFormOfWork, DataGender, DataRecruitmentPosition } from 'constants/data-employer'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { JobPostingInfo } from 'models/job-posting-info'
import { ResponseDefault, ResponseJobDetail } from 'models/response-api'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { List } from 'react-content-loader'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { getDefaultLabelDropdown, uploadServer } from 'utils/helper'
import { v4 as uuid } from 'uuid'
import { useIntl } from 'react-intl'

interface DataApply {
  applyType: 'CVFREE' | 'PDF' | 'OTHER'
  applyValue: string
}

export const JobDetail: React.FC = () => {
  const [jobInfo, setJobInfo] = useState<JobPostingInfo | undefined | null>(undefined)
  const match = useRouteMatch()
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const jobId = get(match.params, 'id')
  const modalNeedLoginRef = useRef<PrModalRefProps>(null)
  const modalConfirmApplyRef = useRef<PrModalRefProps>(null)
  const modalNotifyReportRef = useRef<PrModalRefProps>(null)
  const modalNotifyOutOfTurnReportRef = useRef<PrModalRefProps>(null)
  const modalReportJobRef = useRef<PrModalRefProps>(null)
  const history = useHistory()
  const cvSelectedRef = useRef<DropdownAsyncRef>(null)
  const [errMessageApply, setErrMessageApply] = useState<string>('')
  const intl = useIntl()

  const [disableWay1, setDisableWay1] = useState<boolean>(false)
  const [disableWay2, setDisableWay2] = useState<boolean>(false)
  const [disableWay3, setDisableWay3] = useState<boolean>(false)
  const urlCvOtherRef = useRef<PrInputRefProps>(null)
  const [fileCvWay2, setFileCvWay2] = useState<File | null>(null)

  const reporterFullname = useRef<PrInputRefProps>(null)
  const reporterContent = useRef<PrInputRefProps>(null)
  const reporterPhone = useRef<PrInputRefProps>(null)

  const callApiJobDetail = (jobId: string) => {
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
        setJobInfo(data.jobDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiApply = (data: DataApply) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/jobs/${jobId}/candidate-apply`
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
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, error, message } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        callApiJobDetail(jobId)
        modalConfirmApplyRef.current?.hide()
        showNotify.success(intl.formatMessage({ id: `API.${message}` }))
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiReportJob = (data: any) => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/report-job`
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
      .then((response: AxiosResponse<ResponseDefault>) => {
        const { success, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        modalReportJobRef.current?.hide()
        if (userInfo) {
          setUserInfo({ ...userInfo, numberOfReportJob: 0 })
        }
        modalNotifyReportRef.current?.show()
      })
      .catch((e) => {
        modalReportJobRef.current?.hide()
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  useEffect(() => {
    if (jobInfo) {
      document.title = `CVFREE | ${jobInfo.name}`
    }
  }, [jobInfo])

  useEffect(() => {
    if (jobId) {
      callApiJobDetail(jobId)
    }
  }, [jobId])

  if (typeof jobInfo === 'undefined') {
    return <List />
  }

  if (jobInfo === null) {
    return <div>Không tồn tại công việc này</div>
  }

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
    benefitToEnjoy,
    isApplied,
    company
  } = jobInfo

  const onReportJob = () => {
    if (!userInfo) {
      modalNeedLoginRef.current?.show()
    } else {
      userInfo.numberOfReportJob && userInfo.numberOfReportJob > 0
        ? modalReportJobRef.current?.show()
        : modalNotifyOutOfTurnReportRef.current?.show()
    }
  }

  const onShowApplyJob = () => {
    if (isApplied || moment(timeToApply).valueOf() < moment().valueOf()) {
      return
    }
    if (!userInfo) {
      modalNeedLoginRef.current?.show()
    }
    if (userInfo?.type === 'USER') {
      modalConfirmApplyRef.current?.show()
    }
  }

  const onGoToSignIn = () => {
    localStorage.setItem('redirect-to', location.pathname)
    history.push('/sign-in')
  }

  const onApplyJob = async () => {
    if (!validateApply()) {
      return
    }
    if (!disableWay1) {
      // tức đang chọn cách 1
      const data: DataApply = {
        applyType: 'CVFREE',
        applyValue: cvSelectedRef.current?.getValue()[0].value || ''
      }
      callApiApply(data)
    }

    if (!disableWay2) {
      // tức đang chọn cách 2
      const urlPDF = fileCvWay2 ? await uploadServer(fileCvWay2, uuid(), 'pdf', 'pdf') : ''
      const data: DataApply = {
        applyType: 'PDF',
        applyValue: urlPDF
      }
      callApiApply(data)
    }

    if (!disableWay3) {
      // tức đang chọn cách 3
      const data: DataApply = {
        applyType: 'OTHER',
        applyValue: urlCvOtherRef.current?.getValue() || ''
      }
      callApiApply(data)
    }
  }

  const onHideApplyJob = () => {
    setErrMessageApply('')
    setDisableWay1(false)
    setDisableWay2(false)
    setDisableWay3(false)
    setFileCvWay2(null)
    cvSelectedRef.current?.reset()
    urlCvOtherRef.current?.reset()
    modalConfirmApplyRef.current?.hide()
  }

  const renderSalary = () => {
    if (salary.salaryType === 'AGREE') {
      return 'Thỏa thuận'
    }
    if (salary.salaryType === 'FROM_TO') {
      const salaryFrom = Number(salary.salaryFrom?.replaceAll('.', '')).toLocaleString('it-IT', {
        style: 'currency',
        currency: salary.salaryCurrency
      })
      const salaryTo = Number(salary.salaryTo?.replaceAll('.', '')).toLocaleString('it-IT', {
        style: 'currency',
        currency: salary.salaryCurrency
      })
      return `${salaryFrom} đến ${salaryTo}`
    }
  }

  const renderClassNameApply = () => {
    if (timeToApply.valueOf() < moment().valueOf()) {
      return 'bg-gray-600'
    } else {
      return isApplied ? 'bg-purple-600' : 'cursor-pointer bg-green-600 hover:bg-green-500'
    }
  }

  const renderTitleApply = () => {
    if (timeToApply.valueOf() < moment().valueOf()) {
      return 'Đã hết hạn'
    } else {
      return isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'
    }
  }

  const validateReport = () => {
    if (!reporterFullname.current?.checkRequired()) {
      return false
    }
    if (!reporterPhone.current?.checkRequired()) {
      return false
    }
    if (!reporterContent.current?.checkRequired()) {
      return false
    }
    return true
  }

  const validateApply = () => {
    if (cvSelectedRef.current?.getValue().length === 0 && !urlCvOtherRef.current?.getValue() && !fileCvWay2) {
      setErrMessageApply('Hãy chọn 1 trong 3 cách ứng tuyển')
      return false
    }
    if (fileCvWay2) {
      const isFilePDF = fileCvWay2.name.split('.')[fileCvWay2.name.split('.').length - 1] === 'pdf'
      if (!isFilePDF) {
        setErrMessageApply('Hãy chọn file theo định dạng PDF')
      }
      return isFilePDF
    }
    return true
  }

  const onSendReport = () => {
    if (!validateReport()) {
      return
    }
    const fullname = reporterFullname.current?.getValue()
    const phone = reporterPhone.current?.getValue()
    const content = reporterContent.current?.getValue()
    const data = {
      reporter: { fullname, phone },
      job: { id: jobId },
      content
    }

    callApiReportJob(data)
  }

  return (
    <WrapperPage title="Chi tiết việc làm">
      {/* <div
        onClick={() => {
          const a = JSON.parse(jobInfo.name)
          alert(a)
        }}
      >
        Test sentry
      </div> */}
      <div className="px-8 py-10 mt-5">
        <div className="grid grid-cols-5 gap-x-10">
          <div className="col-span-1 px-4">
            <img src={company?.logo} alt="logo" />
          </div>
          <div className="col-span-4">
            <span className="font-semibold uppercase text-xl mb-2 block">{name}</span>
            <a
              href={`/companies/${company?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium mb-1"
            >
              <i className="fas fa-building mr-2 text-gray-600" />
              {company?.name}
            </a>
            <span className="block font-medium">
              <i className="fas fa-map-marker-alt mr-2 text-gray-600" />
              {address?.label}
            </span>
          </div>
        </div>
        <div className="mt-20">
          <span className="font-semibold block text-xl uppercase mb-3">1. Thông tin tuyển dụng</span>
          <div className="px-4 font-medium">
            <span className="block mb-1">- Ngành nghề: {getDefaultLabelDropdown(DataCareer, career)}</span>
            <span className="block mb-1">- Thời hạn nộp hồ sơ: {moment(timeToApply).format('DD/MM/YYYY')}</span>
            <span className="block mb-1">- Mức lương: {renderSalary()}</span>
            <span className="block mb-1">
              - Hình thức làm việc: {getDefaultLabelDropdown(DataFormOfWork, formOfWork)}
            </span>
            <span className="block mb-1">- Số lượng cần tuyển: {numberRecruited} người</span>
            <span className="block mb-1">
              - Vị trí cần tuyển dụng: {getDefaultLabelDropdown(DataRecruitmentPosition, recruitmentPosition)}
            </span>
            <span className="block mb-1">
              - Yêu cầu giới tính: {getDefaultLabelDropdown(DataGender, genderRequirement)}
            </span>
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">2. Mô tả công việc</span>
          <div>
            <div className="px-5 mt-3" dangerouslySetInnerHTML={{ __html: jobDescription }} />
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">3. Yêu cầu ứng viên</span>
          <div>
            <div className="px-5 mt-3" dangerouslySetInnerHTML={{ __html: requirementForCandidate }} />
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">4. Quyền lợi</span>
          <div>
            <div className="px-5 mt-3" dangerouslySetInnerHTML={{ __html: benefitToEnjoy }} />
          </div>
        </div>
        <div className="mt-16 text-center">
          {userInfo?.type !== 'EMPLOYER' && userInfo?.type !== 'ADMIN' && (
            <span
              onClick={onShowApplyJob}
              className={`${renderClassNameApply()} inline-block text-white px-5 py-3 rounded-md uppercase font-semibold duration-300`}
            >
              {renderTitleApply()}
            </span>
          )}
          {isApplied && (
            <span className="block mt-2">
              Xem chi tiết tại{' '}
              <Link to="/manage-apply" className="text-green-600 font-semibold">
                Quản lý ứng tuyển
              </Link>
            </span>
          )}
          <span className="block mt-3">(Hạn nộp hồ sơ: {moment(timeToApply).format('DD/MM/YYYY')})</span>
        </div>
        {userInfo?._id !== jobInfo.creatorId && (
          <div className="mt-10 flex justify-end">
            <span
              className="block cursor-pointer text-gray-400 font-medium duration-300 hover:text-gray-600"
              onClick={onReportJob}
            >
              <i className="fas fa-exclamation-triangle mr-1"></i> Báo cáo tin giả
            </span>
          </div>
        )}
      </div>

      <PrModal
        title="Yêu cầu đăng nhập"
        disableFooter
        position="fixed"
        onHide={() => modalNeedLoginRef.current?.hide()}
        ref={modalNeedLoginRef}
      >
        <div className="py-10 px-10 text-center">
          <span className="block text-center font-semibold text-xl">
            Để có thể sử dụng tính năng này, bạn cần đăng nhập vào hệ thống
          </span>
          <div>
            <span
              onClick={onGoToSignIn}
              className="inline-block bg-blue-500 px-4 py-2 mt-8 rounded cursor-pointer font-semibold text-white duration-300 hover:bg-blue-600"
            >
              Đăng nhập ngay
            </span>
            <span className="mx-8 font-medium">hoặc</span>
            <Link
              to="/sign-up"
              className="inline-block bg-green-500 px-4 py-2 mt-8 rounded cursor-pointer font-semibold text-white duration-300 hover:bg-green-600"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </PrModal>

      <PrModal
        title="Xác nhận ứng tuyển"
        position="fixed"
        onHide={onHideApplyJob}
        ref={modalConfirmApplyRef}
        onChange={onApplyJob}
        okTitle="Ứng tuyển"
        cancelTitle="Hủy"
      >
        <div className="py-10 px-10">
          <span className="block text-center font-semibold text-xl">Xác nhận ứng tuyển công việc này ?</span>
          <span className="block mt-4 font-semibold text-gray-600">
            <span className="text-red-500">*</span> Hãy chọn <span className="text-red-500">1</span> trong{' '}
            <span className="text-red-500">3</span> cách ứng tuyển sau:
          </span>
          <div className="px-5">
            <div className="mt-10">
              <span className="block font-semibold mb-2">
                1. Sử dụng hồ sơ tại CVFREE
                <span className="ml-4 text-green-500">
                  <i className="fas fa-check-circle mr-0.5 text-green-500" /> nên sử dụng
                </span>
              </span>
              <div className="w-1/2 ">
                <DropdownAsync
                  onChange={(e) => {
                    if (e.length > 0) {
                      setErrMessageApply('')
                      !disableWay2 && setDisableWay2(true)
                      !disableWay3 && setDisableWay3(true)
                    } else {
                      disableWay2 && setDisableWay2(false)
                      disableWay3 && setDisableWay3(false)
                    }
                  }}
                  isDisabled={disableWay1}
                  ref={cvSelectedRef}
                  isClearable
                  urlApi="/cvs/my-cvs/suggest"
                  isSearchable={false}
                />
              </div>
            </div>

            <div className="mt-10">
              <span className="block font-semibold mb-2">2. Tải hồ sơ của bạn lên (chỉ hỗ trợ file PDF)</span>
              <input
                type="file"
                className="block"
                accept=".pdf"
                disabled={disableWay2}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setErrMessageApply('')
                    setFileCvWay2(e.target.files[0])
                    !disableWay1 && setDisableWay1(true)
                    !disableWay3 && setDisableWay3(true)
                  } else {
                    setFileCvWay2(null)
                    disableWay1 && setDisableWay1(false)
                    disableWay3 && setDisableWay3(false)
                  }
                }}
              />
            </div>
            <div className="mt-10">
              <span className="block font-semibold mb-2">3. Sử dụng CV online của bạn ở hệ thống khác</span>
              <PrInput
                ref={urlCvOtherRef}
                placeholder="Nhập URL theo định dạng http/https..."
                disabled={disableWay3}
                onChange={(e) => {
                  if (e) {
                    setErrMessageApply('')
                    !disableWay1 && setDisableWay1(true)
                    !disableWay2 && setDisableWay2(true)
                  } else {
                    disableWay1 && setDisableWay1(false)
                    disableWay2 && setDisableWay2(false)
                  }
                }}
              />
            </div>
          </div>
          {disableWay1 && (
            <span className="mt-8 text-purple-600 block text-center font-medium">
              * Bạn đang không lựa chọn hồ sơ từ CVFREE, hãy đảm bảo rằng bạn đã cung cấp đầy đủ thông tin liên lạc
              (email, điện thoại, địa chỉ...) trong CV tải lên (hoặc từ hệ thống khác) để nhà tuyển dụng có thể liên hệ
              với bạn
            </span>
          )}
          {errMessageApply && <span className="mt-5 text-red-500 block text-center">{errMessageApply}</span>}
        </div>
      </PrModal>

      <PrModal
        title="Không thể báo cáo"
        onHide={() => modalNotifyOutOfTurnReportRef.current?.hide()}
        disableFooter
        position="fixed"
        ref={modalNotifyOutOfTurnReportRef}
      >
        <div className="py-16 px-10">
          <span className="block text-center font-semibold text-xl">Bạn đã gửi một báo cáo trước đó</span>
          <span className="block font-medium mt-10">
            Báo cáo trước đó của bạn đang được chúng tôi xem xét. Bạn chỉ có thể gửi thêm báo cáo mới cho đến khi báo
            cáo trước được xử lý xong.
          </span>
        </div>
      </PrModal>

      <PrModal
        title="Báo cáo tin tuyển dụng này"
        disableFooter
        position="fixed"
        onHide={() => modalReportJobRef.current?.hide()}
        ref={modalReportJobRef}
      >
        <div className="py-10 px-10">
          <div>
            <PrInput label="Họ và tên của bạn" required className="h-9" ref={reporterFullname} />
          </div>
          <div className="mt-5">
            <PrInput label="Số điện thoại" required className="h-9" ref={reporterPhone} />
          </div>
          <div className="mt-5">
            <PrInput
              label="Nội dung"
              placeholder="Ví dụ: giả mạo công ty ABC, mức lương không đúng..."
              required
              ref={reporterContent}
              type="textarea"
              divClassName="h-48"
            />
          </div>
          <div className="text-center">
            <span
              onClick={onSendReport}
              className="inline-block bg-red-500 px-4 py-2 mt-8 rounded cursor-pointer font-semibold text-white duration-300 hover:bg-red-600"
            >
              Gửi báo cáo
            </span>
          </div>
        </div>
      </PrModal>

      <PrModal
        title="Thông báo"
        disableFooter
        onHide={() => modalNotifyReportRef.current?.hide()}
        ref={modalNotifyReportRef}
      >
        <div className="py-10 px-10">
          <span className="block text-center font-semibold text-xl text-green-600">
            Báo cáo đã được gửi thành công!
          </span>
          <span className="block text-center mt-10 font-medium">
            Chúng tôi sẽ tiến hành xác thực thông tin và sẽ sớm phản hồi kết quả qua email của bạn.
          </span>
          <span className="italic font-medium block text-center mt-10">
            <span className="text-red-500">* Chú ý: </span>Trong trường hợp xảy ra tranh chấp khiếu nại, CVFREE sẽ tiến
            hành thu thập thông tin và đưa ra quyết định chính xác để đảm bảo quyền lợi cho tất cả người dùng.
            <br />
            Quyết định của CVFREE sẽ là quyết định cuối cùng.
          </span>
        </div>
      </PrModal>
    </WrapperPage>
  )
}
