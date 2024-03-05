import Loading from "../../../others/Loading/Loading";
import CloseIcon from "../../../svg/CloseIcon";
import {Types} from "../../../../types/types";


export type CloseEndAdornmentProps = {
  loading?: boolean,
  hasNotValue: boolean,
  children: Types["children"]
}

function CloseEndAdornment({loading, hasNotValue, children}: CloseEndAdornmentProps) {
  return (
      loading && <Loading size="sm"/>
    ) || (
      (hasNotValue) && (
        <>{children}</>
      )
    )
    ||
    (
      <div
        className="flex items-center cursor-pointer w-full h-full"
      >
        <CloseIcon/>
      </div>
    )
}

export default CloseEndAdornment;