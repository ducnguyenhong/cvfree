import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { EducationItem1 } from './education-1.items'
import { EducationMetaDataType, EducationValue, FocusBlurType } from 'app/partials/metadata/metadata.type'

interface EducationProps extends FocusBlurType {}

export const Education1 = forwardRef((props: EducationProps, ref) => {
  const { onFocus, onBlur } = props
  const [metaDataList, setMetaDataList] = useState<EducationMetaDataType[]>([{ ref: null, name: '', major: '' }])

  const onCreateFine = () => {
    const oldMetaData: EducationMetaDataType[] = []
    if (metaDataList && metaDataList.length > 0) {
      for (let i = 0; i < metaDataList.length; i++) {
        const data = metaDataList[i].ref?.getValue()
        data && oldMetaData.push({ ...data, ref: null })
      }
    }
    const newMetaData = [...oldMetaData, { ref: null, name: '', major: '' }]
    setMetaDataList(newMetaData)
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
        <EducationItem1 ref={(ref) => (item.ref = ref)} key={`education_${index}`} onBlur={onBlur} onFocus={onFocus} />
      ))}
    </div>
  )
})
