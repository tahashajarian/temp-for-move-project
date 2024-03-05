import {TdMoreOption} from "./TdMore";
import DeleteIcon from "../../../../svg/DeleteIcon";
import DetailIcon from "../../../../svg/DetailIcon";
import MobileIcon from "../../../../svg/MobileIcon";
import StatusIcon from "../../../../svg/StatusIcon";
import PasswordIcon from "../../../../svg/PasswordIcon";


const TD_MORE_OPTIONS = {
  VIEW_AND_EDIT: (onClick:TdMoreOption['onClick']) => ({
    icon: <DetailIcon />,
    onClick,
    title: 'مشاهده و ویرایش'
  }),

  CHANGE_PHONE_NUMBER: (onClick:TdMoreOption['onClick']) => ({
    icon: <MobileIcon />,
    onClick,
    title: 'تغییر شماره تلفن همراه'
  }),

  CHANGE_STATUS: (onClick:TdMoreOption['onClick']) => ({
    icon: <StatusIcon />,
    onClick,
    title: 'تغییر وضعیت'
  }),

  CHANGE_PASSWORD: (onClick:TdMoreOption['onClick']) => ({
    icon: <PasswordIcon />,
    onClick,
    title: 'تغییر کلمه عبور'
  }),

  DELETE: (onClick:TdMoreOption['onClick']) => ({
    icon: <DeleteIcon />,
    onClick,
    title: 'حذف'
  }),
}

export default TD_MORE_OPTIONS