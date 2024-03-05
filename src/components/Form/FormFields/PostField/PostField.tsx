import useGetRequiredErrorMessage from "../../../../hooks/ReactHookForm/useGetRequiredErrorMessage";
import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import InputForm from "../../Input/InputForm";
import formPatterns from "../../../../constance/form/formPatterns";
import {
  postFieldName,
  postLabel
} from "./PostFieldExports";

type Props = {
  filedName?: string;
  hiddenLabel?: boolean;
  disabled?: boolean;
};

function PostField({ filedName, hiddenLabel, disabled }: Props) {
  const requriredErrorMessage = useGetRequiredErrorMessage(postLabel);
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(postFieldName, filedName);
  const placeholder = useGetInputPlaceholder(postLabel);

  return (
    <InputForm
      fieldName={filedName || postFieldName}
      inputProps={{
        ...(!hiddenLabel && { label: postLabel }),
        errorMessage,
        placeholder,
        maxLength: 100,
        disabled: disabled,
      }}
      rules={{
        required: requriredErrorMessage,
        minLength: formPatterns.minLengthChar(3),
      }}
    />
  );
}

export default PostField;
