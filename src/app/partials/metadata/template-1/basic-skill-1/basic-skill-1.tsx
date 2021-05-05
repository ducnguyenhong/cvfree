import { BasicSkillMetaDataType, BasicSkillValue, FocusBlurType } from 'app/partials/metadata/metadata.type'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { BasicSkillItem1 } from './basic-skill-1.items'

interface BasicSkillProps extends FocusBlurType {}

export const BasicSkill1 = forwardRef((props: BasicSkillProps, ref) => {
  const { onFocus, onBlur } = props
  const [metaDataList, setMetaDataList] = useState<BasicSkillMetaDataType[]>([
    { ref: null, name: '', star: 0 },
    { ref: null, name: '', star: 0 }
  ])

  const onCreateFine = () => {
    const oldMetaData: BasicSkillMetaDataType[] = []
    if (metaDataList && metaDataList.length > 0) {
      for (let i = 0; i < metaDataList.length; i++) {
        const data = metaDataList[i].ref?.getValue()
        data && oldMetaData.push({ ...data, ref: null })
      }
    }
    const newMetaData = [...oldMetaData, { ref: null, name: '', star: 0 }]
    setMetaDataList(newMetaData)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: BasicSkillValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { name, star, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ name, star })
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
    setValue(value: BasicSkillValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: BasicSkillMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({ name: value[i].name, star: value[i].star, ref: null })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <BasicSkillItem1
          ref={(ref) => (item.ref = ref)}
          key={`basic_skill_${index}`}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ))}
    </div>
  )
})
