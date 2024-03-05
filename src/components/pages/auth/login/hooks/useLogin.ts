import {useNavigate, useSearchParams} from "react-router-dom";
import useAxios from "../../../../../request/hooks/useAxios";
import {useState} from "react";
import {
  nationalCodeFieldName
} from "../../../../Form/FormFields/NationalCodeField/NationalCodeFieldExports";
import {passwordFieldname} from "../../../../Form/FormFields/PasswordField/PasswordFieldExports";
import APIES from "../../../../../constance/apies";
import ROUTER_LINKS from "../../../../../constance/routerLinks";
import useLoginToDashboard from "../../useLoginToDashboard";
import useCaptchaRef from "../../../../Form/FormFields/CaptchaField/hooks/useCaptchaRef";
import {captchaFieldName} from "../../../../Form/FormFields/CaptchaField/CaptchaFieldExports";
import Ls from "../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../constance/localStorageKeys";
import useReactHookFormWrapper from "../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import QUERY_PARAMS from "../../../../../constance/queryParams";


const loginErrorStatuses: any = {
  419: 'EXPIRED',
  421: 'INACTIVITY',
}

export type LoginErrorStatusType = typeof loginErrorStatuses[keyof typeof loginErrorStatuses]

type FormDataType = {
  [nationalCodeFieldName]: string;
  [passwordFieldname]: string;
  [captchaFieldName]: string;
};

function useLogin() {
  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const {setValue, setError} = formMethods

  const navigate = useNavigate()

  const [loginResponse, loginRequest] = useAxios()

  const captchaRef = useCaptchaRef()

  const [errorStatus, setErrorStatus] = useState<LoginErrorStatusType | ''>('')
  const [modalErrorMessage, setModalErrorMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const loginToDashboard = useLoginToDashboard()

  //TODO fix bottom code
  const [searchParams, ] = useSearchParams()
  const showSuccessfulRegistration = searchParams.get(QUERY_PARAMS.SHOW_SUCCESSFUL_REGISTRATION)

  function onSubmitHandler(formData: FormDataType) {
    setErrorMessage('')

    const data = {
      userName: formData[nationalCodeFieldName],
      password: formData[passwordFieldname],
      twoFactorCode: null,
      twoFactorRecoveryCode: null,
      captchaCode: formData[captchaFieldName],
      secret: captchaRef.current && captchaRef.current.secret,
    }

    const url = APIES.LOGIN

    loginRequest({url, method: "POST", data, disabledThrowErrorToast: true, addCloudFlareCode: true}).then((res) => {

      if (res.status === 200) {
        loginToDashboard(res)
      } else if (res.status === 202) {
        Ls.add(LS_KEYS.LOGIN.NATIONAL_CODE, formData[nationalCodeFieldName])
        Ls.add(LS_KEYS.LOGIN.PASSWORD, formData[passwordFieldname])
        Ls.add(LS_KEYS.LOGIN_OTP.MOBILE, res?.data?.detail)

        navigate(ROUTER_LINKS.LOGIN_OTP)
      }

    }).catch(async (error) => {
      if (Object.keys(loginErrorStatuses).includes(String(error.status))) {
        setErrorStatus(loginErrorStatuses[error.status])
        setModalErrorMessage(error?.error || '')
      } else if (error.status === 451) {
        Ls.add(LS_KEYS.CHANGE_PASSWORD.NATIONAL_CODE, formData[nationalCodeFieldName])
        Ls.add(LS_KEYS.CHANGE_PASSWORD.PASSWORD, formData[passwordFieldname])
        const {toast} = await import("react-toastify");
        toast.error(error.error)
        navigate(ROUTER_LINKS.CHANGE_PASSWORD)
      } else if (error.status === 405) {
        setError(captchaFieldName, {type: 'custom', message: error.error})
      } else {
        setErrorMessage(error.error)
      }

      if (!captchaRef.current) return
      captchaRef.current.getCaptcha()
      captchaRef.current.clearInput()
    })
  }

  function showSuccessfulRegistrationOnClose() {
    navigate(ROUTER_LINKS.LOGIN, {replace: true})
    Ls.remove(LS_KEYS.LOGIN.SUCCESSFUL_MESSAGE_AFTER_REGISTER)
  }

  return {
    errorStatus, setErrorStatus, loading: loginResponse.loading, captchaRef,
    formMethods, onSubmit, showSuccessfulRegistration: showSuccessfulRegistration === 'true',
    showSuccessfulRegistrationOnClose, errorMessage, modalErrorMessage
  }
}

export default useLogin