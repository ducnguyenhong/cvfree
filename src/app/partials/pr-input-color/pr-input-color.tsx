import { useState } from 'react'
interface Props {
  onChange: (e: string) => void
  defaultColor?: string
}

const PrInputColor: React.FC<Props> = (props) => {
  const { onChange, defaultColor } = props

  const [color, setColor] = useState<string>(defaultColor || '')

  return (
    <div className="mx-4 text-center">
      <span className="mr-2 text-semibold">Màu</span>
      <div
        className="rounded-full cursor-pointer overflow-hidden w-8 h-8 flex items-center justify-center"
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
