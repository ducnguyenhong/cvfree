import PrModal, { PrModalRefProps } from 'app/partials/pr-modal'
import { useRef, useEffect } from 'react'
import { ColumnsProps } from '@ekidpro/table'
import { useRecoilState } from 'recoil'
import { showApplyCandidateState } from 'app/states/show-modal/apply-candidate-state'
import { PopupAcceptCandidate } from './popup-accept-candidate'
import { PopupRejectCandidate } from './popup-reject-candidate'
import clsx from 'clsx'
import { Action } from './apply-candidate.action'
import { PublicUserInfo, DateTime } from 'app/partials/table-columns'
import { slugURL } from 'utils/helper'

interface Candidate {
  _id?: string
  userId: string
  applyType: string // OTHER , CVFREE, PDF
  applyValue: string
  appliedAt: Date
  candidate: {
    fullname: string
    avatar: string
    gender: string
  }
}

export const prefix = 'applyCandidateList'

export const columns: ColumnsProps[] = [
  { field: 'id', title: 'Mã ứng tuyển' },
  { field: 'userId', title: 'Ứng viên' },
  { field: 'applyType', title: 'Hình thức ứng tuyển' },
  { field: 'applyValue', title: 'Thông tin ứng tuyển' },
  { field: 'appliedAt', title: 'Ngày ứng tuyển' },
  { field: 'action', title: 'Hành động' }
]

export const ModalApplyCandidate: React.FC = () => {
  const modalRef = useRef<PrModalRefProps>(null)
  const [showModalState, setShowModalState] = useRecoilState(showApplyCandidateState)
  const { jobId, showModal, candidateApplied } = showModalState

  const onHideModal = () => {
    setShowModalState({ jobId: undefined, showModal: false, candidateApplied: [] })
  }

  useEffect(() => {
    showModal ? modalRef.current?.show() : modalRef.current?.hide()
  }, [showModal])

  const getValue = (item: Candidate, field: string) => {
    const { candidate, appliedAt, applyType, applyValue, _id, userId } = item

    const getApplyValue = () => {
      if (applyType === 'OTHER') {
        return (
          <a
            href={applyValue}
            target="_blank"
            className="font-medium text-white bg-pink-500 px-4 py-2 rounded w-36 text-center block whitespace-nowrap"
            rel="noopener noreferrer"
          >
            <i className="fas fa-link mr-2" />
            Xem liên kết
          </a>
        )
      }
      if (applyType === 'PDF') {
        return (
          <a
            href={applyValue}
            target="_blank"
            className="font-medium text-white bg-pink-500 px-4 py-2 rounded w-36 text-center block whitespace-nowrap"
            rel="noopener noreferrer"
          >
            <i className="fas fa-file-pdf mr-2" />
            Xem file
          </a>
        )
      }
      return (
        <a
          href={`/cv-public/${slugURL(candidate?.fullname)}.${applyValue}`}
          target="_blank"
          className="font-medium text-white bg-pink-500 px-4 py-2 rounded w-36 text-center block whitespace-nowrap"
          rel="noopener noreferrer"
        >
          <i className="fas fa-copy mr-2" />
          Xem hồ sơ
        </a>
      )
    }

    const getApplyType = () => {
      if (applyType === 'OTHER') {
        return <span>CV từ hệ thống khác</span>
      }
      if (applyType === 'PDF') {
        return <span>File PDF</span>
      }
      return <span>Hồ sơ CVFREE</span>
    }

    switch (field) {
      case 'id':
        return <span className="font-medium">{_id ? _id.slice(_id.length - 5, _id.length) : ''}</span>

      case 'userId':
        return <PublicUserInfo name={candidate?.fullname} avatar={candidate?.avatar} gender={candidate?.gender} />

      case 'applyType':
        return getApplyType()

      case 'applyValue':
        return getApplyValue()

      case 'appliedAt':
        return <DateTime timestamp={appliedAt} format="DD/MM/YYYY" />

      case 'action':
        return <Action applyValue={applyValue} applyType={applyType} jobId={jobId} userId={userId} />

      default:
        return <span></span>
    }
  }

  return (
    <PrModal title="Danh sách ứng viên ứng tuyển" size="lg" disableFooter onHide={onHideModal} ref={modalRef}>
      <div>
        <div className="flex items-center justify-center my-10 font-semibold text-lg">
          <span className="text-red-500">* Chú ý: </span>
          <span className="ml-2">
            Hãy xem thông tin ứng tuyển của ứng viên, rồi sau đó
            <span className="mx-2 uppercase text-green-600">Chấp nhận</span>
            hoặc
            <span className="mx-2 uppercase text-red-500">Từ chối</span>
            ứng viên
          </span>
        </div>
        {/* <Table columns={Columns} loader={loader} prefix={prefix} /> */}

        <div className="overflow-hidden" data-testid="table">
          <div className="overflow-x-scroll">
            <table className="w-full table-auto mb-4">
              <thead>
                <tr className="bg-gray-800 text-left rounded">
                  {columns &&
                    columns.map((item) => {
                      return (
                        <th
                          className={clsx({
                            'cursor-pointer duration-300 hover:text-blue-500': item.canSort,
                            'bg-gray-50 p-5': true
                          })}
                          key={`title_${item.title}`}
                        >
                          <div className="flex items-center">
                            <span className="block text-gray-900 font-extrabold">{item.title}</span>
                          </div>
                        </th>
                      )
                    })}
                </tr>
              </thead>
              <tbody className="bg-gray-200 w-full">
                {candidateApplied.map((item, index) => {
                  return (
                    <tr
                      key={`tr_${index}`}
                      className="bg-white border-gray-200 text-left py-3"
                      style={{ borderTopWidth: 1 }}
                    >
                      {columns.map((item2) => {
                        return (
                          <td key={`td_${item2.field}`} className="p-5">
                            {getValue(item, item2.field)}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="my-8 h-19 sm:h-9 w-full">
            {/* <Pagination pagination={{
              totalItems: candidateApplied.length,
              totalPages: candidateApplied.length /
            }}/> */}
          </div>
        </div>

        <PopupAcceptCandidate />
        <PopupRejectCandidate />
      </div>
    </PrModal>
  )
}
