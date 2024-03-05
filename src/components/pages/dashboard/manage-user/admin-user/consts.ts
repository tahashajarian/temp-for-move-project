import RENDER_TYPES from "../../../../../constance/table/renderTypes";
import {ColumnsType} from "../../../../../types/TableType";
import MORE_COLUMN from "../../../../others/Table/constances/moreColumn";

export const ADMIN_USERS_COLUMNS:ColumnsType[] = [
  { label: "نام", accessor: "firstName" },
  { label: "نام خانوادگی", accessor: "lastName" },
  { label: "کدملی ", accessor: "nationalCode" },
  { label: "شماره تلفن همراه", accessor: "phoneNumber" },
  { label: "تاریخ ثبت نام", accessor: "registerDate", renderType: RENDER_TYPES.DATE },
  { label: "سمت ", accessor: "postName" },
  { label: "سازمان", accessor: "organizationName" },
  { label: "وضعیت", accessor: "status", renderType: RENDER_TYPES.STATUS },
  { label: "اعتبار حساب", accessor: "hasAccountExpirationDate", renderType: RENDER_TYPES.HASEXPIREDATE },
  { label: "تاریخ اعتبار", accessor: "accountExpirationDate", renderType: RENDER_TYPES.DATE },
  MORE_COLUMN
]
