import { Table } from '@ekidpro/table'
import { WrapperTable } from 'app/partials/table/wrapper-table'
import { memo, useRef } from 'react'
import { Columns, TableLoader } from './candidate-manage-apply.data'

export const prefix = 'candidateManageApply'

interface DataStatusType {
  title: string
  content: string
  textColor: string
  bgColor: string
  status: string
}

export const DataStatusApply: DataStatusType[] = [
  {
    title: 'Waiting',
    content: 'Đang chờ duyệt',
    textColor: '',
    bgColor: 'bg-yellow-400',
    status: 'WAITING'
  },
  {
    title: 'Approved',
    content: 'Đã được duyệt (đang liên hệ)',
    textColor: 'text-white',
    bgColor: 'bg-green-600',
    status: 'APPROVED'
  },
  {
    title: 'Done',
    content: 'Hoàn tất',
    textColor: 'text-white',
    bgColor: 'bg-purple-600',
    status: 'DONE'
  },
  {
    title: 'Dinied',
    content: 'Đã từ chối',
    textColor: 'text-white',
    bgColor: 'bg-red-600',
    status: 'DINIED'
  }
]

export const CandidateManageApply: React.FC = () => {
  const loader = useRef<typeof TableLoader>(TableLoader)

  const Wrapper: React.FC = (props) => {
    return (
      <WrapperTable title="Danh sách việc làm đã ứng tuyển">
        {props.children}
        <div className="mt-20 pb-10">
          <span className="block font-semibold mb-5 ml-10 text-red-500">* Chú thích trạng thái</span>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {DataStatusApply.map((item) => {
              const { textColor, bgColor, title, content } = item
              return (
                <div className="grid grid-cols-3 col-span-1" key={title}>
                  <div className="col-span-1">
                    <span
                      className={`${textColor} ${bgColor} text-sm uppercase px-3 py-1.5 rounded font-semibold w-32 block mx-auto text-center`}
                    >
                      {title}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium mt-1 block">{content}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </WrapperTable>
    )
  }

  return (
    <div className="pt-28 pb-10 w-2/3 mx-auto" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <Table columns={Columns} loader={loader.current} prefix={prefix} Wrapper={memo(Wrapper)} />
    </div>
  )
}
