import { ActiveStarIcon, InactiveStarIcon } from 'assets/icons'
import { forwardRef, Ref, useImperativeHandle, useState } from 'react'

interface PrRateProps {
  count?: number
  defaultValue?: number
  activeCharacter?: string | React.ReactElement | React.FC
  inactiveCharacter?: string | React.ReactElement | React.FC
  onChange?: (data: number) => void
}

export interface PrRateRefProps {
  getValue: () => number
  setValue: (value: number) => void
  reset: () => void
}

export const PrRate = forwardRef((props: PrRateProps, ref: Ref<PrRateRefProps>) => {
  const { defaultValue, count, activeCharacter, inactiveCharacter, onChange } = props
  const [starValue, setStarValue] = useState<number>(defaultValue || 0)

  useImperativeHandle(ref, () => ({
    getValue() {
      return starValue
    },
    setValue(data: number) {
      setStarValue(data)
    },
    reset() {
      setStarValue(0)
    }
  }))

  const onRating = (index: number) => {
    onChange && onChange(index + 1)
    setStarValue(index + 1)
  }

  if (starValue && starValue <= (count || 5)) {
    return (
      <div className="flex">
        {Array.from(Array(starValue).keys()).map((item, index) => {
          return (
            <div
              key={`active_${item}`}
              className="cursor-pointer transform hover:scale-125 duration-300"
              onClick={() => onRating(index)}
            >
              {activeCharacter || <ActiveStarIcon width={18} height={18} className="mr-2" />}
            </div>
          )
        })}
        {Array.from(Array((count || 5) - starValue).keys()).map((item, index) => {
          return (
            <div
              key={`inactive_${item}`}
              className="cursor-pointer transform hover:scale-125 duration-300"
              onClick={() => onRating(starValue + index)}
            >
              {inactiveCharacter || <InactiveStarIcon width={18} height={18} className="mr-2" />}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex">
      {Array.from(Array(count || 5).keys()).map((item, index) => {
        return (
          <div
            key={`inactive_${item}`}
            className="cursor-pointer transform hover:scale-125 duration-300"
            onClick={() => onRating(index)}
          >
            {inactiveCharacter || <InactiveStarIcon width={18} height={18} className="mr-2" />}
          </div>
        )
      })}
    </div>
  )
})
