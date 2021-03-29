import CertificateIcon from 'assets/icons/certificate.svg'

interface CertificateInfoProps {
  certificate?: {
    name: string
  }[]
}

export const CertificateInfo: React.FC<CertificateInfoProps> = (props) => {
  const { certificate } = props

  if (!certificate || certificate.length === 0) {
    return null
  }

  return (
    <div className="px-2 py-1">
      <div className="flex items-center mb-4">
        <img src={CertificateIcon} alt="icon" className="w-10 h-10 mr-3" />
        <span className="uppercase font-bold">Chứng chỉ</span>
      </div>
      {certificate &&
        certificate.length > 0 &&
        certificate.map((item, index) => {
          return (
            <div className="flex w-full pb-2.5 pl-4 pr-2" key={`certificate_${index}`}>
              <div className="w-full pb-1.5">
                <span className="block bg-transparent w-full text-gray-500 font-medium">- {item.name}</span>
              </div>
            </div>
          )
        })}
    </div>
  )
}
