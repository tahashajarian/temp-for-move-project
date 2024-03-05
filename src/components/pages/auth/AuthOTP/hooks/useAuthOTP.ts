import {useRef, useState} from "react";
import {OtpRefType} from "../../Otp/Otp";
import {CountDownRefType} from "../../CounDown/CountDown";

type Props = {
  getOtpTime?: () => Promise<{
    errors: string[],
    message: null | string,
    result: string,
    statusCode: number
  }> | undefined
}

function UseAuthOtp({getOtpTime}: Props) {

  const [otpTimeLoading, setOtpTimeLoading] = useState(true)

  const otpRef = useRef<OtpRefType>(null)
  const countDownRef = useRef<CountDownRefType>(null)

  function startOtpTime() {
    if (!getOtpTime || !countDownRef.current) return

    (async () => {
      setOtpTimeLoading(true)
      const response = await getOtpTime()
      setOtpTimeLoading(false)
      if (!response) return
      const remainingTime = (new Date(response?.result).getTime() - new Date().getTime())
      const roundedRemainingTime = Math.ceil(remainingTime / 1000)
      countDownRef?.current?.startCountDown(roundedRemainingTime >= 0 ? roundedRemainingTime : 0)
    })()
  }

  return {
    otpRef, countDownRef, startOtpTime, otpTimeLoading
  }
}

export default UseAuthOtp