import React, { FC } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

interface Props {
  date: Date;
}

const TdDate: FC<Props> = ({ date }) => {
  const shamsiDate = new DateObject(date).convert(persian, persian_fa)
  return <span className="text-sm">{shamsiDate.format("YYYY/MM/DD")}</span>;
};

export default TdDate;
