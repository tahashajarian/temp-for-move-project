import Input from "./Input";
import {InputProps} from "./types/InputProps";
import useCallFuncWithDelayAfterOnChange from "../../../hooks/useCallFuncByDelayAfterOnChange";


type Props = {
  inputProps?: InputProps;
  searchHandler: (value:string) => void
}

function SearchInput({inputProps = {}, searchHandler}: Props) {

  const onQuery = useCallFuncWithDelayAfterOnChange({
    callAfterTypingHandler: searchHandler
  })

  function onChangeHandler(e:any) {
    onQuery(e.target.value)
    inputProps?.onChange && inputProps?.onChange(e)
  }

  return (
    <Input
      hiddenErrorMessage
      onChange={onChangeHandler}
      {...inputProps}
    />
  )
}

export default SearchInput