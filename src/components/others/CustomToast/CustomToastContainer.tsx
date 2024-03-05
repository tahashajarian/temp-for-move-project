
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";


type Props = {
  className?: string
}

export default function CustomToastContainer({className}: Props) {
  return (
    <ToastContainer
      style={{fontFamily: 'IRANYekan', fontWeight: 500}}
      bodyClassName={() => `${className} text-sm font-white font-IRANYekan font-medium flex items-center p-1 leading-6`}
      rtl={true}
      position="top-left"
    />
  )
}