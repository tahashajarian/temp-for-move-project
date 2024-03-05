'use client'

import AuthLayout from "../../../../components/pages/auth/AuthLayout/AuthLayout";
import AuthOTP from "../../../../components/pages/auth/AuthOTP/AuthOTP";
import LoadingPage from "../../../../components/others/Loading/LoadingPage";
import useRegisterOtp from "../../../../components/pages/auth/register/otp/hooks/useRegisterOtp";
import CloudFlareCaptcha from "../../../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";

function RegisterOtpPage({}) {

  const {
    onSubmit, formMethods, otpRef,
    mobile, countDownRef, loading,
    resendOtpCode, resendOtpCodeLoading, onBackHandler
  } = useRegisterOtp()

  return (
    <>
      <AuthLayout
        onSubmit={onSubmit} formMethods={formMethods} backLink onBackHandler={onBackHandler}
        title='احراز هویت' subTitle={(
        <>لطفا کد ارسال شده به شماره  “<span dir='ltr' className='text-primary'>{mobile}</span>”  را وارد نمایید</>
      )}
      >
        <AuthOTP
          otpRef={otpRef} buttonDisabled={loading}
          countDownRef={countDownRef} onSubmitHandler={onSubmit}
          resendOtpCode={resendOtpCode} resendOtpCodeLoading={resendOtpCodeLoading}
        />
      </AuthLayout>

      <LoadingPage loading={loading} />

      <CloudFlareCaptcha />
    </>
  )
}

export default RegisterOtpPage