export const Gender: React.FC<{ gender?: string; className?: string }> = (props) => {
  const { gender, className } = props

  if (gender === 'MALE') {
    return <i className={`${className} fas fa-mars text-blue-500`} />
  }
  if (gender === 'FEMALE') {
    return <i className={`${className} fas fa-venus text-pink-500`} />
  }
  return null
}
