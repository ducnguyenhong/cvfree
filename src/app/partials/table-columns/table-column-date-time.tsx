import moment from 'moment'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { languageState } from 'app/states/language-state'
import 'moment/locale/vi'
import { useIntl } from 'react-intl'
import { getAge } from 'utils/helper'

interface DateTimeProps {
  timestamp?: Date | number | null
  format?: string
  isAge?: boolean
}

export const DateTime: React.FC<DateTimeProps> = (props) => {
  const { timestamp, format, isAge } = props
  const language = useRecoilValue(languageState)
  const intl = useIntl()

  if (!timestamp) {
    return <span className="text-gray-300">N/A</span>
  }

  return (
    <div>
      <span className="block whitespace-nowrap">{moment(timestamp).format(format || 'DD/MM/YYYY HH:mm')}</span>
      <span className="opacity-50">
        {isAge ? (
          <span>
            {getAge(timestamp)}&nbsp;
            <span>{intl.formatMessage({ id: 'COMMON.AGE' })}</span>
          </span>
        ) : (
          moment(timestamp).locale(language).fromNow()
        )}
      </span>
    </div>
  )
}
