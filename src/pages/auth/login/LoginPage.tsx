
import AuthLayout from "../../../components/pages/auth/AuthLayout/AuthLayout";
import Button from "../../../components/Form/Button/Button";
import NationalCodeField from "../../../components/Form/FormFields/NationalCodeField/NationalCodeField";
import PasswordField from "../../../components/Form/FormFields/PasswordField/PasswordField";
import CaptchaField from "../../../components/Form/FormFields/CaptchaField/CaptchaField";
import AccountInactivityModal from "../../../components/pages/auth/login/AccountInactivityModal";
import ExpirationOfAccountCreditModal from "../../../components/pages/auth/login/ExpirationOfAccountCreditModal";
import useLogin from "../../../components/pages/auth/login/hooks/useLogin";
import LoadingPage from "../../../components/others/Loading/LoadingPage";
import {Link} from "react-router-dom";
import ROUTER_LINKS from "../../../constance/routerLinks";
import SuccessFulRegistrationModal from "../../../components/pages/auth/login/SuccessFulRegistrationModal";
import CloudFlareCaptcha from "../../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";


function LoginPage({}) {

  const {
    onSubmit, formMethods, errorStatus, setErrorStatus, loading,
    captchaRef, showSuccessfulRegistration, showSuccessfulRegistrationOnClose,
    errorMessage, modalErrorMessage
  } = useLogin()

  return (
    <>
      <AuthLayout
        onSubmit={onSubmit} formMethods={formMethods} errorMessage={errorMessage}
        title='ورود' subTitle='برای ورود به پنل  مدیریت سامانه جامع تجارت کد ملی  و کلمه عبور خود را وارد کنید'
      >
        <NationalCodeField/>

        <PasswordField forgetPasswordEndAdornment/>

        <CaptchaField ref={captchaRef}/>

        <CloudFlareCaptcha />

        <Button className={{extra: 'my-2'}} type='submit' disabled={loading} needCloudFlare>
          ورود
        </Button>

        <Link to={ROUTER_LINKS.REGISTER}>
          <Button variant='text'>
            ثبت نام
          </Button>
        </Link>
      </AuthLayout>

      <AccountInactivityModal
        errorStatus={errorStatus} setErrorStatus={setErrorStatus} modalErrorMessage={modalErrorMessage}
      />

      <ExpirationOfAccountCreditModal
        errorStatus={errorStatus} setErrorStatus={setErrorStatus} modalErrorMessage={modalErrorMessage}
      />

      <SuccessFulRegistrationModal open={showSuccessfulRegistration} onClose={showSuccessfulRegistrationOnClose}/>

      <LoadingPage loading={loading}/>
    </>
  )
}

export default LoginPage