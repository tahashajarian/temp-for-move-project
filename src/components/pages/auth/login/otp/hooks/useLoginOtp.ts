import useAuthOTP from "../../../AuthOTP/hooks/useAuthOTP";
import APIES from "../../../../../../constance/apies";
import useAxios from "../../../../../../request/hooks/useAxios";
import useLoginToDashboard from "../../../useLoginToDashboard";
import {toast} from "react-toastify";
import Ls from "../../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../../constance/localStorageKeys";
import useReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {otpFieldName, OtpType} from "../../../Otp/OtpExports";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ROUTER_LINKS from "../../../../../../constance/routerLinks";

type FormDataType = {
  [otpFieldName]: OtpType
}

function useLoginOtp() {
  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const navigate = useNavigate()

  const nationalCode = Ls.get(LS_KEYS.LOGIN.NATIONAL_CODE)
  const password = Ls.get(LS_KEYS.LOGIN.PASSWORD)
  const mobile = Ls.get(LS_KEYS.LOGIN_OTP.MOBILE)

  const [loginOtpResponse, loginOtpRequest] = useAxios()
  const [resendOtpResponse, resendOtpRequest] = useAxios()
  const [otpTimeResponse, otpTimeRequest] = useAxios()

  const loginToDashboard = useLoginToDashboard()

  useEffect(function () {
    if (!nationalCode) navigate(ROUTER_LINKS.LOGIN, {replace: true})
  }, [])

  async function getOtpTime() {
    try {
      const url = APIES.TWO_FACTOR_OTP
      const params = {userName: nationalCode}
      const response = await otpTimeRequest({url, params})
      return response?.data
    } catch (error) {
      navigate(ROUTER_LINKS.LOGIN, {replace: true})
    }
  }

  const {
    otpRef, countDownRef, startOtpTime, otpTimeLoading
  } = useAuthOTP({getOtpTime})

  useEffect(() => {
    startOtpTime()
  }, []);

  function onSubmitHandler(formData: FormDataType) {

    const data = {
      "userName": nationalCode,
      "password": password,
      "twoFactorCode": formData[otpFieldName],
      "twoFactorRecoveryCode": null,
    }

    const url = APIES.LOGIN
    loginOtpRequest({url, method: "POST", data, addCloudFlareCode: true}).then((res) => {
      loginToDashboard(res)
    }).catch(error => {
      otpRef?.current && otpRef?.current.clear()
      formMethods.reset()
    })
  }

  function resendOtpCode() {
    const data = {
      nationalCode,
    }

    const url = APIES.LOGIN_RESEND_OTP
    resendOtpRequest({url, method: "POST", data, addCloudFlareCode: true}).then((res) => {

      const statusCode = res.data?.value?.statusCode
      const fireToastError = () => toast.error(res.data?.value?.message || '')

      if (statusCode === 901) {
        fireToastError()
      } else if (statusCode === 902) {
        fireToastError()
        navigate(ROUTER_LINKS.LOGIN, {replace: true})
      } else {
        toast.success('کد تأیید به شماره همراه شما ارسال گردید')
        startOtpTime()
        otpRef?.current && otpRef?.current.clear()
        formMethods.reset()
      }

    }).catch()
  }

  return {
    otpRef, mobile, countDownRef, onSubmit, formMethods,
    loading: loginOtpResponse.loading, resendOtpCode,
    resendOtpCodeLoading: resendOtpResponse.loading || otpTimeLoading
  }
}

export default useLoginOtp