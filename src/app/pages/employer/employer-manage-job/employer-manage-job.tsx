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
import { ResponseEmployerDetail, ResponseListCandidate, ResponseListJob, ResponseDefault } from 'models/response-api'
import moment from 'moment'
import { useCallback, useEffect, useRef, useState, memo } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { slugURL } from 'utils/helper'
import DefaultImage from 'assets/images/default-avatar.png'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { Table } from '@ekidpro/table'
import { Columns, TableLoader } from './employer-manage-job.data'
import { ModalApplyCandidate } from './apply-candidate/modal-apply-candidate'
import { PopupDeactive } from './popup-deactive-job'

export const prefix = 'employerManageJob'

export const EmployerManageJob: React.FC = () => {
  // const [jobList, setJobList] = useState<JobPostingInfo[] | null>(null)
  // const [candidateList, setCandidateList] = useState<CandidateInfo[] | null>(null)
  const userInfo = useRecoilValue(userInfoState)
  // const [currentJobId, setCurrentJobId] = useState<string>('')
  // const [currentCandidateId, setCurrentCandidateId] = useState<string>('')
  // const [employerInfo, setEmployerInfo] = useState<EmployerInfo | null>(null)
  // const modalNotifyRef = useRef<PrModalRefProps>(null)
  // const modalAcceptCandidateRef = useRef<PrModalRefProps>(null)
  // const modalRejectCandidateRef = useRef<PrModalRefProps>(null)
  // const modalListCandidateRef = useRef<PrModalRefProps>(null)
  // const history = useHistory()

  // const callApiEmployerDetail = () => {
  //   const accessToken = Cookies.get('token')
  //   const url = `${SERVER_URL}/employer/${userInfo?.id}`
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   }

  //   const config: AxiosRequestConfig = {
  //     method: 'GET',
  //     headers,
  //     url,
  //     data: undefined,
  //     timeout: 20000
  //   }

  //   axios(config)
  //     .then((response: AxiosResponse<ResponseEmployerDetail>) => {
  //       const { success, error, data } = response.data

  //       if (!success) {
  //         throw Error(error?.message)
  //       }
  //       setEmployerInfo(data.employerDetail)
  //     })
  //     .catch((e) => {
  //       showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
  //     })
  // }

  // const callApiListJob = useCallback(() => {
  //   const accessToken = Cookies.get('token')
  //   const url = `${SERVER_URL}/jobs/employer/${userInfo?._id}`
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   }

  //   const config: AxiosRequestConfig = {
  //     method: 'GET',
  //     headers,
  //     url,
  //     data: undefined,
  //     timeout: 20000
  //   }

  //   axios(config)
  //     .then((response: AxiosResponse<ResponseListJob>) => {
  //       const { success, data, error } = response.data

  //       if (!success) {
  //         throw Error(error?.message)
  //       }
  //       setJobList(data.items)
  //     })
  //     .catch((e) => {
  //       showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
  //     })
  // }, [])

  // const callApiListCandidate = (ids: string, jobId: string) => {
  //   const accessToken = Cookies.get('token')
  //   const url = `${SERVER_URL}/candidate/jobId=${jobId}/informations=${ids}`
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   }

  //   const config: AxiosRequestConfig = {
  //     method: 'GET',
  //     headers,
  //     url,
  //     data: undefined,
  //     timeout: 20000
  //   }

  //   axios(config)
  //     .then((response: AxiosResponse<ResponseListCandidate>) => {
  //       const { success, error, data } = response.data

  //       if (!success) {
  //         throw Error(error?.message)
  //       }
  //       setCandidateList(data.items)
  //     })
  //     .catch((e) => {
  //       showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
  //     })
  // }

  // const callApiAcceptCandidate = (jobId: string, cvId: string) => {
  //   const accessToken = Cookies.get('token')
  //   const url = `${SERVER_URL}/employer/accept-candidate`
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   }

  //   const config: AxiosRequestConfig = {
  //     method: 'POST',
  //     headers,
  //     url,
  //     data: {
  //       jobId,
  //       cvId
  //     },
  //     timeout: 20000
  //   }

  //   axios(config)
  //     .then((response: AxiosResponse<ResponseDefault>) => {
  //       const { success, error, message } = response.data

  //       if (!success) {
  //         throw Error(error?.message)
  //       }
  //       showNotify.success(message)
  //       modalAcceptCandidateRef.current?.hide()
  //       modalListCandidateRef.current?.hide()
  //       callApiListJob()
  //     })
  //     .catch((e) => {
  //       modalAcceptCandidateRef.current?.hide()
  //       showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
  //     })
  // }

  // const callApiRejectCandidate = (jobId: string, cvId: string) => {
  //   const accessToken = Cookies.get('token')
  //   const url = `${SERVER_URL}/employer/reject-candidate`
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${accessToken}`
  //   }

  //   const config: AxiosRequestConfig = {
  //     method: 'POST',
  //     headers,
  //     url,
  //     data: {
  //       jobId,
  //       cvId
  //     },
  //     timeout: 20000
  //   }

  //   axios(config)
  //     .then((response: AxiosResponse<ResponseDefault>) => {
  //       const { success, error, message } = response.data

  //       if (!success) {
  //         throw Error(error?.message)
  //       }
  //       showNotify.success(message)
  //       modalRejectCandidateRef.current?.hide()
  //       modalListCandidateRef.current?.hide()
  //       callApiListJob()
  //     })
  //     .catch((e) => {
  //       modalRejectCandidateRef.current?.hide()
  //       showNotify.error(e ? get(e, 'response.data.error.message') : 'Lỗi hệ thống!')
  //     })
  // }

  // const onShowListCandidate = (listCandidate: { cvId: string; accept: boolean }[], jobId: string) => {
  //   let listCvId = ''
  //   for (let i = 0; i < listCandidate.length; i++) {
  //     listCvId += listCandidate[i].cvId + ','
  //   }
  //   listCvId = listCvId.substring(0, listCvId.length - 1)
  //   callApiListCandidate(listCvId, jobId)
  //   setCurrentJobId(jobId)
  //   modalListCandidateRef.current?.show()
  // }

  // const onHideNotify = () => {
  //   modalNotifyRef.current?.hide()
  // }

  // const onCreateJobPosting = () => {
  //   if (!employerInfo?.companyId) {
  //     modalNotifyRef.current?.show()
  //     return
  //   }
  //   history.push('/employer/jobs/create')
  // }

  // const onShowAcceptCandidate = (cvId: string) => {
  //   setCurrentCandidateId(cvId)
  //   modalAcceptCandidateRef.current?.show()
  // }

  // const onShowRejectCandidate = (cvId: string) => {
  //   setCurrentCandidateId(cvId)
  //   modalRejectCandidateRef.current?.show()
  // }

  // const onAcceptCandidate = () => {
  //   callApiAcceptCandidate(currentJobId, currentCandidateId)
  // }

  // const onReJectCandidate = () => {
  //   callApiRejectCandidate(currentJobId, currentCandidateId)
  // }

  // const onHideAcceptCandidate = () => {
  //   setCurrentCandidateId('')
  //   modalAcceptCandidateRef.current?.hide()
  // }

  // const onHideRejectCandidate = () => {
  //   setCurrentCandidateId('')
  //   modalRejectCandidateRef.current?.hide()
  // }

  // useEffect(() => {
  //   callApiListJob()
  //   callApiEmployerDetail()
  // }, [])

  // if (!jobList || !userInfo) {
  //   return <div>Loading</div>
  // }

  // return (
  //   <div className="py-32 w-2/3 mx-auto">
  //     <BreadCrumb title="Quản lý tin tuyển dụng" />
  //     <div className="shadow bg-blue-50 border-gray-300 px-8 py-10 mt-10">
  //       <div className="flex justify-between items-center">
  //         <span className="block uppercase text-xl font-bold text-gray-700">Danh sách tin tuyển dụng đã đăng</span>
  //         <span
  //           onClick={onCreateJobPosting}
  //           // to="/employer/jobs/create"
  //           className="px-4 py-1.5 block bg-green-500 rounded-md duration-300 hover:bg-green-600"
  //         >
  //           <i className="fas fa-plus mr-3 text-white" />
  //           <span className="text-white font-semibold cursor-pointer">Đăng tin tuyển dụng</span>
  //         </span>
  //       </div>
  //       <div className="mange-list-cv mt-10">
  //         {jobList && jobList.length === 0 && <div>Chưa có tin tuyển dụng nào</div>}

  //         {jobList &&
  //           jobList.length > 0 &&
  //           jobList.map((item) => {
  //             const { name, createdAt, updatedAt, timeToApply, _id, candidateApplied } = item
  //             // const { fullname } = detail
  //             return (
  //               <div
  //                 className="py-5 items-center gap-x-4 border border-dashed border-gray-300 rounded mb-12"
  //                 key={`cv_${_id}`}
  //               >
  //                 <div>
  //                   <div>
  //                     <span className="block font-bold text-xl text-green-600">{name}</span>
  //                   </div>
  //                   <div className="mt-2">
  //                     <div className="flex justify-between">
  //                       <div>
  //                         <i className="far fa-clock mr-2"></i>
  //                         <span>{candidateApplied?.length} ứng viên đã ứng tuyển</span>
  //                       </div>
  //                       {candidateApplied && candidateApplied?.length > 0 && (
  //                         <span
  //                           onClick={() => onShowListCandidate(candidateApplied || [], _id || '')}
  //                           className="block font-semibold text-red-500 cursor-pointer"
  //                         >
  //                           Xem danh sách ứng viên
  //                         </span>
  //                       )}
  //                     </div>
  //                   </div>
  //                   <div className="mt-2">
  //                     <div className="flex justify-between">
  //                       <div>
  //                         <i className="far fa-clock mr-2"></i>
  //                         <span>Thời hạn ứng tuyển</span>
  //                       </div>
  //                       <span className="block">{timeToApply && moment(timeToApply).format('DD/MM/YYYY')}</span>
  //                     </div>
  //                   </div>
  //                   <div className="mt-2">
  //                     <div className="flex justify-between">
  //                       <div>
  //                         <i className="far fa-clock mr-2"></i>
  //                         <span>Ngày tạo</span>
  //                       </div>
  //                       <span className="block">{createdAt && moment(createdAt).format('DD/MM/YYYY HH:mm')}</span>
  //                     </div>
  //                   </div>
  //                   <div className="mt-2">
  //                     <div className="flex justify-between">
  //                       <div>
  //                         <i className="fas fa-history mr-2"></i>
  //                         <span>Ngày sửa</span>
  //                       </div>
  //                       <span className="block">{updatedAt && moment(updatedAt).format('DD/MM/YYYY HH:mm')}</span>
  //                     </div>
  //                   </div>
  //                   <div className="grid grid-cols-4 gap-x-16 mt-5">
  //                     <Link
  //                       to={`/jobs/${slugURL(name)}.${_id}`}
  //                       className="col-span-1 bg-green-600 py-1 rounded flex justify-center items-center hover:bg-green-700 duration-300"
  //                     >
  //                       <i className="fas fa-eye mr-2 text-white"></i>
  //                       <span className="text-white">Xem</span>
  //                     </Link>
  //                     <Link
  //                       to="/edit-cv/"
  //                       className="col-span-1 py-1 bg-purple-700 rounded flex justify-center items-center hover:bg-purple-800 duration-300"
  //                     >
  //                       <i className="fas fa-edit mr-2 text-white"></i>
  //                       <span className="text-white">Sửa</span>
  //                     </Link>
  //                     <span className="col-span-1 py-1 cursor-pointer bg-red-700 rounded flex justify-center items-center hover:bg-red-800 duration-300">
  //                       <i className="fas fa-edit mr-2 text-white"></i>
  //                       <span className="text-white">Xóa</span>
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             )
  //           })}
  //       </div>
  //     </div>

  //     <PrModal title="Thông báo" disableFooter onHide={onHideNotify} ref={modalNotifyRef}>
  //       <div className="px-10 py-16">
  //         <span className="block text-xl font-semibold text-center">
  //           Để đăng tin tuyển dụng, hãy cập nhật thông tin về công ty của bạn
  //         </span>
  //         <div className="flex justify-center">
  //           <Link
  //             to="/employer/company-info"
  //             className="inline-block mx-auto mt-10 font-semibold text-white bg-green-600 px-4 py-2 rounded"
  //           >
  //             Cập nhật ngay
  //           </Link>
  //         </div>
  //       </div>
  //     </PrModal>

  //     <PrModal
  //       title="Chấp nhận ứng viên"
  //       okTitle="Chấp nhận"
  //       cancelTitle="Hủy"
  //       onHide={onHideAcceptCandidate}
  //       onChange={onAcceptCandidate}
  //       ref={modalAcceptCandidateRef}
  //     >
  //       <div className="px-10 py-16">
  //         <span className="block text-xl font-semibold text-center">
  //           Xác nhận <span className="text-green-600 font-semibold">Chấp nhận</span> ứng viên này ứng tuyển ?
  //         </span>
  //         <span className="block mt-5">
  //           - Sau khi xác nhận, một email sẽ được gửi tới ứng viên thông báo rằng họ đã được nhà tuyển dụng lựa chọn.
  //           <br />- Thông tin ứng viên sẽ được chuyển tới mục Quản lý ứng viên trong Bảng điều khiển
  //         </span>
  //       </div>
  //     </PrModal>

  //     <PrModal
  //       title="Từ chối ứng viên"
  //       okTitle="Từ chối"
  //       cancelTitle="Hủy"
  //       onChange={onReJectCandidate}
  //       onHide={onHideRejectCandidate}
  //       ref={modalRejectCandidateRef}
  //     >
  //       <div className="px-10 py-16">
  //         <span className="block text-xl font-semibold text-center">
  //           Xác nhận <span className="text-red-500 font-semibold">Từ chối</span> ứng viên này ứng tuyển ?
  //         </span>
  //         <span className="block mt-5">
  //           - Sau khi xác nhận, ứng viên sẽ nhận được Email thông báo họ chưa đủ yêu cầu của nhà tuyển dụng
  //         </span>
  //       </div>
  //     </PrModal>
  //   </div>
  // )
  const loader = useRef<typeof TableLoader>(TableLoader)
  loader.current.url = `${SERVER_URL}/jobs/employer/${userInfo?._id}`

  const Toolbar: React.FC = () => {
    return (
      <Link
        to="/employer/jobs/create"
        className="flex items-center rotate-parent bg-green-600 rounded-md px-4 py-3 sm:py-2 hover:bg-green-700 duration-300"
      >
        <i className="fas fa-plus sm:mr-3 mr-2 duration-500 text-white"></i>
        <span className="text-white font-semibold hidden sm:inline">Tạo việc làm</span>
        <span className="text-white font-semibold sm:hidden">Tạo</span>
      </Link>
    )
  }

  const MemoToolbar = memo(Toolbar)

  const Wrapper: React.FC = (props) => {
    return (
      <WrapperTable
        title="Danh sách việc làm đã tạo"
        toolbar={userInfo?.numberOfPosting && userInfo?.numberOfPosting > 0 ? <MemoToolbar /> : undefined}
      >
        {props.children}
      </WrapperTable>
    )
  }

  return (
    <div className="pt-28 pb-10 w-2/3 mx-auto" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Table columns={Columns} loader={loader.current} prefix={prefix} Wrapper={memo(Wrapper)} />
      <ModalApplyCandidate />
      <PopupDeactive />
    </div>
  )
}
