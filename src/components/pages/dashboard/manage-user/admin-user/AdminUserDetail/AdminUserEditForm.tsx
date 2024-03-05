import InputLabelRowField from "../../../../../Form/FormLayout/InputLabelRowField";
import InputForm from "../../../../../Form/Input/InputForm";
import {
  deathStatusFieldName,
  fatherNameFieldName,
  firstNameFieldName, genderFieldName,
  lastNameFieldName, shenasnameNoFieldName, shenasnameSerialFieldName, statusFieldName
} from "./editFormExports";
import {nationalCodeFieldName} from "../../../../../Form/FormFields/NationalCodeField/NationalCodeFieldExports";
import {birthDateFieldName} from "../../../../../Form/FormFields/BirthDateField/BirthDateFieldExports";
import CheckBoxForm from "../../../../../Form/CheckBox/CheckBoxForm";
import {
  loginWithTwoFactorPasswordFieldName
} from "../../../../../Form/FormFields/LoginWithTwoFactorPasswordField/LoginWithTwoFactorPasswordFieldExports";
import {Types} from "../../../../../../types/types";
import {inputSizes} from "../../../../../Form/Input/hooks/useInputStyles";
import OrganizationField from "../../../../../Form/FormFields/OrganizationField/OrganizationField";
import PostField from "../../../../../Form/FormFields/PostField/PostField";
import UserAccountCredentialField
  from "../../../../../Form/FormFields/UserAccountCredentialField/UserAccountCredentialField";
import UserAccountCredentialDateField
  from "../../../../../Form/FormFields/UserAccountCredentialDateField/UserAccountCredentialDateField";
import Button from "../../../../../Form/Button/Button";
import {useFormContext} from "react-hook-form";
import {useMemo} from "react";
import {
  USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS,
  userAccountCredentialFieldName
} from "../../../../../Form/FormFields/UserAccountCredentialField/UserAccountCredentialFieldExports";

type FormSectionTypeWithRender = {
  render: Types['children']
  label?: string
  name?: undefined
  disabled?: undefined
}

type FormSectionTypeWithoutRender = {
  render?: undefined
  label?: string
  name: string
  disabled?: boolean
}

type FormSectionType = FormSectionTypeWithRender | FormSectionTypeWithoutRender
type FormSectionsType = FormSectionType[][]


type Props = {
  loading: boolean
}

function AdminUserEditForm({loading}: Props) {

  const {watch} = useFormContext()

  const accountCredentialValue = watch(userAccountCredentialFieldName)
  const accountCredentialIsUnLimited = useMemo(function () {
    return accountCredentialValue?.id === USER_ACCOUNT_CREDENTIAL_OPTIONS_KEYS.UN_LIMITED
  }, [accountCredentialValue])
  console.log({accountCredentialValue, accountCredentialIsUnLimited})
  const formSections: FormSectionsType = useMemo(function () {
    return [
      [
        {label: 'نام', name: firstNameFieldName, disabled: true},
        {label: 'نام خانوادگی', name: lastNameFieldName, disabled: true},
        {label: 'کد ملی', name: nationalCodeFieldName, disabled: true},
        {label: 'شماره شناسنامه', name: shenasnameNoFieldName, disabled: true},
        {label: 'سری و سریال شناسنامه', name: shenasnameSerialFieldName, disabled: true},
        {label: 'تاریخ تولد', name: birthDateFieldName, disabled: true},
        {label: 'نام پدر', name: fatherNameFieldName, disabled: true},
        {label: 'جنسیت', name: genderFieldName, disabled: true},
        {label: 'وضعیت حیات', name: deathStatusFieldName, disabled: true},
      ],
      [
        {label: 'وضعیت', name: statusFieldName, disabled: true},
        {
          render: (
            <div className={`${inputSizes['md']} flex items-center`}>
              <CheckBoxForm fieldName={loginWithTwoFactorPasswordFieldName} inputProps={{text: 'استفاده از ورود دو عاملی'}}/>
            </div>
          )
        },
      ],
      [
        {label: 'سازمان', render: <OrganizationField hiddenLabel/>},
        {label: 'سمت', render: <PostField hiddenLabel/>},
      ],
      [
        {label: 'اعتبار حساب کاربری', render: <UserAccountCredentialField />},
        ...!accountCredentialIsUnLimited ?
          [{label: 'تاریخ اعتبار حساب کاربری', render: <UserAccountCredentialDateField />}] : [],
      ],
    ]
  }, [accountCredentialIsUnLimited])

  return (
    <div className='py-5 px-7 w-full'>
      {formSections.map(formSection => (
        <>
          <div className='grid grid-cols-3 w-full gap-x-12'>
            {formSection.map((formField, formFieldIndex) => (
              <InputLabelRowField key={formFieldIndex} {...formField?.label && {label: formField?.label}}>
                {
                  formField.render ? formField?.render : (
                    <InputForm fieldName={formField.name || ''} inputProps={{disabled: Boolean(formField?.disabled)}}/>
                  )
                }
              </InputLabelRowField>
            ))}
          </div>
          <div className='h-[1px] bg-gray-200 mb-[25px]'></div>
        </>
      ))}

      <div className='mt-[25px]'>
        <Button loading={loading} type='submit' size='sm'>ذخیره تغییرات</Button>
      </div>
    </div>
  )
}

export default AdminUserEditForm