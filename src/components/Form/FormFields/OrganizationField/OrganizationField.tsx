import useGetFormErrorMessage from "../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import useGetInputPlaceholder from "../../../../hooks/ReactHookForm/useGetInputPlaceholder";
import SelectForm from "../../Select/SelectForm";
import {
  organizationFieldName,
  organizationLabel
} from "./OrganizationFieldExports";
import APIES from "../../../../constance/apies";

type Props = {
  filedName?: string;
  hiddenLabel?: boolean;
  disabled?: boolean;
};

function OrganizationField({ filedName, hiddenLabel, disabled }: Props) {
  const getErrorMessage = useGetFormErrorMessage();
  const errorMessage = getErrorMessage(organizationFieldName, filedName);
  const placeholder = useGetInputPlaceholder(organizationLabel);

  return (
    <SelectForm
      // options={options}
      apiAddress={APIES.ORGANIZATION_LIST}
      fieldName={filedName || organizationFieldName}
      inputProps={{
        errorMessage,
        ...!hiddenLabel && {label: organizationLabel},
        disabled: disabled
      }}
      rules={{
        required: placeholder,
      }}
    />
  );
}

export default OrganizationField;
