import {useController, useFormContext} from "react-hook-form";
import {InputFormPropsType} from "../../Form/Input/InputForm";
import CheckBoxTreeWithSearch from "./CheckBoxTreeWithSearch";
import {useEffect, useState} from "react";
import {CheckBoxTreeProps} from "./CheckBoxTree";
import InputErrorMessage from "../../Form/Input/InputErrorMessage";
import {InputProps} from "../../Form/Input/types/InputProps";
import InputLabel from "../../Form/Input/InputLabel";
import useInputStyles from "../../Form/Input/hooks/useInputStyles";
import joinObjectValues from "../../../utils/joinObjectValues";


type Props = {
  errorMessage?: InputProps['errorMessage'];
  label?: InputProps['label'];
  nodes: CheckBoxTreeProps['nodes'];
  searchInputWidth?: string;
} & Pick<InputFormPropsType, 'fieldName' | 'rules'>

function CheckBoxTreeWithSearchForm({fieldName, rules, errorMessage, label, nodes, searchInputWidth}: Props) {

  const {control} = useFormContext()

  const {labelStyles} = useInputStyles({})

  const {
    field: {onChange, name, value},
  } = useController({
    name: fieldName,
    control,
    rules,
    defaultValue: [],
  });

  const [checked, setChecked] = useState<CheckBoxTreeProps['checked']>(value)
  const [expanded, setExpanded] = useState<CheckBoxTreeProps['expanded']>([])

  function valueIsEqualToChecked() {
    return checked?.every((item: string) => value.includes(item)) && value?.every((item: string) => checked.includes(item))
  }

  useEffect(() => {
    if (valueIsEqualToChecked()) return
    setChecked(value)
  }, [value])

  useEffect(() => {
    onChange(checked)
  }, [checked]);

  return (
    <>
      <InputLabel label={label} className={joinObjectValues(labelStyles)}/>

      <CheckBoxTreeWithSearch
        setChecked={setChecked} checked={checked} expanded={expanded} setExpanded={setExpanded}
        nodes={nodes} hasError={Boolean(errorMessage)} searchInputWidth={searchInputWidth}
      />

      <InputErrorMessage errorMessage={errorMessage} />
    </>
  )
}

export default CheckBoxTreeWithSearchForm