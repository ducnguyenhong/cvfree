interface WorkExperienceInfoProps {
  workExperience?: {
    companyName: string
    position?: string
    time?: string
    description?: string
  }[]
}

export const WorkExperienceInfo: React.FC<WorkExperienceInfoProps> = (props) => {
  const { workExperience } = props

  if (!workExperience || workExperience.length === 0) {
    return null
  }

  return (
    <div className="px-2 py-1">
      <div className="flex items-center mb-2 border-gray-300 border border-t-0 border-r-0 border-l-0">
        <span className="uppercase font-bold pb-1 border-gray-500 border-2 border-t-0 border-r-0 border-l-0 bg-white text-base relative top-px">
          Kinh nghiệm làm việc
        </span>
      </div>
      {workExperience &&
        workExperience.length > 0 &&
        workExperience.map((item, index) => {
          return (
            <div className="flex w-full pb-2.5 pl-4 pr-2" key={`exp_${index}`}>
              <div className="w-full pb-1.5">
                <span className="block bg-transparent w-full text-gray-500 uppercase font-semibold">
                  - {item.companyName}
                </span>
                <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">
                  + {item.position}
                </span>
                <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">+ {item.time}</span>
                {item.description && (
                  <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">
                    + {item.description}
                  </span>
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}
