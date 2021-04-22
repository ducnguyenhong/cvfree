import ImageError from 'assets/images/error-404.jpg'

interface ErrorProps {}

export const ErrorLayout: React.FC<ErrorProps> = () => {
  return (
    <div className="flex items-center justify-center pt-28 bg-white">
      <img src={ImageError} className="mt-5 mb-10" alt="error" style={{ height: '60vh' }} />
    </div>
  )
}
