import Arrow2Icon from "../svg/Arrow2Icon";
import IconClickable from "./IconClickable";
import React from "react";


type Props = {
  onBackRoute: () => void
}

function BackIconClickable({onBackRoute}: Props) {
  return (
    <IconClickable rounded='rounded-md' onClick={onBackRoute}>
      <Arrow2Icon/>
    </IconClickable>
  )
}

export default BackIconClickable