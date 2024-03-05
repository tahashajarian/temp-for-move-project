import CheckBoxForm from "../../../../../Form/CheckBox/CheckBoxForm";
import BirthDateField from "../../../../../Form/FormFields/BirthDateField/BirthDateField";
import MobileField from "../../../../../Form/FormFields/MobileField/MobileField";
import NationalCodeField from "../../../../../Form/FormFields/NationalCodeField/NationalCodeField";
import OrganizationField from "../../../../../Form/FormFields/OrganizationField/OrganizationField";
import PostField from "../../../../../Form/FormFields/PostField/PostField";
import RoleSelectField from "../../../../../Form/FormFields/RoleSelectField/RoleSelectField";
import React from "react";
import { UserFiled } from "./consts";
import SelectForm from "../../../../../Form/Select/SelectForm";
import useGetFormErrorMessage from "../../../../../../hooks/ReactHookForm/useGetFormErrorMessage";
import ExpireAccountDatePicker from "./ExpireAccountDatePicker";
import CloudFlareCaptcha from "../../../../../others/CloudFlareCaptcha/CloudFlareCaptcha";

type Props = {
  hasAccountExpirationDate: any;
};

const accountExpirationDateOptions = [
  { name: "محدود", id: true },
  { name: "نامحدود", id: false },
];

const AddUserField = (props: Props) => {
  console.log({
    props: props.hasAccountExpirationDate,
  });
  const getErrorMessage = useGetFormErrorMessage();
  return (
    <div className="flex flex-col">
      <CloudFlareCaptcha />
      <div className="flex items-center">
        <div className="w-full ml-2">
          <NationalCodeField checkValidation hiddenStartAdornment />
        </div>
        <div className="w-full mr-2">
          <BirthDateField />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full ml-2">
          <MobileField checkValidation filedName={UserFiled.phoneNumber} />
        </div>
        <div className="w-full mr-2">
          <RoleSelectField filedName={UserFiled.roles} multiSelect />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full ml-2">
          <PostField filedName={UserFiled.postName} />
        </div>
        <div className="w-full mr-2">
          <OrganizationField filedName={UserFiled.organizationId} />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full ml-2">
          <SelectForm
            options={accountExpirationDateOptions}
            fieldName={"hasAccountExpirationDate"}
            inputProps={{
              label: "اعتبار حساب کاربری",
            }}
            rules={{}}
          />
        </div>
        <div className="w-full mr-2">
          {props.hasAccountExpirationDate?.id && <ExpireAccountDatePicker />}
        </div>
      </div>
      <div className="mt-4 mb-6">
        <CheckBoxForm
          fieldName={UserFiled.twoFactorEnabled}
          inputProps={{
            text: "استفاده از ورود دو عاملی",
          }}
        />
      </div>
    </div>
  );
};

export default AddUserField;
