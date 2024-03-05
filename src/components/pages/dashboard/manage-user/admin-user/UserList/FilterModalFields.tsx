import DatePickerForm from "../../../../../Form/DatePicker/DatePickerForm";
import InputForm from "../../../../../Form/Input/InputForm";
import SelectForm from "../../../../../Form/Select/SelectForm";
import APIES from "../../../../../../constance/apies";
import React from "react";

type Props = {};

const genderOptions = [
  { name: "مرد", id: "1" },
  { name: "زن", id: "2" },
];
const accountExpirationDateOptions = [
  { name: "محدود", id: true },
  { name: "نامحدود", id: false },
];

const FilterModalFileds = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="w-full ml-2">
          <InputForm
            fieldName="firstName"
            inputProps={{
              label: "نام",
              placeholder: "نام",
            }}
          />
        </div>
        <div className="w-full mr-2">
          <InputForm
            fieldName="lastName"
            inputProps={{
              label: "نام خانوادگی",
              placeholder: "نام خانوادگی",
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full ml-2">
          <InputForm
            fieldName="phoneNumber"
            inputProps={{
              label: "شماره تلفن همراه",
              placeholder: "شماره تلفن همراه",
              justNumber: true,
              maxLength: 11,
            }}
            rules={{}}
          />
        </div>
        <div className="w-full mr-2">
          <DatePickerForm
            fieldName={"birthday"}
            inputProps={{
              label: "بازه تاریخ تولد",
            }}
            datePickerProps={{
              range: true,
            }}
            rules={{
              required: false,
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full ml-2">
          <SelectForm
            options={genderOptions}
            fieldName={"gender"}
            inputProps={{
              label: "جنسیت",
            }}
            rules={{}}
          />
        </div>
        <div className="w-full mr-2">
          <DatePickerForm
            fieldName={"registerDate"}
            inputProps={{
              label: "بازه تاریخ ثبت نام",
            }}
            datePickerProps={{
              range: true,
            }}
            rules={{
              required: false,
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full ml-2">
          <InputForm
            fieldName="postName"
            inputProps={{
              label: "سمت",
              placeholder: "سمت",
            }}
          />
        </div>
        <div className="w-full mr-2">
          <SelectForm
            apiAddress={APIES.ORGANIZATION_LIST}
            fieldName={"organizationId"}
            inputProps={{
              label: "سازمان",
            }}
            rules={{}}
          />
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
          <DatePickerForm
            fieldName={"accountExpirationDate"}
            inputProps={{
              label: "بازه تاریخ اعتبار حساب کاربری",
            }}
            datePickerProps={{
              range: true,
            }}
            rules={{
              required: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterModalFileds;
