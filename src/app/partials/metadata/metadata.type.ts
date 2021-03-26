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

// Work experience
export interface WorkExperienceValue {
  companyName: string
  time: string
  position: string
  description?: string
}
export interface WorkExperienceRef {
  getValue: () => void
  setValue?: (value: WorkExperienceValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface WorkExperienceItemRef {
  getValue: () => void
  setValue?: (value: WorkExperienceValue) => void
  validate?: () => void
}
export interface WorkExperienceMetaDataType extends WorkExperienceValue {
  ref: WorkExperienceItemRef | null
}

// Advanced skill
export interface AdvancedSkillValue {
  name: string
  description?: string
}
export interface AdvancedSkillRef {
  getValue: () => void
  setValue?: (value: AdvancedSkillValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface AdvancedSkillItemRef {
  getValue: () => void
  setValue?: (value: AdvancedSkillValue) => void
  validate?: () => void
}
export interface AdvancedSkillMetaDataType extends AdvancedSkillValue {
  ref: AdvancedSkillItemRef | null
}

// Award
export interface AwardValue {
  name: string
}
export interface AwardRef {
  getValue: () => void
  setValue?: (value: AwardValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface AwardItemRef {
  getValue: () => void
  setValue?: (value: AwardValue) => void
  validate?: () => void
}
export interface AwardMetaDataType extends AwardValue {
  ref: AwardItemRef | null
}

// Certificate
export interface CertificateValue {
  name: string
}
export interface CertificateRef {
  getValue: () => void
  setValue?: (value: CertificateValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface CertificateItemRef {
  getValue: () => void
  setValue?: (value: CertificateValue) => void
  validate?: () => void
}
export interface CertificateMetaDataType extends CertificateValue {
  ref: CertificateItemRef | null
}

// Another info
export interface AnotherInfoValue {
  info: string
}
export interface AnotherInfoRef {
  getValue: () => void
  setValue?: (value: AnotherInfoValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface AnotherInfoItemRef {
  getValue: () => void
  setValue?: (value: AnotherInfoValue) => void
  validate?: () => void
}
export interface AnotherInfoMetaDataType extends AnotherInfoValue {
  ref: AnotherInfoItemRef | null
}

// Presenter
export interface PresenterValue {
  name: string
  company?: string
  position?: string
  phone?: string
}
export interface PresenterRef {
  getValue: () => void
  setValue?: (value: PresenterValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface PresenterItemRef {
  getValue: () => void
  setValue?: (value: PresenterValue) => void
  validate?: () => void
}
export interface PresenterMetaDataType extends PresenterValue {
  ref: PresenterItemRef | null
}
