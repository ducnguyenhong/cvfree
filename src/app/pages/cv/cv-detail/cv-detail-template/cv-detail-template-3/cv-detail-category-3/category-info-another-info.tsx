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
      <div className="mb-2">
        <span className="uppercase font-bold py-1 bg-pink-100 text-base relative block px-4">Thông tin khác</span>
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
