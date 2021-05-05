export interface FocusBlurType {
  onFocus?: () => void
  onBlur?: () => void
}

// Basic skill
export interface BasicSkillValue {
  name: string
  star: number
}
export interface BasicSkillRef {
  getValue: () => BasicSkillValue[]
  setValue: (value: BasicSkillValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface BasicSkillItemRef {
  getValue: () => BasicSkillValue | null
  setValue: (value: BasicSkillValue) => void
  validate?: () => void
}
export interface BasicSkillMetaDataType extends BasicSkillValue {
  ref: BasicSkillItemRef | null
}

// Education
export interface EducationValue {
  name: string
  major?: string
}
export interface EducationRef {
  getValue: () => EducationValue[]
  setValue: (value: EducationValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface EducationItemRef {
  getValue: () => EducationValue | null
  setValue: (value: EducationValue) => void
  validate?: () => void
}
export interface EducationMetaDataType extends EducationValue {
  ref: EducationItemRef | null
}

// Activity
export interface ActivityValue {
  name: string
  time?: string
}
export interface ActivityRef {
  getValue: () => ActivityValue[]
  setValue: (value: ActivityValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface ActivityItemRef {
  getValue: () => ActivityValue | null
  setValue: (value: ActivityValue) => void
  validate?: () => void
}
export interface ActivityMetaDataType extends ActivityValue {
  ref: ActivityItemRef | null
}

// Work experience
export interface WorkExperienceValue {
  companyName: string
  time?: string
  position?: string
  description?: string
}
export interface WorkExperienceRef {
  getValue: () => WorkExperienceValue[]
  setValue: (value: WorkExperienceValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface WorkExperienceItemRef {
  getValue: () => WorkExperienceValue | null
  setValue: (value: WorkExperienceValue) => void
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
  getValue: () => AdvancedSkillValue[]
  setValue: (value: AdvancedSkillValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface AdvancedSkillItemRef {
  getValue: () => AdvancedSkillValue | null
  setValue: (value: AdvancedSkillValue) => void
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
  getValue: () => AwardValue[]
  setValue: (value: AwardValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface AwardItemRef {
  getValue: () => AwardValue | null
  setValue: (value: AwardValue) => void
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
  getValue: () => CertificateValue[]
  setValue: (value: CertificateValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface CertificateItemRef {
  getValue: () => CertificateValue | null
  setValue: (value: CertificateValue) => void
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
  getValue: () => AnotherInfoValue[]
  setValue: (value: AnotherInfoValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface AnotherInfoItemRef {
  getValue: () => AnotherInfoValue | null
  setValue: (value: AnotherInfoValue) => void
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
  getValue: () => PresenterValue[]
  setValue: (value: PresenterValue[] | null) => void
  validate?: () => boolean
  onCreate: () => void
}
export interface PresenterItemRef {
  getValue: () => PresenterValue | null
  setValue: (value: PresenterValue) => void
  validate?: () => void
}
export interface PresenterMetaDataType extends PresenterValue {
  ref: PresenterItemRef | null
}
