import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { AnotherInfoItem1 } from './another-info-1.items'
import { AnotherInfoMetaDataType, AnotherInfoValue } from 'app/partials/metadata/metadata.type'

export const AnotherInfo1 = forwardRef((props: Record<string, unknown>, ref) => {
  const [metaDataList, setMetaDataList] = useState<AnotherInfoMetaDataType[]>([{ ref: null, info: '' }])

  const onCreateFine = () => {
    const newMetaDataList = [...metaDataList]
    newMetaDataList.push({ ref: null, info: '' })
    setMetaDataList(newMetaDataList)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: AnotherInfoValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { info, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ info })
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
    setValue(value: AnotherInfoValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: AnotherInfoMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({ info: value[i].info, ref: null })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <AnotherInfoItem1 ref={(ref) => (item.ref = ref)} key={`another_info_${index}`} />
      ))}
    </div>
  )
})
