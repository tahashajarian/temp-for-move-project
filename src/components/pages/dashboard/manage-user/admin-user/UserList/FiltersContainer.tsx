import Button from "../../../../../Form/Button/Button";
import React from "react";
import {SimpleFilter} from "../types";
import Input from "../../../../../Form/Input/Input";
import IconButton from "../../../../../Form/Button/IconButton";
import FilterIcon from "../../../../../svg/FilterIcon";
import Select, {SelectOptionType} from "../../../../../Form/Select/Select";
import {useUserPermissionsContext} from "../../../../../../contexts/UserPermissionsContext/UserPermissionsContext";
import PERMISSIONS_NAMES from "../../../../../../constance/permissionsNames";

type Props = SimpleFilter & {
  openModalFilters: () => void;
  action: () => void;
  setFilters: (filed: { key: "nationalCode" | "status"; value: any }) => void;
  formDirty: boolean;
};

const options: SelectOptionType[] = [
  {name: "همه", id: "All"},
  {name: "فعال", id: 1},
  {name: "غیر فعال", id: 2},
  {name: "منقضی", id: "-1"},
  {name: "در انتظار تایید", id: 0},
];

const FiltersContainer = (props: Props) => {
  const {hasPermission} = useUserPermissionsContext();

  return (
    <div className="flex justify-around items-start">
      <div className="flex justify-start items-start w-full">
        <div className="w-60">
          <Input
            justNumber
            hiddenErrorMessage
            maxLength={10}
            size="sm"
            placeholder="جستجوی کد ملی..."
            value={props.nationalCode}
            onChange={(e) => {
              props.setFilters({key: "nationalCode", value: e.target.value});
            }}
          />
        </div>
        <div className="mx-3 w-48">
          <Select
            name="statusField"
            options={options}
            onSelect={(e) => {
              props.setFilters({key: "status", value: e});
            }}
            value={props.status}
            inputProps={{
              name: "statusField",
              startAdornment: (
                <span className="text-gray-400 text-sm">وضعیت:</span>
              ),
              placeholder: "انتخاب کنید",
              hiddenErrorMessage: true,
              size: "sm",
            }}
          />
        </div>
        <IconButton
          className={`${
            props.formDirty ? "bg-[#F3F4F6] border-[#2E3754]" : ""
          }`}
          action={props.openModalFilters}
        >
          <FilterIcon/>
        </IconButton>
      </div>

      {hasPermission(PERMISSIONS_NAMES.ADMIN_USER_ADMIN_PANEL_USERS_CREATE) && (
        <Button
          onClick={props.action}
          variant="filled"
          color="accent"
          size="sm"
        >
          ایجاد کاربر
        </Button>
      )}
    </div>
  );
};

export default FiltersContainer;
