import React, { FC } from "react";

type TdStatusProps = {
  status: 0 | 1 | 2 | -1;
};

export const ADMIN_USER_STATUSES_KEYS = {
  WAITING: 0,
  ACTIVE: 1,
  DE_ACTIVE: 2,
  EXPIRED: -1,
};

export const ADMIN_USER_STATUSES = {
  [ADMIN_USER_STATUSES_KEYS.WAITING]: {
    label: "در انتظار تایید",
    id: 0,
  },
  [ADMIN_USER_STATUSES_KEYS.ACTIVE]: {
    label: "فعال",
    id: 1,
  },
  [ADMIN_USER_STATUSES_KEYS.DE_ACTIVE]: {
    label: "غیرفعال",
    id: 2,
  },
  [ADMIN_USER_STATUSES_KEYS.EXPIRED]: {
    label: "منقضی",
    id: 3,
  },
} as const;

const TdStatus: FC<TdStatusProps> = ({ status }) => {
  return (
    <span
      className={`
    rounded-full border px-4 py-1 whitespace-nowrap text-sm
    ${
      status === ADMIN_USER_STATUSES_KEYS.WAITING &&
      "text-customOrange-main bg-customOrange-extraLight border-customOrange-light"
    }
    ${
      status === ADMIN_USER_STATUSES_KEYS.ACTIVE &&
      "text-customGreen-main bg-customGreen-extraLight border-customGreen-light"
    }
    ${
      status === ADMIN_USER_STATUSES_KEYS.DE_ACTIVE &&
      status === 2 &&
      "text-customRed-main bg-customRed-extraLight border-customRed-light"
    }
    ${
      status === ADMIN_USER_STATUSES_KEYS.EXPIRED &&
      "text-custom-gray-6 bg-custom-gray-1 border-custom-gray-2"
    }
    `}
    >
      {ADMIN_USER_STATUSES[status]?.label}
    </span>
  );
};

export default TdStatus;
