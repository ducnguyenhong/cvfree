import { get } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { SERVER_URL } from 'constants/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DataCareer, DataGender, DataRecruitmentPosition, DataFormOfWork } from 'constants/data-employer'
import { ResponseDefault, ResponseJobDetail } from 'models/response-api'
import { JobPostingInfo } from 'models/job-posting-info'
import { showNotify } from 'app/partials/pr-notify'
import { List } from 'react-content-loader'
import { BreadCrumb } from 'app/pages/bread-crumb'
import moment from 'moment'
import { getDefaultLabelDropdown } from 'utils/helper'

import { useRecoilValue } from 'recoil'
import { userInfoState } from 'app/states/user-info-state'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { DropdownAsync, DropdownAsyncRef } from 'app/partials/dropdown-async'
import Cookies from 'js-cookie'
import PrInput from 'app/partials/pr-input'
import { WrapperPage } from 'app/partials/layout/wrapper-page'

export const JobDetail: React.FC = () => {
  const [jobInfo, setJobInfo] = useState<JobPostingInfo | undefined | null>(undefined)
  const match = useRouteMatch()
  const userInfo = useRecoilValue(userInfoState)
  const jobId = get(match.params, 'id')
  const modalNeedLoginRef = useRef<PrModalRefProps>(null)
  const modalConfirmApplyRef = useRef<PrModalRefProps>(null)
  const modalReportJobRef = useRef<PrModalRefProps>(null)
  const history = useHistory()
  const cvSelectedRef = useRef<DropdownAsyncRef>(null)
  const [errMessageApply, setErrMessageApply] = useState<string>('')

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

  const callApiApply = (cvId: string) => {
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
      data: {
        cvId
      },
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
        showNotify.success(message)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

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

  const onShowApplyJob = () => {
    if (isApplied) {
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

  const onApplyJob = () => {
    const cvSelected = cvSelectedRef.current?.getValue()
    if (!cvSelected || cvSelected.length === 0) {
      setErrMessageApply('Hãy chọn CV mà bạn muốn ứng tuyển')
      return
    }
    callApiApply(cvSelected[0].value)
  }

  const onHideApplyJob = () => {
    setErrMessageApply('')
    modalConfirmApplyRef.current?.hide()
  }

  const renderSalary = () => {
    if (salary.salaryType === 'AGREE') {
      return 'Thỏa thuận'
    }
    if (salary.salaryType === 'FROM_TO') {
      return `${salary.salaryFrom} đến ${salary.salaryTo} (${salary.salaryCurrency})`
    }
  }

  return (
    <WrapperPage title="Chi tiết việc làm">
      <div className="px-8 py-10 mt-5">
        <div className="grid grid-cols-5 gap-x-10">
          <div className="col-span-1 px-4">
            <img src={company?.logo} alt="logo" />
          </div>
          <div className="col-span-4">
            <span className="font-semibold uppercase text-xl mb-2 block">{name}</span>
            <span className="block font-medium mb-1">
              <i className="fas fa-building mr-2 text-gray-600" />
              {company?.name}
            </span>
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
            <div dangerouslySetInnerHTML={{ __html: jobDescription }} />
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">3. Yêu cầu ứng viên</span>
          <div>
            <div dangerouslySetInnerHTML={{ __html: requirementForCandidate }} />
          </div>
          <span className="font-semibold block text-xl uppercase mt-16">4. Quyền lợi</span>
          <div>
            <div dangerouslySetInnerHTML={{ __html: benefitToEnjoy }} />
          </div>
        </div>
        <div className="mt-16 text-center">
          {userInfo?.type !== 'EMPLOYER' && userInfo?.type !== 'ADMIN' && (
            <span
              onClick={onShowApplyJob}
              className={`${
                isApplied ? '' : 'cursor-pointer'
              } inline-block bg-green-600 text-white px-5 py-3 rounded-md uppercase font-semibold duration-300 hover:bg-green-500`}
            >
              {isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay'}
            </span>
          )}
          {isApplied && (
            <span className="block mt-2">
              Xem chi tiết tại{' '}
              <Link to="/manage-job-applied" className="text-green-600 font-semibold">
                Quản lý ứng tuyển
              </Link>
            </span>
          )}
          <span className="block mt-3">(Hạn nộp hồ sơ: {moment(timeToApply).format('DD/MM/YYYY')})</span>
        </div>
        <div className="mt-10 flex justify-end">
          <span
            className="block cursor-pointer text-red-500 font-semibold underline"
            onClick={() => modalReportJobRef.current?.show()}
          >
            Báo cáo tin giả
          </span>
        </div>
      </div>

      <PrModal
        title="Yêu cầu đăng nhập"
        disableFooter
        onHide={() => modalNeedLoginRef.current?.hide()}
        ref={modalNeedLoginRef}
      >
        <div className="py-10 px-10 text-center">
          <span className="block text-center font-semibold text-xl">Bạn chưa đăng nhập để ứng tuyển</span>
          <span
            onClick={onGoToSignIn}
            className="inline-block bg-blue-500 px-4 py-2 mt-8 rounded cursor-pointer font-semibld text-white"
          >
            Đăng nhập ngay
          </span>
        </div>
      </PrModal>

      <PrModal title="Xác nhận ứng tuyển" onHide={onHideApplyJob} ref={modalConfirmApplyRef} onChange={onApplyJob}>
        <div className="py-16 px-10">
          <span className="block text-center font-semibold text-xl">Xác nhận ứng tuyển công việc này</span>
          <div className="w-1/2 mt-10 mx-auto">
            <DropdownAsync
              required
              onChange={(e) => {
                if (e) {
                  setErrMessageApply('')
                }
              }}
              ref={cvSelectedRef}
              label="Chọn hồ sơ muốn ứng tuyển"
              urlApi="/cvs/my-cvs/suggest"
              isSearchable={false}
            />
          </div>
          {errMessageApply && <span className="mt-5 text-red-500 block text-center">{errMessageApply}</span>}
        </div>
      </PrModal>

      <PrModal
        title="Báo cáo tin tuyển dụng giả mạo"
        disableFooter
        onHide={() => modalReportJobRef.current?.hide()}
        ref={modalReportJobRef}
      >
        <div className="py-10 px-10">
          <div>
            <PrInput label="Tên của bạn" required className="h-9" />
          </div>
          <div className="mt-5">
            <PrInput label="Địa chỉ email" required className="h-9" />
          </div>
          <div className="mt-5">
            <PrInput
              label="Nội dung giả mạo"
              placeholder="Ví dụ: giả mạo công ty ABC, mức lương không đúng..."
              required
              type="textarea"
              divClassName="h-40"
            />
          </div>
          <div className="text-center">
            <span
              // onClick={onGoToSignIn}
              className="inline-block bg-red-500 px-4 py-2 mt-8 rounded cursor-pointer font-semibold text-white"
            >
              Gửi báo cáo
            </span>
          </div>
        </div>
      </PrModal>
    </WrapperPage>
  )
}
