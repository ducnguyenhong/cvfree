import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react'
import Items from './metadata-basic-skills.items'

export interface MetaDataRefProps {
  getValue: () => void
  setValue?: (keyword: string) => void
  validate: () => boolean
  onCreate: () => void
}

interface Props {
  metadata?: string | Record<string, unknown> | null
}

const MetaData = forwardRef((props: Props, ref: Ref<MetaDataRefProps>) => {
  const { metadata } = props
  const [metaDataList, setMetaDataList] = useState<any[]>([{ ref: null }, { ref: null }])

  const onCreateFine = () => {
    const newMetaDataList = [...metaDataList]
    newMetaDataList.push({ ref: null })
    setMetaDataList(newMetaDataList)
  }

  const getValue = () => {
    if (metaDataList.length === 0) {
      return null
    }

    let values = {}
    metaDataList.forEach((item: any) => {
      const value = item.ref.getValue()
      if (value) {
        values = { ...values, ...value }
      }
    })

    return values
  }

  const validate = () => {
    const result = metaDataList.every((item: any) => {
      if (!item.ref.checkValidate()) {
        return false
      }
      return true
    })

    return result
  }

  useEffect(() => {
    if (metadata) {
      const metaDataObject = typeof metadata === 'string' ? JSON.parse(metadata) : metadata
      const oldMetaDataList = Object.entries(metaDataObject).map(([key, value]) => {
        const item = { key, value, ref: null }
        return item
      })
      setMetaDataList(oldMetaDataList)
    }
  }, [metadata])

  useEffect(() => {
    if (metaDataList) {
      metaDataList.forEach((item: any) => {
        const { key, value, ref } = item
        if (typeof key === 'string' && (typeof value === 'string' || typeof value === 'number')) {
          ref.setValue({ key, value })
        }
      })
    }
  }, [metaDataList])

  useImperativeHandle(ref, () => ({
    validate() {
      return validate()
    },
    getValue() {
      return getValue()
    },
    onCreate() {
      onCreateFine()
    }
  }))

  return (
    <div>
      {metaDataList.map((item: any, index: number) => (
        <Items ref={(ref) => (item.ref = ref)} key={JSON.stringify(index)} />
      ))}
    </div>
  )
})

MetaData.displayName = 'MetaData'

export default MetaData
