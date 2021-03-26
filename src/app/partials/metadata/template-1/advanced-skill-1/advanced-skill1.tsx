import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { AdvancedSkillItem1 } from './advanced-skill-1.items'
import { AdvancedSkillMetaDataType, AdvancedSkillValue } from 'app/partials/metadata/metadata.type'

export const AdvancedSkill1 = forwardRef((props: Record<string, unknown>, ref) => {
  const [metaDataList, setMetaDataList] = useState<AdvancedSkillMetaDataType[]>([
    { ref: null, name: '', description: '' }
  ])

  const onCreateFine = () => {
    const newMetaDataList = [...metaDataList]
    newMetaDataList.push({ ref: null, name: '', description: '' })
    setMetaDataList(newMetaDataList)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    const value: AdvancedSkillValue[] = []
    for (let i = 0; i < metaDataList.length; i++) {
      const data = metaDataList[i].ref?.getValue()
      data && value.push(data)
    }

    return value
  }

  useEffect(() => {
    if (metaDataList) {
      for (let i = 0; i < metaDataList.length; i++) {
        const { name, description, ref } = metaDataList[i]
        ref && ref.setValue && ref.setValue({ name, description })
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
    setValue(value: AdvancedSkillValue[] | null) {
      if (value && value.length > 0) {
        const newMetaDataList: AdvancedSkillMetaDataType[] = []
        for (let i = 0; i < value.length; i++) {
          newMetaDataList.push({
            name: value[i].name,
            description: value[i].description,
            ref: null
          })
        }
        setMetaDataList(newMetaDataList)
      }
    }
  }))

  return (
    <div>
      {metaDataList.map((item, index) => (
        <AdvancedSkillItem1 ref={(ref) => (item.ref = ref)} key={`ad_skill_${index}`} />
      ))}
    </div>
  )
})
