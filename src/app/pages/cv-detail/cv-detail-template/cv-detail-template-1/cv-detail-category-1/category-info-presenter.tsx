import PresenterIcon from 'assets/icons/presenter.svg'

interface PresenterInfoProps {
  presenter?: {
    name: string
    company?: string
    position?: string
    phone?: string
  }[]
}

export const PresenterInfo: React.FC<PresenterInfoProps> = (props) => {
  const { presenter } = props

  if (!presenter || presenter.length === 0) {
    return null
  }

  return (
    <div className="px-2 py-1">
      <div className="flex items-center mb-4">
        <img src={PresenterIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Người giới thiệu</span>
      </div>
      {presenter &&
        presenter.length > 0 &&
        presenter.map((item, index) => {
          return (
            <div className="flex w-full pb-2.5 pl-4 pr-2" key={`presenter_${index}`}>
              <div className="w-full pb-1.5">
                <span className="block bg-transparent w-full text-gray-500 uppercase font-semibold">- {item.name}</span>
                <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">
                  + {item.company}
                </span>
                <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">
                  + {item.position}
                </span>
                <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">+ {item.phone}</span>
              </div>
            </div>
          )
        })}
    </div>
  )
}
