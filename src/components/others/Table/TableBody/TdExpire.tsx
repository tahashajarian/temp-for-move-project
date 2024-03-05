import React, { FC } from "react";

interface Props {
  data: boolean;
}

const TdExpire: FC<Props> = ({ data }) => {
  return <span className="text-sm">{data ? "محدود" : "نامحدود"}</span>;
};

export default TdExpire;
