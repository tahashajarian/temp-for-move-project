import { Types} from "../../../types/types";
import React from "react";

type Props = {
  children: Types["children"];
  action: () => void;
  className: string;
};

const IconButton = (props: Props) => {
  return (
    <div
      className={`h-[42px] w-[48px] rounded border border-custom-gray-5 flex justify-center items-center p-1 duration-200 cursor-pointer hover:bg-custom-gray-4 ${props.className}`}
      onClick={() => props.action()}
    >
      {props.children}
    </div>
  );
};

export default IconButton;
