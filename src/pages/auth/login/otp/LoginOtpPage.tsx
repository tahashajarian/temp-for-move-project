
import AuthLayout from "../../../../components/pages/auth/AuthLayout/AuthLayout";
import AuthOTP from "../../../../components/pages/auth/AuthOTP/AuthOTP";
import useLoginOtp from "../../../../components/pages/auth/login/otp/hooks/useLoginOtp";
import LoadingPage from "../../../../components/others/Loading/LoadingPage";
import CloudFlareCaptcha from "../../../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";

function LoginOtpPage({}) {

  const {
    onSubmit, formMethods, otpRef,
    mobile, countDownRef, loading,
    resendOtpCode, resendOtpCodeLoading
  } = useLoginOtp()

  return (
    <>
      <AuthLayout
        onSubmit={onSubmit} formMethods={formMethods} backLink
        title='ورود دوعاملی' subTitle={(
        <>لطفا کد ارسال شده به شماره  “<span dir='ltr' className='text-primary'>{mobile}</span>”  را وارد نمایید</>
      )}
      >
        <AuthOTP
          otpRef={otpRef} buttonDisabled={loading}
          countDownRef={countDownRef} onSubmitHandler={onSubmit}
          resendOtpCode={resendOtpCode} resendOtpCodeLoading={resendOtpCodeLoading}
        />

        <CloudFlareCaptcha />
      </AuthLayout>

      <LoadingPage loading={loading} />
    </>
  )
}

export default LoginOtpPage