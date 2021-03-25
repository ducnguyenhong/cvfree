// Basic skill
export interface BasicSkillValue {
  name: string
  star: number
}
export interface BasicSkillRef {
  getValue: () => void
  setValue?: (value: BasicSkillValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface BasicSkillItemRef {
  getValue: () => void
  setValue?: (value: BasicSkillValue) => void
  validate?: () => void
}
export interface BasicSkillMetaDataType extends BasicSkillValue {
  ref: BasicSkillItemRef | null
}

// Education
export interface EducationValue {
  name: string
  major: string
}
export interface EducationRef {
  getValue: () => void
  setValue?: (value: EducationValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface EducationItemRef {
  getValue: () => void
  setValue?: (value: EducationValue) => void
  validate?: () => void
}
export interface EducationMetaDataType extends EducationValue {
  ref: EducationItemRef | null
}

// Activity
export interface ActivityValue {
  name: string
  time: string
}
export interface ActivityRef {
  getValue: () => void
  setValue?: (value: ActivityValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface ActivityItemRef {
  getValue: () => void
  setValue?: (value: ActivityValue) => void
  validate?: () => void
}
export interface ActivityMetaDataType extends ActivityValue {
  ref: ActivityItemRef | null
}
