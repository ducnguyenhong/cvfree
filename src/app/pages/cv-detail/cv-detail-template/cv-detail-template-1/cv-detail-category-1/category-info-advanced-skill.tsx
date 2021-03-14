import AdvancedSkillIcon from 'assets/icons/advanced-skill.svg'

interface AdvancedSkillInfoProps {
  advancedSkill?: {
    name: string
    description: string
  }[]
}

export const AdvancedSkillInfo: React.FC<AdvancedSkillInfoProps> = (props) => {
  const { advancedSkill } = props

  if (!advancedSkill || advancedSkill.length === 0) {
    return null
  }

  return (
    <div className="px-2 py-1">
      <div className="flex items-center mb-4">
        <img src={AdvancedSkillIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Kỹ năng chuyên môn</span>
      </div>
      {advancedSkill &&
        advancedSkill.length > 0 &&
        advancedSkill.map((item, index) => {
          return (
            <div className="flex w-full pb-2.5 pl-4 pr-2" key={`ad_skill_${index}`}>
              <div className="w-full pb-1.5">
                <span className="block bg-transparent w-full text-gray-500 uppercase font-semibold">- {item.name}</span>
                <span className="pl-8 block bg-transparent w-full text-gray-500 font-medium mt-2">
                  + {item.description}
                </span>
              </div>
            </div>
          )
        })}
    </div>
  )
}
