import LoadingIcon from 'assets/icons/loading-page.svg'

const LoadingPage: React.FC = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={LoadingIcon} alt="loading" />
    </div>
  )
}

export default LoadingPage
