import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ActivityItem2 } from './activity-2.items'
import { ActivityMetaDataType, ActivityValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface ActivityProps extends FocusBlurType {}

export const Activity2 = forwardRef((props: ActivityProps, ref) => {
  const { onFocus, onBlur } = props
  const [metaDataList, setMetaDataList] = useState<ActivityMetaDataType[]>([{ ref: null, name: '', time: '' }])

  const onCreateFine = () => {
    const oldMetaData: ActivityMetaDataType[] = []
    if (metaDataList && metaDataList.length > 0) {
      for (let i = 0; i < metaDataList.length; i++) {
        const data = metaDataList[i].ref?.getValue()
        data && oldMetaData.push({ ...data, ref: null })
      }
    }
    const newMetaData = [...oldMetaData, { ref: null, name: '', time: '' }]
    setMetaDataList(newMetaData)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: ActivityValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { name, time, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ name, time })
      }
    }
  }, [metaDataList])

  useImperativeHandle(ref, () => ({
    getValue() {
      return getValue()
    },
    onCreate() {
      onCreateFine()
    },
    setValue(value: ActivityValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: ActivityMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({ name: value[i].name, time: value[i].time, ref: null })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <ActivityItem2 ref={(ref) => (item.ref = ref)} key={`activity_${index}`} onFocus={onFocus} onBlur={onBlur} />
      ))}
    </div>
  )
})
