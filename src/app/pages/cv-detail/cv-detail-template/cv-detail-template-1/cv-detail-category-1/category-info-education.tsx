import EducationIcon from 'assets/icons/education.svg'

interface EducationInfoProps {
  education?: {
    name: string
    major?: string
  }[]
}

export const EducationInfo: React.FC<EducationInfoProps> = (props) => {
  const { education } = props

  if (!education || education.length === 0) {
    return null
  }

  return (
    <div className="px-2 py-1">
      <div className="flex items-center mb-4">
        <img src={EducationIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Học vấn</span>
      </div>
      {education &&
        education.length > 0 &&
        education.map((item, index) => {
          return (
            <div className="flex w-full pb-2.5 pl-4 pr-2" key={`edu_${index}`}>
              <div className="w-full pb-1.5">
                <span className="block bg-transparent w-full text-gray-500 uppercase font-semibold">- {item.name}</span>
                <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">+ {item.major}</span>
              </div>
            </div>
          )
        })}
    </div>
  )
}
