import React from "react";

type Props = {};

const Phone = (props: Props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 2H8.25C7.65326 2 7.08097 2.23705 6.65901 2.65901C6.23705 3.08097 6 3.65326 6 4.25V20.75C6 21.3467 6.23705 21.919 6.65901 22.341C7.08097 22.7629 7.65326 23 8.25 23H15.75C16.3467 23 16.919 22.7629 17.341 22.341C17.7629 21.919 18 21.3467 18 20.75V4.25C18 3.65326 17.7629 3.08097 17.341 2.65901C16.919 2.23705 16.3467 2 15.75 2H13.5M10.5 2V3.5H13.5V2M10.5 2H13.5M10.5 20.75H13.5"
        stroke="#00AEC2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Phone;
