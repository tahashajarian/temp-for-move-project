
import SetNewPassword from "../../../components/pages/auth/SetNewPassword/SetNewPassword";
import LoadingPage from "../../../components/others/Loading/LoadingPage";
import useChangePassoword from "../../../components/pages/auth/change-password/hooks/useChangePassoword";

function ChangePasswordPage({}) {

  const {
    onSubmitHandler, loading, errorMessage
  } = useChangePassoword()

  return (
    <>
      <SetNewPassword
        onSubmitHandler={onSubmitHandler} buttonDisabled={loading}
        errorMessage={errorMessage}
      />

      <LoadingPage loading={loading} />
    </>
  )
}

export default ChangePasswordPage