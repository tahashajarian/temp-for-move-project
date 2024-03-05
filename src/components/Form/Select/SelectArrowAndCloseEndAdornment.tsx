import CloseEndAdornment, {CloseEndAdornmentProps} from "../Input/EndAdornment/CloseEndAdornment";
import ArrowIcon from "../../svg/ArrowIcon";


type Props = {
  dropDownOpen: boolean;
} & Omit<CloseEndAdornmentProps, 'children'>

function SelectArrowAndCloseEndAdornment(
  {
    loading, hasNotValue, dropDownOpen
  }: Props
) {
  return (
    <div className='flex items-center justify-center w-6 h-6'>
      <CloseEndAdornment
        loading={loading} hasNotValue={hasNotValue}
      >
        <ArrowIcon
          className={`duration-200 ${dropDownOpen ? "" : "rotate-90"}`}
        />
      </CloseEndAdornment>
    </div>
  )
}

export default SelectArrowAndCloseEndAdornment