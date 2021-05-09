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
      <div className="flex items-center mb-2 border-gray-300 border border-t-0 border-r-0 border-l-0">
        <span className="uppercase font-bold pb-1 border-gray-500 border-2 border-t-0 border-r-0 border-l-0 bg-white text-base relative top-px">
          Người giới thiệu
        </span>
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
