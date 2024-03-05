import ErrorIcon from "../svg/ErrorIcon";


type Props = {
  message: string
}

function ErrorMessage({message}: Props) {
  return (
    <div className='flex items-center p-2 bg-red-50 rounded space-x-reverse space-x-2'>
      <div className='w-6 h-6'>
        <ErrorIcon />
      </div>
      <span className='text-[15px] text-red-500 leading-[29.175px]'>
        {message}
      </span>
    </div>
  )
}

export default ErrorMessage