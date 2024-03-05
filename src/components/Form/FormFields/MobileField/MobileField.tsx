import InputForm from "../../Input/InputForm";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";
import FORM_PATTERNS from "../../../../constance/form/formPatterns";
import {
  mobileFieldName,
  mobileLabel
} from "./MobileFieldExports";

type Props = {
  checkValidation?: boolean;
  filedName?: string;
};

function MobileField({ checkValidation, filedName }: Props) {
  const requriredErrorMessage = useGetRequiredErrorMessage(mobileLabel);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(mobileFieldName, filedName);

  return (
    <InputForm
      fieldName={filedName || mobileFieldName}
      inputProps={{
        label: mobileLabel,
        errorMessage,
        placeholder: "برای مثال 09129999999",
        maxLength: 11,
        useTrim: true,
        justNumber: true,
      }}
      rules={{
        required: requriredErrorMessage,
        ...(checkValidation && { pattern: FORM_PATTERNS.mobile }),
      }}
    />
  );
}

export default MobileField;
