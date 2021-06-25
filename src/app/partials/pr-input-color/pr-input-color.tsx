import { useEffect, useState } from 'react'
interface Props {
  onChange: (e: string) => void
  defaultColor?: string
}

const PrInputColor: React.FC<Props> = (props) => {
  const { onChange, defaultColor } = props

  const [color, setColor] = useState<string>(defaultColor || '')

  useEffect(() => {
    defaultColor && setColor(defaultColor)
  }, [defaultColor])

  return (
    <div className="mx-4 text-center">
      <span className="mr-2 text-sm block font-medium mb-1">Màu</span>
      <div
        className="rounded-full cursor-pointer overflow-hidden w-7 h-7 flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <input
          value={color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
            setColor(e.target.value)
          }}
          type="color"
          className="cursor-pointer w-5 h-5 rounded-full focus:outline-none"
        />
      </div>
    </div>
  )
}

export default PrInputColor
