import {Turnstile} from "@marsidev/react-turnstile";
import {useCloudFlareCaptchaContext} from "../../../contexts/CloudFlareCaptchaContext";

export const cloudFlareWrapperClassName = "cf-turnstile"
export const cloudFlareFieldName = "cfResponseCode"

function CloudFlareCaptcha({}) {

  const {setCloudFlareCode} = useCloudFlareCaptchaContext()

  return (
    <div className='fixed top-0 right-0 opacity-0 pointer-events-none'>
      <Turnstile siteKey='1x00000000000000000000AA' onSuccess={setCloudFlareCode}/>
    </div>
  )
}

export default CloudFlareCaptcha