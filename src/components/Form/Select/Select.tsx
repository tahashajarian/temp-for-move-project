
import Input from "../Input/Input";
import { InputProps} from "../Input/types/InputProps";
import useSelect from "./hooks/useSelect";
import SelectArrowAndCloseEndAdornment from "./SelectArrowAndCloseEndAdornment";
import InputForMultiSelectMode from "./InputForMultiSelectMode";
import zIndexes from "../../../constance/zIndexes";

const minimumOptionLengthThatShouldHaveSearch = 5;

export type SelectOptionType = { name: string; id: string | boolean | number };

type NormalSelectType = {
  mode?: undefined;
  onSelect: (value: SelectOptionType | "") => void;
  value: SelectOptionType | undefined | "";
};

export type MultiSelectType = {
  mode: "multiple";
  onSelect: (value: SelectOptionType[]) => void;
  value: SelectOptionType[] | undefined;
};

export type AllSelectModesTypes = NormalSelectType | MultiSelectType;

export type SelectProps = {
  name: InputProps["name"];
  inputProps?: InputProps;
  options?: SelectOptionType[];
  apiAddress?: string;
  alwaysShouldHaveSearch?: boolean;
  removeCloseIcon?: boolean;
} & AllSelectModesTypes;

function Select(props: SelectProps) {
  //TODO should add disabled to props of this component
  const {
    name,
    inputProps,
    options,
    onSelect,
    value,
    apiAddress,
    alwaysShouldHaveSearch,
    mode,
    removeCloseIcon,
  } = props;

  const {
    inputWrapperRef,
    toggleDropDown,
    loading,
    dropDownOpen,
    optionOnClick,
    onQuery,
    filteredOptions,
    onRemoveHandler,
    clearInput,
    dropDownStyle,
    dropDownRef,
  } = useSelect(props);

  const haveSearch =
    name &&
    !Boolean(
      alwaysShouldHaveSearch
        ? false
        : options?.length &&
            options?.length <= minimumOptionLengthThatShouldHaveSearch
    );

  const removeCloseIconShouldBeRemoved =
    removeCloseIcon || inputProps?.required;

  return (
    <div ref={inputWrapperRef}>
      {mode === "multiple" ? (
        <InputForMultiSelectMode
          loading={loading}
          value={value}
          dropDownOpen={dropDownOpen}
          wrapperOnClick={toggleDropDown}
          onSelect={onSelect}
          name={name}
          label={inputProps?.label}
          inputRef={inputProps?.inputRef}
          onQuery={onQuery}
          errorMessage={inputProps?.errorMessage}
          onBlur={inputProps?.onBlur}
          hiddenErrorMessageElement={Boolean(inputProps?.hiddenErrorMessage)}
          required={inputProps?.required}
          onRemoveHandler={onRemoveHandler}
          onKeyDown={inputProps?.onKeyDown}
          placeholder={inputProps?.placeholder}
          clearInput={clearInput}
        />
      ) : (
        <Input
          autoCompleteOff
          readOnly={!haveSearch}
          inputWrapperOnClick={toggleDropDown}
          endAdornment={
            !props.inputProps?.disabled && (
              <SelectArrowAndCloseEndAdornment
                loading={loading}
                hasNotValue={
                  removeCloseIconShouldBeRemoved ? true : !value && value === ""
                }
                dropDownOpen={dropDownOpen}
              />
            )
          }
          {...(value &&
            !removeCloseIconShouldBeRemoved && {
              endAdornmentOnClick: clearInput,
            })}
          onChange={onQuery}
          name={name}
          {...inputProps}
        />
      )}

      <div
        ref={dropDownRef}
        style={dropDownStyle}
        className={`
        fixed ${zIndexes.selectDropDown}
        p-3 shadow rounded-md duration-200 bg-white origin-top
        ${dropDownOpen ? "" : "opacity-0 pointer-events-none scale-[0.99]"}
      `}
      >
        <div className="overflow-auto flex flex-col scroll-thin max-h-52">
          {filteredOptions.length === 0 ? (
            <span className="py-2">آیتمی یافت نشد</span>
          ) : (
            filteredOptions?.map((option) => {
              let isActive;

              if (mode === "multiple") {
                isActive =
                  value &&
                  Boolean(
                    value?.find(
                      (item: SelectOptionType) => item.id === option.id
                    )
                  );
              } else {
                isActive = value && option.id === value?.id;
              }

              return (
                <span
                  onClick={(e: any) => optionOnClick(e, option)}
                  className={`${
                    isActive
                      ? `text-accent bg-accent/5 ${
                          mode != null && "cursor-pointer"
                        }`
                      : `hover:bg-gray-50 cursor-pointer`
                  } rounded-md duration-200 p-2 select-none break-word-force`}
                  key={String(option.id)}
                >
                  {option.name}
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Select;
