import AwardIcon from 'assets/icons/award.svg'

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
      <div className="flex items-center mb-4">
        <img src={AwardIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Giải thưởng</span>
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
