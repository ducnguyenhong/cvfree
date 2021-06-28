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
      <div className="mb-2">
        <span className="uppercase font-bold py-1 bg-pink-100 text-base relative block px-4">Chứng chỉ</span>
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
