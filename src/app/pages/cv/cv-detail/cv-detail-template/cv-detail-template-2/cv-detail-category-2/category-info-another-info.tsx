interface AnotherInfoProps {
  anotherInfo?: {
    info: string
  }[]
}

export const AnotherInfo: React.FC<AnotherInfoProps> = (props) => {
  const { anotherInfo } = props

  if (!anotherInfo || anotherInfo.length === 0) {
    return null
  }

  return (
    <div className="px-2 py-1">
      <div className="flex items-center mb-2 border-gray-300 border border-t-0 border-r-0 border-l-0">
        <span className="uppercase font-bold pb-1 border-gray-500 border-2 border-t-0 border-r-0 border-l-0 bg-white text-base relative top-px">
          Thông tin khác
        </span>
      </div>
      {anotherInfo &&
        anotherInfo.length > 0 &&
        anotherInfo.map((item, index) => {
          return (
            <div className="flex w-full pb-2.5 pl-4 pr-2" key={`anotherInfo_${index}`}>
              <div className="w-full pb-1.5">
                <span className="block bg-transparent w-full text-gray-500 font-medium">- {item.info}</span>
              </div>
            </div>
          )
        })}
    </div>
  )
}
