import ImageError from 'assets/images/error-404.jpg'

interface ErrorProps {}

export const ErrorLayout: React.FC<ErrorProps> = () => {
  return (
    <div className="flex items-center justify-center pt-40">
      <img src={ImageError} alt="error" />
    </div>
  )
}
