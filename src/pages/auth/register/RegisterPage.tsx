
import AuthLayout from "../../../components/pages/auth/AuthLayout/AuthLayout";
import NationalCodeField from "../../../components/Form/FormFields/NationalCodeField/NationalCodeField";
import Button from "../../../components/Form/Button/Button";
import LoadingPage from "../../../components/others/Loading/LoadingPage";
import useRegister from "../../../components/pages/auth/register/hooks/useRegister";
import BirthDateField from "../../../components/Form/FormFields/BirthDateField/BirthDateField";
import MobileField from "../../../components/Form/FormFields/MobileField/MobileField";
import OrganizationField from "../../../components/Form/FormFields/OrganizationField/OrganizationField";
import PostField from "../../../components/Form/FormFields/PostField/PostField";
import LoginWithTwoFactorPasswordField
  from "../../../components/Form/FormFields/LoginWithTwoFactorPasswordField/LoginWithTwoFactorPasswordField";
import CloudFlareCaptcha from "../../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";

function RegisterPage({}) {

  const {
    onSubmit, formMethods, loading, errorMessage
  } = useRegister()

  return (
    <>
      <AuthLayout
        backLink onSubmit={onSubmit} formMethods={formMethods} errorMessage={errorMessage}
        title='ثبت نام' subTitle='برای ثبت نام در پنل مدیریت سامانه جامع تجارت اطلاعات خود را وارد نمایید'
      >
        <NationalCodeField checkValidation hiddenStartAdornment/>

        <BirthDateField/>

        <MobileField checkValidation/>

        <OrganizationField/>

        <PostField/>

        <LoginWithTwoFactorPasswordField/>


        <Button className={{extra: 'mt-7'}} type='submit' disabled={loading} needCloudFlare>
          تأیید
        </Button>
      </AuthLayout>

      <LoadingPage loading={loading}/>

      <CloudFlareCaptcha />
    </>
  )
}

export default RegisterPage