"use client";
import React, { useState, useEffect, useMemo } from "react";
import Input from "../Input/Input";
import { useRef } from "react";
import { InputProps} from "../Input/types/InputProps";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "./primaryDatePicker.css";
import CloseIcon from "../../svg/CloseIcon";
import DatepickerIcon from "../../svg/DatepickerIcon";

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export type CustomDatePickerProps = {
  onChangeDate: (value: string | string[]) => void;
  datePickerProps?: any;
  inputProps?: InputProps;
  onToday?: () => void;
  value?: Date | string;
  removeCloseIcon?: boolean;
};

function CustomDatePicker({
  onChangeDate,
  datePickerProps = {},
  inputProps,
  onToday,
  removeCloseIcon,
  value,
}: CustomDatePickerProps) {
  const datePickerRef = useRef<any>(null);

  const removeCloseIconShouldBeRemoved =
    removeCloseIcon || inputProps?.required;

  function onChangeHandler(date: any) {
    if (date == null) return;
    function getFormattedDate(value: any) {
      return new DateObject(value?.toDate()).format("YYYY-MM-DD");
    }

    if (datePickerProps?.range) {
      const onChangeValue = [
        ...(date[0] ? [getFormattedDate(date[0])] : []),
        ...(date[1] ? [getFormattedDate(date[1])] : []),
      ];
      onChangeDate(onChangeValue);
      // onChangeDate(date);
    } else {
      const miladiDate = new DateObject(date?.toDate()).format("YYYY-MM-DD");

      onChangeDate(miladiDate);
    }
  }

  const [valueDate, setValueDate] = useState<any>();

  useEffect(() => {
    setValueDate(value);
  }, [value]);

  const formattedValueDate = useMemo(
    function () {
      if (!datePickerProps?.range || !valueDate) return;
      return [
        ...(valueDate[0] ? [new DateObject(valueDate[0])] : []),
        ...(valueDate[1] ? [new DateObject(valueDate[1])] : []),
      ];
    },
    [valueDate]
  );

  // useEffect(
  //   function () {
  //     console.log({
  //       valueDate: [new DateObject(valueDate[0]), new DateObject(valueDate[1])],
  //     });
  //   },
  //   [valueDate]
  // );

  return (
    <DatePicker
      {...(valueDate
        ? {
            value: datePickerProps?.range
              ? formattedValueDate
              : new DateObject(valueDate),
          }
        : {})}
      weekDays={weekDays}
      ref={datePickerRef}
      offsetY={inputProps?.label ? -30 : 0}
      portal
      minDate="1200/1/1"
      render={(value, openCalendar, onChange) => {
        function onChangeInputHandler(event: any) {
          const value = event.target.value;
          event.target.value = event.target.value.trim();
          const limitLength = datePickerProps?.onlyYearPicker ? 4 : 10;
          if (value.length > limitLength) return;

          onChange(event);
        }

        function openCalendarHandler() {
          if (datePickerProps?.maxDate && !value)
            setValueDate(datePickerProps?.maxDate);
          openCalendar();
        }
        return (
          <Input
            endAdornment={
              inputProps?.disabled ? undefined : value &&
                !removeCloseIconShouldBeRemoved ? (
                <CloseIcon />
              ) : (
                <DatepickerIcon />
              )
            }
            {...(value && {
              endAdornmentOnClick: () => {
                setValueDate(null);
                onChangeDate("");
              },
            })}
            onChange={onChangeInputHandler}
            value={value}
            onClick={openCalendarHandler}
            {...inputProps}
          />
        );
      }}
      onChange={onChangeHandler}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-left"
      className="primarydate"
      containerClassName="w-full"
      {...(datePickerProps || {})}
    />
  );
}

export default CustomDatePicker;
