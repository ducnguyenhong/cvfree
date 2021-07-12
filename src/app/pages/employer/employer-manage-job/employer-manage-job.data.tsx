import { ColumnsProps, Loader, Pagination } from '@ekidpro/table'
import { showNotify } from 'app/partials/pr-notify'
import { DateTime, IsPublic } from 'app/partials/table-columns'
import { showApplyCandidateState } from 'app/states/show-modal/apply-candidate-state'
import axios from 'axios'
import { DataGender } from 'constants/data-common'
import { DataFormOfWork, DataRecruitmentPosition } from 'constants/data-employer'
import Cookies from 'js-cookie'
import { get } from 'lodash'
import { JobPostingInfo } from 'models/job-posting-info'
import { useSetRecoilState } from 'recoil'
import { getDefaultLabelDropdown, slugURL } from 'utils/helper'
import { Action } from './employer-manage-job.action'

export interface TableColumn extends JobPostingInfo {
  action?: string
}

export interface TableFilter {}

export const Columns: ColumnsProps[] = [
  { field: '_id', title: 'Mã việc làm' },
  { field: 'name', title: 'Tên việc làm' },
  { field: 'candidateApplied', title: 'Danh sách ứng tuyển' },
  { field: 'recruitmentPosition', title: 'Vị trí tuyển' },
  { field: 'numberRecruited', title: 'Số lượng tuyển' },
  { field: 'timeToApply', title: 'Thời hạn ứng tuyển' },
  { field: 'formOfWork', title: 'Hình thức' },
  { field: 'isPublic', title: 'Trạng thái' },
  { field: 'genderRequirement', title: 'Yêu cầu giới tính' },
  { field: 'createdAt', title: 'Ngày tạo' },
  { field: 'updatedAt', title: 'Ngày cập nhật' },
  { field: 'action', title: 'Hành động' }
]

export const getLoader = (url?: string) => {
  const TableLoader: Loader<TableColumn, TableFilter> = {
    fetch: async (input) => {
      const accessToken = Cookies.get('token')
      console.log('ducnh2')

      const response = await axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        url,
        params: {
          page: input.page,
          size: input.size
        }
      })

      const { success, data, error } = response.data
      if (!success) {
        showNotify.error(error.message)
        throw Error(error.message)
      }
      const { items, pagination } = data
      const { page, size, totalItems, totalPages } = pagination

      const result: Pagination<JobPostingInfo> = {
        data: items,
        pagination: {
          currentPage: page,
          perPage: size,
          totalItems,
          totalPages
        }
      }

      return result
    },
    render: (data, field) => {
      if (!data) {
        return <></>
      }

      const setShowModalCandidate = useSetRecoilState(showApplyCandidateState)

      const {
        name,
        _id,
        createdAt,
        updatedAt,
        candidateApplied,
        career,
        formOfWork,
        genderRequirement,
        numberRecruited,
        recruitmentPosition,
        timeToApply,
        isPublic
      } = data

      const onShowListCandidate = (id?: string) => {
        id &&
          setShowModalCandidate({
            jobId: id,
            showModal: true,
            candidateApplied: candidateApplied || []
          })
      }

      switch (field) {
        case '_id':
          return (
            <a href={`/jobs/${slugURL(name)}.${_id}`} target="_blank" className="font-medium" rel="noopener noreferrer">
              {_id ? _id.slice(_id.length - 5, _id.length) : ''}
            </a>
          )

        case 'name':
          return (
            <a
              href={`/jobs/${slugURL(name)}.${_id}`}
              target="_blank"
              className="font-medium whitespace-nowrap"
              rel="noopener noreferrer"
            >
              {name}
            </a>
          )

        case 'isPublic':
          return <IsPublic isPublic={isPublic} />

        case 'candidateApplied':
          return (
            <span>
              {candidateApplied && candidateApplied?.length < 1 ? (
                'Chưa có ứng viên'
              ) : (
                <span
                  onClick={() => onShowListCandidate(_id)}
                  className="bg-blue-500 px-4 py-2 rounded cursor-pointer font-medium text-white whitespace-nowrap"
                >
                  Xem danh sách
                </span>
              )}
            </span>
          )

        case 'career':
          return <span>{getDefaultLabelDropdown(DataGender, career)}</span>

        case 'numberRecruited':
          return <span>{numberRecruited}</span>

        case 'recruitmentPosition':
          return (
            <span className="whitespace-nowrap">
              {getDefaultLabelDropdown(DataRecruitmentPosition, recruitmentPosition)}
            </span>
          )

        case 'timeToApply':
          return <DateTime timestamp={timeToApply} />

        case 'formOfWork':
          return <span>{getDefaultLabelDropdown(DataFormOfWork, formOfWork)}</span>

        case 'genderRequirement':
          return <span>{getDefaultLabelDropdown(DataGender, genderRequirement)}</span>

        case 'createdAt':
          return <DateTime timestamp={createdAt} />

        case 'updatedAt':
          return <DateTime timestamp={updatedAt} />

        case 'action':
          return <Action id={_id} name={name} />

        default:
          return <span>{get(data, 'field')}</span>
      }
    }
  }
  return TableLoader
}
