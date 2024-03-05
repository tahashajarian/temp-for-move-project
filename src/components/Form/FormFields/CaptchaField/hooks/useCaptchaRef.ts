import {useRef} from "react";
import {CaptchaFieldRefType} from "../CaptchaField";

function useCaptchaRef() {
  const captchaRef = useRef<CaptchaFieldRefType>(null)

  return captchaRef
}

export default useCaptchaRef