import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import SelectForm from "../../Select/SelectForm";

import APIES from "../../../../constance/apies";
import { roleFieldName, roleLabel } from "./RoleSelectFieldExports";

type Props = {
  filedName?: string;
  multiSelect?: boolean;
};

function RoleSelectField({ filedName, multiSelect }: Props) {
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(roleFieldName, filedName);
  const placeholder = useGetInputPlaceholder(roleLabel);

  return (
    <SelectForm
      // options={options}
      apiAddress={APIES.ROLE_LIST}
      fieldName={filedName || roleFieldName}
      inputProps={{
        errorMessage,
        label: roleLabel,
      }}
      rules={{
        required: placeholder,
      }}
      mode={multiSelect ? "multiple" : undefined}
    />
  );
}

export default RoleSelectField;
