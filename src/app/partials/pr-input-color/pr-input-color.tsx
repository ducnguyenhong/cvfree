interface Props {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PrInputColor: React.FC<Props> = (props) => {
  const { value, onChange } = props
  return (
    <div className="mx-4 text-center">
      <span className="mr-2 text-semibold">Màu</span>
      <div className="rounded-full cursor-pointer overflow-hidden w-8 h-8 flex items-center justify-center bg-green-500">
        <input
          value={value}
          onChange={onChange}
          type="color"
          className="cursor-pointer w-5 h-5 rounded-full focus:outline-none"
        />
      </div>
    </div>
  )
}

export default PrInputColor
