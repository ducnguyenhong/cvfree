import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { EducationItem1 } from './education-1.items'
import { EducationMetaDataType, EducationValue } from 'app/partials/metadata/metadata.type'

export const Education1 = forwardRef((props: Record<string, unknown>, ref) => {
  const [metaDataList, setMetaDataList] = useState<EducationMetaDataType[]>([{ ref: null, name: '', major: '' }])

  const onCreateFine = () => {
    const newMetaDataList = [...metaDataList]
    newMetaDataList.push({ ref: null, name: '', major: '' })
    setMetaDataList(newMetaDataList)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: EducationValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { name, major, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ name, major })
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
    setValue(value: EducationValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: EducationMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({ name: value[i].name, major: value[i].major, ref: null })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <EducationItem1 ref={(ref) => (item.ref = ref)} key={`education_${index}`} />
      ))}
    </div>
  )
})
