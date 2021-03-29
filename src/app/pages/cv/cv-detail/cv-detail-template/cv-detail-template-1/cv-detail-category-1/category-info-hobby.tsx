import HobbyIcon from 'assets/icons/hobby.svg'

interface HobbyInfoProps {
  hobby?: string
}

export const HobbyInfo: React.FC<HobbyInfoProps> = (props) => {
  const { hobby } = props

  if (!hobby || hobby.length === 0) {
    return null
  }

  return (
    <div className="px-2 mt-3 mb-5">
      <div className="flex items-center mb-2">
        <img src={HobbyIcon} alt="icon" className="w-8 h-8 mr-3" />
        <span className="uppercase font-bold">Sở thích</span>
      </div>
      <div>
        <span className="text-justify block px-2">{hobby}</span>
      </div>
    </div>
  )
}
