import CareerGoalsIcon from 'assets/icons/goals.svg'

interface CareerGoalsInfoProps {
  careerGoals?: string
}

export const CareerGoalsInfo: React.FC<CareerGoalsInfoProps> = (props) => {
  const { careerGoals } = props

  if (!careerGoals || careerGoals.length === 0) {
    return null
  }

  return (
    <div className="px-2 mt-3 mb-5">
      <div className="flex items-center mb-2">
        <img src={CareerGoalsIcon} alt="icon" className="w-8 h-8 mr-3" />
        <span className="uppercase font-bold">Mục tiêu nghề nghiệp</span>
      </div>
      <div>
        <div className="text-justify block px-2">{`${careerGoals}`}</div>
      </div>
    </div>
  )
}
