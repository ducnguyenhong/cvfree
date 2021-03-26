import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { AwardItem1 } from './award-1.items'
import { AwardMetaDataType, AwardValue } from 'app/partials/metadata/metadata.type'

export const Award1 = forwardRef((props: Record<string, unknown>, ref) => {
  const [metaDataList, setMetaDataList] = useState<AwardMetaDataType[]>([{ ref: null, name: '' }])

  const onCreateFine = () => {
    const newMetaDataList = [...metaDataList]
    newMetaDataList.push({ ref: null, name: '' })
    setMetaDataList(newMetaDataList)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: AwardValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { name, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ name })
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
    setValue(value: AwardValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: AwardMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({ name: value[i].name, ref: null })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <AwardItem1 ref={(ref) => (item.ref = ref)} key={`award_${index}`} />
      ))}
    </div>
  )
})
