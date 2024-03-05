'use client'

import AuthLayout from "../../../../components/pages/auth/AuthLayout/AuthLayout";
import AuthOTP from "../../../../components/pages/auth/AuthOTP/AuthOTP";
import useForgetPasswordOtp from "../../../../components/pages/auth/forget-password/otp/hooks/useForgetPasswordOtp";
import LoadingPage from "../../../../components/others/Loading/LoadingPage";
import CloudFlareCaptcha from "../../../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";

function ForgetPasswordOtpPage({}) {

  const {
    onSubmit, formMethods, otpRef, mobile,
    countDownRef, loading, resendOtpCodeLoading, resendOtpCode,
  } = useForgetPasswordOtp()

  return (
    <>
      <AuthLayout
        onSubmit={onSubmit} formMethods={formMethods} backLink
        title='احراز هویت' subTitle={(
        <>لطفا کد ارسال شده به شماره “<span dir='ltr' className='text-primary'>{mobile}</span>” را وارد نمایید</>
      )}
      >
        <AuthOTP
          otpRef={otpRef} resendOtpCodeLoading={resendOtpCodeLoading}
          countDownRef={countDownRef} onSubmitHandler={onSubmit}
          resendOtpCode={resendOtpCode} buttonDisabled={loading}
        />

        <CloudFlareCaptcha />
      </AuthLayout>

      <LoadingPage loading={loading} />
    </>
  )
}

export default ForgetPasswordOtpPage