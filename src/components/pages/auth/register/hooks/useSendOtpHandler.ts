import Ls from "../../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../../constance/localStorageKeys";
import {birthDateFieldName} from "../../../../Form/FormFields/BirthDateField/BirthDateFieldExports";
import {nationalCodeFieldName} from "../../../../Form/FormFields/NationalCodeField/NationalCodeFieldExports";
import {mobileFieldName} from "../../../../Form/FormFields/MobileField/MobileFieldExports";
import {organizationFieldName} from "../../../../Form/FormFields/OrganizationField/OrganizationFieldExports";
import {postFieldName} from "../../../../Form/FormFields/PostField/PostFieldExports";
import APIES from "../../../../../constance/apies";
import useAxios from "../../../../../request/hooks/useAxios";
import {useState} from "react";

function useSendOtpHandler() {

  const [registerResponse, registerRequest] = useAxios()
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function sendOtpHandler(onConfirm: () => void) {
    setErrorMessage('')
    const formData = Ls.get(LS_KEYS.REGISTER)

    const getJalaliDate = (await import('../../../../../utils/dateAndTime/getJalaliDate')).default
    const jalaliDate = getJalaliDate({value: formData[birthDateFieldName], isEnglishNumber: true})
    const [year, month, day]:any = jalaliDate?.split('/')

    const data = {
      "nationalCode": formData[nationalCodeFieldName],
      "birthYear": year,
      "birthMonth": month,
      "birthDay": day,
      "phoneNumber": formData[mobileFieldName],
      "organizationId": formData[organizationFieldName]?.id,
      "postName": formData[postFieldName],
    }
    const url = APIES.REGISTER

    registerRequest({ url, method: "POST", data, disabledThrowErrorToast: true, addCloudFlareCode: true }).then((res) => {
      Ls.add(LS_KEYS.REGISTER_OTP.TRACK_ID, res?.data?.result?.trackId)
      Ls.add(LS_KEYS.REGISTER_OTP.MOBILE, formData[mobileFieldName])
      onConfirm()
    }).catch(error => {
      typeof error.error === 'string' && setErrorMessage(error.error)
    })
  }

  return {loading: registerResponse.loading, sendOtpHandler, errorMessage}
}

export default useSendOtpHandler