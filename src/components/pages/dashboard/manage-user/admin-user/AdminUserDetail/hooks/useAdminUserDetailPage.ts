import useReactHookFormWrapper
  from "../../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {
  UserDetailDataType,
  useUserDetailContext
} from "../../../../../../../contexts/AdminUserDetailContext";
import {useEffect} from "react";
import {
  deathStatusFieldName,
  deathStatusOptions,
  DeathStatusType,
  fatherNameFieldName,
  FatherNameType,
  firstNameFieldName,
  FirstNameType,
  genderFieldName,
  genderOptions,
  GenderType,
  lastNameFieldName,
  LastNameType,
  shenasnameNoFieldName,
  ShenasnameNoType,
  shenasnameSerialFieldName,
  ShenasnameSerialType,
  statusFieldName,
  StatusType,
  phoneNumber,
  PhoneNumberType
} from "../editFormExports";
import {
  nationalCodeFieldName,
  NationalCodeType
} from "../../../../../../Form/FormFields/NationalCodeField/NationalCodeFieldExports";
import {
  birthDateFieldName,
  BirthDateType
} from "../../../../../../Form/FormFields/BirthDateField/BirthDateFieldExports";
import {ADMIN_USER_STATUSES} from "../../../../../../others/Table/TableBody/TdStatus";
import {
  loginWithTwoFactorPasswordFieldName,
  LoginWithTwoFactorPasswordType
} from "../../../../../../Form/FormFields/LoginWithTwoFactorPasswordField/LoginWithTwoFactorPasswordFieldExports";
import {
  organizationFieldName,
  OrganizationType
} from "../../../../../../Form/FormFields/OrganizationField/OrganizationFieldExports";
import {
  postFieldName,
  PostType
} from "../../../../../../Form/FormFields/PostField/PostFieldExports";
import {
  USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS,
  userAccountCredentialFieldName,
  userAccountCredentialOptions,
  UserAccountCredentialType
} from "../../../../../../Form/FormFields/UserAccountCredentialField/UserAccountCredentialFieldExports";
import {
  userAccountCredentialDateFieldName,
  UserAccountCredentialDateType
} from "../../../../../../Form/FormFields/UserAccountCredentialDateField/UserAccountCredentialDateFieldExports";
import {useParams} from "react-router-dom";
import APIES from "../../../../../../../constance/apies";
import useAxios from "../../../../../../../request/hooks/useAxios";
import {getResponseSuccess} from "../../../../../../../request/utils/getResponse";

type FormDataType = {
  [firstNameFieldName]: FirstNameType;
  [lastNameFieldName]: LastNameType;
  [phoneNumber]: PhoneNumberType;
  [nationalCodeFieldName]: NationalCodeType;
  [shenasnameNoFieldName]: ShenasnameNoType;
  [shenasnameSerialFieldName]: ShenasnameSerialType;
  [birthDateFieldName]: BirthDateType;
  [fatherNameFieldName]: FatherNameType;
  [genderFieldName]: GenderType;
  [deathStatusFieldName]: DeathStatusType;
  [statusFieldName]: StatusType;
  [loginWithTwoFactorPasswordFieldName]: LoginWithTwoFactorPasswordType;
  [organizationFieldName]: OrganizationType;
  [postFieldName]: PostType;
  [userAccountCredentialFieldName]: UserAccountCredentialType;
  [userAccountCredentialDateFieldName]: UserAccountCredentialDateType;
};

function useAdminUserDetailPage() {
  const {formMethods, onSubmit} = useReactHookFormWrapper<FormDataType>({
    onSubmitHandler,
  });
  const {setValue} = formMethods;

  const {userDetailResponse, fetchUserDetail} = useUserDetailContext();
  const {userId} = useParams();
  const [updateUserResponse, updateUserRequest] = useAxios();

  useEffect(
    function () {
      (async function () {
        const data: UserDetailDataType = userDetailResponse?.data?.result;
        if (!data) return;

        const {DateObject} = await import("react-multi-date-picker");

        const accountCredentialDateHasExprired =
          new DateObject(data?.accountExpirationDate).toUnix() <
          new DateObject().toUnix();
        const statusValue = accountCredentialDateHasExprired
          ? ADMIN_USER_STATUSES["-1"]?.label
          : Object.values(ADMIN_USER_STATUSES).find(
          (item) => item.id === data?.status
        )?.label || "";
        const userAccountCredentialValue = userAccountCredentialOptions.find(
          (item) => {
            return (
              item.id ===
              USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS[
                Boolean(data?.accountExpirationDate) ? "LIMITED" : "UN_LIMITED"
                ]
            );
          }
        );

        const defaultValues: Partial<FormDataType> = {
          [firstNameFieldName]: data?.firstName || "",
          [lastNameFieldName]: data?.lastName || "",
          [nationalCodeFieldName]: data?.nationalCode || "",
          [phoneNumber]: data?.phoneNumber || "",
          [shenasnameNoFieldName]: String(data?.shenasnameNo) || "",
          [shenasnameSerialFieldName]:
          `${data?.shenasnameSeri} ${data?.shenasnameSerial}` || "",
          [birthDateFieldName]: data?.birthDate || "",
          [fatherNameFieldName]: data?.fatherName || "",
          [genderFieldName]:
          genderOptions.find((item) => item.id === data?.gender)?.label || "",
          [deathStatusFieldName]:
          deathStatusOptions.find((item) => item.id === data?.deathStatus)
            ?.label || "",
          [statusFieldName]: statusValue,
          [loginWithTwoFactorPasswordFieldName]: data?.twoFactorEnabled,
          [organizationFieldName]: {id: data?.organizationId, name: ""},
          [postFieldName]: data?.postName,
          [userAccountCredentialFieldName]: userAccountCredentialValue,
          [userAccountCredentialDateFieldName]: data?.accountExpirationDate,
        };

        Object.entries(defaultValues).forEach(([key, value]: any) =>
          setValue(key, value)
        );
      })();
    },
    [userDetailResponse?.data]
  );

  function onSubmitHandler(formData: FormDataType) {
    const accountCredentialIslimited =
      formData[userAccountCredentialFieldName]?.id ===
      USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS.LIMITED;
    const data = {
      id: userId,
      organizationId: formData[organizationFieldName]?.id,
      postName: formData[postFieldName],
      ...(accountCredentialIslimited
        ? {
          accountExpirationDate: formData[userAccountCredentialDateFieldName],
        }
        : {}),
      twoFactorEnabled: formData[loginWithTwoFactorPasswordFieldName],
    };

    const url = APIES.ADMIN_USERS_UPDATE;
    updateUserRequest({url, data, method: "POST"}).then(async (response) => {
      const {toast} = await import("react-toastify");
      toast.success(getResponseSuccess(response));
      fetchUserDetail();
    });
  }

  return {
    formMethods,
    onSubmit,
    loading: userDetailResponse?.loading,
    editLoading: updateUserResponse?.loading,
  };
}

export default useAdminUserDetailPage;
