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
      <div className="flex items-center mb-2 border-gray-300 border border-t-0 border-r-0 border-l-0">
        <span className="uppercase font-bold pb-1 border-gray-500 border-2 border-t-0 border-r-0 border-l-0 bg-white text-base relative top-px">
          Sở thích
        </span>
      </div>
      <div>
        <span className="text-justify block px-2">{hobby}</span>
      </div>
    </div>
  )
}
