import InputLabelRowField from "../../../Form/FormLayout/InputLabelRowField";
import InputForm from "../../../Form/Input/InputForm";
import {
  deathStatusFieldName,
  fatherNameFieldName,
  firstNameFieldName,
  genderFieldName,
  lastNameFieldName,
  shenasnameNoFieldName,
  shenasnameSerialFieldName,
  statusFieldName,
  phoneNumber
} from "../manage-user/admin-user/AdminUserDetail/editFormExports";
import { nationalCodeFieldName} from "../../../Form/FormFields/NationalCodeField/NationalCodeFieldExports";
import { birthDateFieldName} from "../../../Form/FormFields/BirthDateField/BirthDateFieldExports";
import CheckBoxForm from "../../../Form/CheckBox/CheckBoxForm";
import { loginWithTwoFactorPasswordFieldName} from "../../../Form/FormFields/LoginWithTwoFactorPasswordField/LoginWithTwoFactorPasswordFieldExportsProfile";
import { Types} from "../../../../types/types";
import { inputSizes} from "../../../Form/Input/hooks/useInputStyles";
import OrganizationField from "../../../Form/FormFields/OrganizationField/OrganizationField";
import PostField from "../../../Form/FormFields/PostField/PostField";
import UserAccountCredentialField from "../../../Form/FormFields/UserAccountCredentialField/UserAccountCredentialField";
import UserAccountCredentialDateField
  from "../../../Form/FormFields/UserAccountCredentialDateField/UserAccountCredentialDateField";
import Button from "../../../Form/Button/Button";
import { useFormContext } from "react-hook-form";
import { useCallback, useEffect, useMemo } from "react";
import {
  USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS,
  userAccountCredentialFieldName
} from "../../../Form/FormFields/UserAccountCredentialField/UserAccountCredentialFieldExports";
import Password from "../../../svg/Password";
import Phone from "../../../svg/Phone";
import useAxios from "../../../../request/hooks/useAxios";
import Loading from "../../../others/Loading/Loading";
import APIES from "../../../../constance/apies";

type FormSectionTypeWithRender = {
  render: Types["children"];
  label?: string;
  name?: undefined;
  disabled?: undefined;
};

type FormSectionTypeWithoutRender = {
  render?: undefined;
  label?: string;
  name: string;
  disabled?: boolean;
};

type FormSectionType = FormSectionTypeWithRender | FormSectionTypeWithoutRender;
type FormSectionsType = FormSectionType[][];

type Props = {
  loading: boolean;
  setOpenModalChagnePass: (state: boolean) => void;
  setOpenModalChagnePhone: (state: boolean) => void;
};

function ProfileForm(props: Props) {
  const { watch, setValue } = useFormContext();
  const accountCredentialValue = watch(userAccountCredentialFieldName);
  const twoFactorSignIn = watch(loginWithTwoFactorPasswordFieldName);
  const [changeTwoFactorResponse, changeTwoFactorRequest] = useAxios();
  const handleChagneTwoFactorRadio = useCallback(() => {
    console.log("on click => ", twoFactorSignIn);
    changeTwoFactorRequest({
      url: APIES.EDIT_TWO_FACTOR,
      method: "POST",
      params: {
        twoFactorState: !twoFactorSignIn,
      },
      data: {
        twoFactorState: !twoFactorSignIn,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        setValue(loginWithTwoFactorPasswordFieldName, twoFactorSignIn);
      });
  }, [changeTwoFactorRequest, setValue, twoFactorSignIn]);
  const accountCredentialIsUnLimited = useMemo(
    function () {
      return (
        accountCredentialValue?.id ===
        USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS.UN_LIMITED
      );
    },
    [accountCredentialValue]
  );
  const formSections: FormSectionsType = useMemo(
    function () {
      return [
        [
          { label: "نام", name: firstNameFieldName, disabled: true },
          { label: "نام خانوادگی", name: lastNameFieldName, disabled: true },
          { label: "کد ملی", name: nationalCodeFieldName, disabled: true },
          {
            label: "شماره شناسنامه",
            name: shenasnameNoFieldName,
            disabled: true,
          },
          {
            label: "سری و سریال شناسنامه",
            name: shenasnameSerialFieldName,
            disabled: true,
          },
          { label: "تاریخ تولد", name: birthDateFieldName, disabled: true },
          { label: "نام پدر", name: fatherNameFieldName, disabled: true },
          { label: "جنسیت", name: genderFieldName, disabled: true },
          { label: "وضعیت حیات", name: deathStatusFieldName, disabled: true },

          { label: "وضعیت", name: statusFieldName, disabled: true },

          {
            label: "سازمان",
            render: <OrganizationField hiddenLabel disabled={true} />,
          },
          {
            label: "سمت",
            render: <PostField hiddenLabel disabled={true} />,
          },

          {
            label: "اعتبار حساب کاربری",
            render: <UserAccountCredentialField disabled={true} />,
          },
          ...(!accountCredentialIsUnLimited
            ? [
                {
                  label: "تاریخ اعتبار حساب کاربری",
                  render: <UserAccountCredentialDateField disabled={true} />,
                },
              ]
            : []),
        ],
        [
          { label: "شماره تلفن همراه", name: phoneNumber, disabled: true },
          {
            label: "",
            render: (
              <div className="flex justify-center items-center">
                <Button
                  variant="text"
                  color="accent"
                  className={{ extra: "w-1/2 py-4" }}
                  onClick={() => {
                    props.setOpenModalChagnePhone(true);
                  }}
                >
                  <Phone />
                  <span className="text-sm">تغییر شماره تلفن همراه</span>
                </Button>
                <Button
                  variant="text"
                  className={{ extra: "w-1/2 mr-2 py-4" }}
                  color="accent"
                  onClick={() => {
                    console.log("wowow");
                    props.setOpenModalChagnePass(true);
                  }}
                >
                  <Password />
                  <span className="text-sm">تغییر کلمه عبور</span>
                </Button>
              </div>
            ),
          },
        ],
        [
          {
            render: (
              <div
                className={`${inputSizes["md"]} flex items-center`}
                onClick={() => {
                  handleChagneTwoFactorRadio();
                }}
              >
                <CheckBoxForm
                  fieldName={loginWithTwoFactorPasswordFieldName}
                  inputProps={{
                    text: "استفاده از ورود دو عاملی",
                    disabled: changeTwoFactorResponse.loading,
                  }}
                />
                {changeTwoFactorResponse.loading && (
                  <span className="mr-2 flex justify-center items-center">
                    <Loading size="sm" color="primary" />
                  </span>
                )}
              </div>
            ),
          },
        ],
      ];
    },
    [
      accountCredentialIsUnLimited,
      changeTwoFactorResponse.loading,
      handleChagneTwoFactorRadio,
      props,
    ]
  );

  return (
    <div className="py-5 px-7 w-full">
      {formSections.map((formSection, index) => (
        <>
          <div className="grid grid-cols-3 w-full gap-x-12">
            {formSection.map((formField, formFieldIndex) => (
              <InputLabelRowField
                key={formFieldIndex}
                {...(formField?.label && { label: formField?.label })}
              >
                {formField.render ? (
                  formField?.render
                ) : (
                  <InputForm
                    fieldName={formField.name || ""}
                    inputProps={{ disabled: Boolean(formField?.disabled) }}
                  />
                )}
              </InputLabelRowField>
            ))}
          </div>
          {index !== formSections.length - 1 && (
            <div className="h-[1px] bg-gray-200 mb-6 mt-2"></div>
          )}
        </>
      ))}
    </div>
  );
}

export default ProfileForm;
