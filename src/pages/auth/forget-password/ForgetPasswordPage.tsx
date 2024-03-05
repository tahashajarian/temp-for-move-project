
import AuthLayout from "../../../components/pages/auth/AuthLayout/AuthLayout";
import Button from "../../../components/Form/Button/Button";
import NationalCodeField from "../../../components/Form/FormFields/NationalCodeField/NationalCodeField";
import useForgetPassword from "../../../components/pages/auth/forget-password/hooks/useForgetPassword";
import LoadingPage from "../../../components/others/Loading/LoadingPage";
import CloudFlareCaptcha from "../../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";

function ForgetPasswordPage({}) {

  const {
    onSubmit, formMethods, loading, errorMessage
  } = useForgetPassword()

  return (
    <>
      <AuthLayout
        onSubmit={onSubmit} formMethods={formMethods} backLink errorMessage={errorMessage}
        title='فراموشی کلمه عبور' subTitle='جهت بازیابی کلمه عبور ابتدا کدملی خود را وارد کنید'
      >
        <NationalCodeField/>

        <Button className={{extra: 'mt-2'}} type='submit' disabled={loading} needCloudFlare>
          ادامه
        </Button>
      </AuthLayout>

      <CloudFlareCaptcha />

      <LoadingPage loading={loading} />
    </>
  )
}

export default ForgetPasswordPage