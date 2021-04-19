import moment from 'moment'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { languageState } from 'app/states/language-state'
import 'moment/locale/vi'

export const DateTime: React.FC<{ timestamp?: Date | number | null }> = (props) => {
  const { timestamp } = props
  const language = useRecoilValue(languageState)

  if (!timestamp) {
    return <span className="text-gray-300">N/A</span>
  }

  return (
    <div>
      <span className="block whitespace-nowrap">{moment(timestamp).format('DD/MM/YYYY HH:mm')}</span>
      <span className="opacity-50">{moment(timestamp).locale(language).fromNow()}</span>
    </div>
  )
}
