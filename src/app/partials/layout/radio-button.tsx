import styled from 'styled-components'
import { useState } from 'react'

const RadioStyle = styled.div`
  .toggle-line {
    height: 28px;
  }

  .toggle-dot {
    height: 23px;
    width: 23px;
    transition: all 0.2s ease-in-out;
  }

  input:checked ~ .toggle-dot {
    transform: translateX(100%);
  }
`

export const RadioButton: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(true)
  return (
    <RadioStyle>
      <div className="flex items-center justify-center w-full overflow-hidden">
        <label htmlFor="toogleButton" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="toogleButton"
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <div
              className={`toggle-line w-12 pr-3 rounded-full shadow-inner flex items-center justify-center ${
                checked ? 'bg-green-600' : 'bg-gray-300'
              }`}
            ></div>
            <div
              className={`toggle-dot absolute top-0.5 rounded-full shadow inset-y-0 flex items-center justify-center ${
                checked ? 'bg-white right-6' : 'bg-white left-0.5'
              }`}
            ></div>
          </div>
        </label>
      </div>
    </RadioStyle>
  )
}
