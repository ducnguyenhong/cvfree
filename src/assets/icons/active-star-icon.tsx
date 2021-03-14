interface Props {
  width?: number
  height?: number
  className?: string
}

export const ActiveStarIcon: React.FC<Props> = (props) => {
  const { width, height, className } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      width={width || 15}
      height={height || 15}
      y="0"
      className={className}
      enableBackground="new 0 0 512.002 512.002"
      version="1.1"
      viewBox="0 0 512.002 512.002"
      xmlSpace="preserve"
    >
      <path
        fill={'#646464'}
        d="M511.267 197.258a14.995 14.995 0 00-12.107-10.209l-158.723-23.065-70.985-143.827a14.998 14.998 0 00-26.901 0l-70.988 143.827-158.72 23.065a14.998 14.998 0 00-8.312 25.585l114.848 111.954-27.108 158.083a14.999 14.999 0 0021.763 15.812l141.967-74.638 141.961 74.637a15 15 0 0021.766-15.813l-27.117-158.081 114.861-111.955a14.994 14.994 0 003.795-15.375z"
      ></path>
    </svg>
  )
}
