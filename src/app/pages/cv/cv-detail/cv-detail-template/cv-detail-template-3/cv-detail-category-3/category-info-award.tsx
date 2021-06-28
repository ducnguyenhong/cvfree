interface AwardInfoProps {
  award?: {
    name: string
  }[]
}

export const AwardInfo: React.FC<AwardInfoProps> = (props) => {
  const { award } = props

  if (!award || award.length === 0) {
    return null
  }

  return (
    <div className="px-2 py-1">
      <div className="mb-2">
        <span className="uppercase font-bold py-1 bg-pink-100 text-base relative block px-4">Giải thưởng</span>
      </div>
      {award &&
        award.length > 0 &&
        award.map((item, index) => {
          return (
            <div className="flex w-full pb-2.5 pl-4 pr-2" key={`award_${index}`}>
              <div className="w-full pb-1.5">
                <span className="block bg-transparent w-full text-gray-500 font-medium">- {item.name}</span>
              </div>
            </div>
          )
        })}
    </div>
  )
}
