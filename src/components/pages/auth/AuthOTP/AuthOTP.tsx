import Otp, {OtpRefType} from "../Otp/Otp";
import Button from "../../../Form/Button/Button";
import CountDown, {CountDownRefType} from "../CounDown/CountDown";
import {RefObject} from "react";
import {otpCount} from "../../../../constance/otpCount";


type Props = {
  onSubmitHandler: (data:any) => void,
  otpRef: RefObject<OtpRefType>,
  countDownRef: RefObject<CountDownRefType>
  resendOtpCode: () => void
  resendOtpCodeLoading: boolean
  buttonDisabled?: boolean
}

function AuthOTP(
  {
    onSubmitHandler, otpRef, countDownRef,
    resendOtpCode, resendOtpCodeLoading, buttonDisabled
  }: Props
) {

  return (
    <>
      <Otp
        ref={otpRef} inputCount={otpCount}
        confirmOTPHandler={onSubmitHandler}
        preventEnterEvent
      />

      <Button className={{extra: 'mb-7 mt-1'}} type='submit' disabled={buttonDisabled}>
        ورود
      </Button>

      <div className='flex justify-center'>
        <CountDown loading={resendOtpCodeLoading} onClick={resendOtpCode} ref={countDownRef} />
      </div>
    </>
  )
}

export default AuthOTP