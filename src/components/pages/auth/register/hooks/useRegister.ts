import {useNavigate} from "react-router-dom";
import {
  nationalCodeFieldName, NationalCodeType
} from "../../../../Form/FormFields/NationalCodeField/NationalCodeFieldExports";
import LS_KEYS from "../../../../../constance/localStorageKeys";
import {birthDateFieldName, BirthDateType} from "../../../../Form/FormFields/BirthDateField/BirthDateFieldExports";
import {mobileFieldName, MobileType} from "../../../../Form/FormFields/MobileField/MobileFieldExports";
import {
  organizationFieldName,
  OrganizationType
} from "../../../../Form/FormFields/OrganizationField/OrganizationFieldExports";
import {postFieldName, PostType} from "../../../../Form/FormFields/PostField/PostFieldExports";
import {
  loginWithTwoFactorPasswordFieldName, LoginWithTwoFactorPasswordType
} from "../../../../Form/FormFields/LoginWithTwoFactorPasswordField/LoginWithTwoFactorPasswordFieldExports";
import useSaveFormFieldsToLocalStorage from "../../../../../hooks/ReactHookForm/useSaveFormFieldsToLocalStorage";
import useReactHookFormWrapper from "../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import ROUTER_LINKS from "../../../../../constance/routerLinks";
import useSendOtpHandler from "./useSendOtpHandler";
import useGetDecodedSearchParam from "../../../../../hooks/useGetDecodedSearchParam";
import QUERY_PARAMS from "../../../../../constance/queryParams";


type FormDataType = {
  [nationalCodeFieldName]: NationalCodeType;
  [birthDateFieldName]: BirthDateType;
  [mobileFieldName]: MobileType;
  [organizationFieldName]: OrganizationType;
  [postFieldName]: PostType;
  [loginWithTwoFactorPasswordFieldName]: LoginWithTwoFactorPasswordType;
};

function useRegister() {

  const { formMethods, onSubmit } = useReactHookFormWrapper({
    onSubmitHandler,
  })

  const navigate = useNavigate()

  const getDecodedSearchParam = useGetDecodedSearchParam();
  const shouldLoadData = getDecodedSearchParam(QUERY_PARAMS.LOAD)

  const saveDataToLocalStorage = useSaveFormFieldsToLocalStorage({
    lsKey: LS_KEYS.REGISTER,
    setValue: formMethods.setValue,
    getValues: formMethods.getValues,
    disableSetDefaultValue: !Boolean(shouldLoadData)
  })

  const {loading, sendOtpHandler, errorMessage} = useSendOtpHandler()

  function onSubmitHandler(formData: FormDataType) {
    saveDataToLocalStorage()

    sendOtpHandler(() => navigate(ROUTER_LINKS.REGISTER_OTP))
  }

  return {
    onSubmitHandler, loading: loading, formMethods, onSubmit, errorMessage
  }
}

export default useRegister