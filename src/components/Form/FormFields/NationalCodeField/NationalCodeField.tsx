import InputForm from "../../Input/InputForm";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import {
  nationalCodeFieldName,
  nationalCodeLabel
} from "./NationalCodeFieldExports";
import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";
import UserOutlinedIcon from "../../../svg/UserOutlinedIcon";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import FORM_PATTERNS from "../../../../constance/form/formPatterns";

type Props = {
  checkValidation?: boolean;
  hiddenStartAdornment?: boolean;
  NotRequired?: boolean;
};

function NationalCodeField({
  checkValidation,
  hiddenStartAdornment,
  NotRequired,
}: Props) {
  const requriredErrorMessage = useGetRequiredErrorMessage(nationalCodeLabel);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(nationalCodeFieldName);
  const placeholder = useGetInputPlaceholder(nationalCodeLabel);

  return (
    <InputForm
      fieldName={nationalCodeFieldName}
      inputProps={{
        label: nationalCodeLabel,
        errorMessage,
        placeholder,
        ...(!hiddenStartAdornment && {
          startAdornment: <UserOutlinedIcon textColor="text-black/30" />,
        }),
        maxLength: 10,
        useTrim: true,
        justNumber: true,
      }}
      rules={{
        required: NotRequired ? false : requriredErrorMessage,
        ...(checkValidation && {
          validate: FORM_PATTERNS.checkMelliCode,
          minLength: FORM_PATTERNS.specificLengthChar(10),
        }),
      }}
    />
  );
}

export default NationalCodeField;
