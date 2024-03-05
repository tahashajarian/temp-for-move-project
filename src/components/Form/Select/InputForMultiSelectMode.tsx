import InputLabel from "../Input/InputLabel";
import {InputProps} from "../Input/types/InputProps";
import joinObjectValues from "../../../utils/joinObjectValues";
import useInputStyles from "../Input/hooks/useInputStyles";
import {MultiSelectType, SelectOptionType} from "./Select";
import Badge from "../../others/Badge/Badge";
import InputEndAdornment from "../Input/EndAdornment/InputEndAdornment";
import SelectArrowAndCloseEndAdornment from "./SelectArrowAndCloseEndAdornment";
import InputErrorMessage from "../Input/InputErrorMessage";

export const multiSelectInputWrapperId = 'multi-select-input-wrapper'

type Props = {
  label: InputProps['label'];
  name: InputProps['name'];
  required: InputProps['required'];
  errorMessage: InputProps['errorMessage'];
  value: MultiSelectType['value'];
  onSelect: MultiSelectType['onSelect'];
  onRemoveHandler: (tagId:SelectOptionType['id']) => void;
  onKeyDown: InputProps['onKeyDown'];
  onBlur: InputProps['onBlur'];
  inputRef: InputProps['inputRef'];
  onQuery: InputProps['onChange'];
  placeholder: InputProps['placeholder'];
  dropDownOpen: boolean;
  loading: boolean;
  hiddenErrorMessageElement: boolean;
  wrapperOnClick: () => void;
  clearInput: () => void;
}

function InputForMultiSelectMode(
  {
    name, label, required, errorMessage, value, onRemoveHandler, onBlur, onKeyDown, inputRef, onQuery, placeholder,
    dropDownOpen, loading, onSelect, hiddenErrorMessageElement, wrapperOnClick, clearInput
  }: Props
) {

  const wrapperClassName = {
    height: 'min-h-[56px]'
  }

  const inputClassName = {
    extra: 'flex-1 min-w-[100px] py-1'
  }

  const {inputStyles, inputWrapperStyles} = useInputStyles({
    errorMessage, label, wrapperClassName, inputClassName
  })

  return (
    <div className='flex flex-col gap-2'>
      <InputLabel {...{label, name, required}}/>

      <div
        id={multiSelectInputWrapperId}
        onClick={wrapperOnClick}
        className={joinObjectValues(inputWrapperStyles)}>
        <div
          className='flex items-center w-full break-word-force'
        >
          <div className='flex items-center flex-wrap flex-1 py-1'>
            {value && value?.map((tag: SelectOptionType, index: number) => (
              <div key={String(tag.id)} className='p-1'>
                <Badge
                  text={String(tag?.name) || ''}
                  onClose={() => onRemoveHandler(tag.id)}
                />
              </div>
            ))}

            <input
              {...{onKeyDown, onChange: onQuery, ref: inputRef, onBlur, id:name}}
              {...value?.length === 0 ? {placeholder} : {}}
              className={joinObjectValues(inputStyles)}
              autoComplete='off'
            />
          </div>

          <InputEndAdornment
            endAdornment={(
              <SelectArrowAndCloseEndAdornment
                loading={Boolean(loading)} hasNotValue={value?.length === 0 || !value}
                dropDownOpen={dropDownOpen}
              />
            )}
            {...value?.length !== 0 && {endAdornmentOnClick: clearInput}}
          />
        </div>
      </div>

      {!hiddenErrorMessageElement && <InputErrorMessage errorMessage={errorMessage}/>}
    </div>
  )
}

export default InputForMultiSelectMode