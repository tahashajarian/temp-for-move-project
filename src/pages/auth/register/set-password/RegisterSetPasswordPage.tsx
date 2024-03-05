
import SetNewPassword from "../../../../components/pages/auth/SetNewPassword/SetNewPassword";
import LoadingPage from "../../../../components/others/Loading/LoadingPage";
import useRegisterSetPassword
  from "../../../../components/pages/auth/register/set-password/hooks/useRegisterSetPassword";

function RegisterSetPasswordPage() {

  const {
    onSubmitHandler, loading, errorMessage
  } = useRegisterSetPassword()

  return (
    <>
      <SetNewPassword
        onSubmitHandler={onSubmitHandler} buttonDisabled={loading} errorMessage={errorMessage}
      />

      <LoadingPage loading={loading} />
    </>
  )
}

export default RegisterSetPasswordPage