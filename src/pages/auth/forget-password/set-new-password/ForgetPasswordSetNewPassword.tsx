'use client'

import useForgetPasswordSetNewPassword
  from "../../../../components/pages/auth/forget-password/set-new-password/hooks/useForgetPasswordSetNewPassword";
import LoadingPage from "../../../../components/others/Loading/LoadingPage";
import SetNewPassword from "../../../../components/pages/auth/SetNewPassword/SetNewPassword";

function ForgetPasswordSetNewPassword({}) {

  const {
    onSubmitHandler, loading, errorMessage
  } = useForgetPasswordSetNewPassword()

  return (
    <>
      <SetNewPassword
        onSubmitHandler={onSubmitHandler} buttonDisabled={loading}
        title='تعیین کلمه عبور جدید' errorMessage={errorMessage}
      />

      <LoadingPage loading={loading} />
    </>
  )
}

export default ForgetPasswordSetNewPassword