import { BreadCrumb } from 'app/pages/bread-crumb'
import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { showNotify } from 'app/partials/pr-notify'
import { userInfoState } from 'app/states/user-info-state'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { SERVER_URL } from 'constants/index'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { CandidateInfo } from 'models/candidate-info'
import { EmployerInfo } from 'models/employer-info'
import { JobPostingInfo } from 'models/job-posting-info'
import { ResponseEmployerDetail, ResponseListCandidate, ResponseListJob } from 'models/response-api'
import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { slugURL } from 'utils/helper'

export const EmployerRecruitment: React.FC = () => {
  const [jobList, setJobList] = useState<JobPostingInfo[] | null>(null)
  const [candidateList, setCandidateList] = useState<CandidateInfo[] | null>(null)
  const userInfo = useRecoilValue(userInfoState)
  const [employerInfo, setEmployerInfo] = useState<EmployerInfo | null>(null)
  const modalNotify = useRef<PrModalRefProps>(null)
  const modalListCandidateRef = useRef<PrModalRefProps>(null)
  const history = useHistory()

  const callApiEmployerDetail = () => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/employer/${userInfo?.id}`
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
      .then((response: AxiosResponse<ResponseEmployerDetail>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setEmployerInfo(data.employerDetail)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const callApiListJob = useCallback(() => {
    const accessToken = Cookies.get('token')
    const url = `${SERVER_URL}/jobs`
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
      .then((response: AxiosResponse<ResponseListJob>) => {
        const { success, data, error } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setJobList(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }, [])

  const callApiListCandidate = (listCandidate: string[]) => {
    const accessToken = Cookies.get('token')
    let ids = ''
    for (let i = 0; i < listCandidate.length; i++) {
      ids += listCandidate[i] + ','
    }
    ids = ids.substring(0, ids.length - 1)
    const url = `${SERVER_URL}/candidate/informations=${ids}`
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

    console.log('ducnh4', config)

    axios(config)
      .then((response: AxiosResponse<ResponseListCandidate>) => {
        const { success, error, data } = response.data

        if (!success) {
          throw Error(error?.message)
        }
        setCandidateList(data.items)
      })
      .catch((e) => {
        showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
      })
  }

  const onShowListCandidate = (listCandidate: string[]) => {
    callApiListCandidate(listCandidate)
    modalListCandidateRef.current?.show()
  }

  const onHideNotify = () => {
    modalNotify.current?.hide()
  }

  const onCreateJobPosting = () => {
    if (!employerInfo?.companyId) {
      modalNotify.current?.show()
      return
    }
    history.push('/employer/create-job-postings')
  }

  useEffect(() => {
    callApiListJob()
    callApiEmployerDetail()
  }, [])

  if (!jobList || !userInfo) {
    return <div>Loading</div>
  }

  return (
    <div className="py-32 w-2/3 mx-auto">
      <BreadCrumb title="Quản lý tin tuyển dụng" />
      <div className="shadow bg-blue-50 border-gray-300 px-8 py-10 mt-10">
        <div className="flex justify-between items-center">
          <span className="block uppercase text-xl font-bold text-gray-700">Danh sách tin tuyển dụng đã đăng</span>
          <span
            onClick={onCreateJobPosting}
            // to="/employer/create-job-postings"
            className="px-4 py-1.5 block bg-green-500 rounded-md duration-300 hover:bg-green-600"
          >
            <i className="fas fa-plus mr-3 text-white" />
            <span className="text-white font-semibold cursor-pointer">Đăng tin tuyển dụng</span>
          </span>
        </div>
        <div className="mange-list-cv mt-10">
          {jobList && jobList.length === 0 && <div>Chưa có tin tuyển dụng nào</div>}

          {jobList &&
            jobList.length > 0 &&
            jobList.map((item) => {
              const { name, createdAt, updatedAt, timeToApply, _id, candidateApplied } = item
              // const { fullname } = detail
              return (
                <div
                  className="py-5 items-center gap-x-4 border border-dashed border-gray-300 rounded mb-12"
                  key={`cv_${_id}`}
                >
                  <div>
                    <div>
                      <span className="block font-bold text-xl text-green-600">{name}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <div>
                          <i className="far fa-clock mr-2"></i>
                          <span>{candidateApplied?.length} ứng viên đã ứng tuyển</span>
                        </div>
                        {candidateApplied && candidateApplied?.length > 0 && (
                          <span
                            onClick={() => onShowListCandidate(candidateApplied || [])}
                            className="block font-semibold text-red-500 cursor-pointer"
                          >
                            Xem danh sách ứng viên
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <div>
                          <i className="far fa-clock mr-2"></i>
                          <span>Thời hạn ứng tuyển</span>
                        </div>
                        <span className="block">{timeToApply && moment(timeToApply).format('DD/MM/YYYY')}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <div>
                          <i className="far fa-clock mr-2"></i>
                          <span>Ngày tạo</span>
                        </div>
                        <span className="block">{createdAt && moment(createdAt).format('DD/MM/YYYY HH:mm')}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between">
                        <div>
                          <i className="fas fa-history mr-2"></i>
                          <span>Ngày sửa</span>
                        </div>
                        <span className="block">{updatedAt && moment(updatedAt).format('DD/MM/YYYY HH:mm')}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-x-16 mt-5">
                      <Link
                        to={`/jobs/${slugURL(name)}.${_id}`}
                        className="col-span-1 bg-green-600 py-1 rounded flex justify-center items-center hover:bg-green-700 duration-300"
                      >
                        <i className="fas fa-eye mr-2 text-white"></i>
                        <span className="text-white">Xem</span>
                      </Link>
                      <Link
                        to="/edit-cv/"
                        className="col-span-1 py-1 bg-purple-700 rounded flex justify-center items-center hover:bg-purple-800 duration-300"
                      >
                        <i className="fas fa-edit mr-2 text-white"></i>
                        <span className="text-white">Sửa</span>
                      </Link>
                      <span className="col-span-1 py-1 cursor-pointer bg-red-700 rounded flex justify-center items-center hover:bg-red-800 duration-300">
                        <i className="fas fa-edit mr-2 text-white"></i>
                        <span className="text-white">Xóa</span>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <PrModal title="Thông báo" disableFooter onHide={onHideNotify} ref={modalNotify}>
        <div className="px-10 py-16">
          <span className="block text-xl font-semibold text-center">
            Để đăng tin tuyển dụng, hãy cập nhật thông tin về công ty của bạn
          </span>
          <div className="flex justify-center">
            <Link
              to="/employer/company-info"
              className="inline-block mx-auto mt-10 font-semibold text-white bg-green-600 px-4 py-2 rounded"
            >
              Cập nhật ngay
            </Link>
          </div>
        </div>
      </PrModal>

      <PrModal
        title="Thông báo"
        disableFooter
        onHide={() => modalListCandidateRef.current?.hide()}
        ref={modalListCandidateRef}
      >
        <div className="px-5 py-10">
          <span className="block text-xl font-semibold text-center">Danh sách ứng viên ứng tuyển</span>
          <div className="flex justify-center mt-10">
            {candidateList &&
              candidateList.length > 0 &&
              candidateList.map((item) => {
                const { fullname, cvId, gender, avatar } = item
                return (
                  <div key={`candidate_${cvId}`} className="grid grid-cols-5 gap-x-8">
                    <div className="col-span-1 px-2">
                      <img src={avatar} alt="avatar" />
                    </div>
                    <div className="col-span-2">
                      {fullname} {gender}
                    </div>
                    <a
                      href={`/cv-public/${slugURL(fullname)}.${cvId}`}
                      className="block col-span-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem CV
                    </a>
                    <div className="col-span-1">Hành động</div>
                  </div>
                )
              })}
          </div>
        </div>
      </PrModal>
    </div>
  )
}
