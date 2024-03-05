import Button from "../../../../../Form/Button/Button";
import ReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import Modal from "../../../../../others/Modal/Modal";

import React from "react";
import FilterModalFileds from "./FilterModalFields";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  action: (data: any) => void;
  formMethods: any;
  onSubmit: any;
  reset: any
};

const FilterModal = (props: Props) => {


  return (
    <Modal
      width="w-[600px]"
      open={props.open}
      title={props.title}
      onClose={props.onClose}
    >
      <div>
        <ReactHookFormWrapper
          formMethods={props.formMethods}
          onSubmit={props.onSubmit}
          className="flex flex-col justify-between flex-1"
        >
          <FilterModalFileds />
          <div className="mt-3">
            <Button type="submit">جستجو</Button>
          </div>
          <div className="mt-3">
            <Button
              onClick={() => {
                props.reset({
                  firstName: "",
                  lastName: "",
                  phoneNumber: "",
                  gender: "",
                  birthday: "",
                  registerDate: "",
                  organizationId: "",
                  postName: "",
                  accountExpirationDate: "",
                  hasAccountExpirationDate: "",
                });
              }}
              type="button"
              variant="text"
              color="gray"
            >
              بازنشانی
            </Button>
          </div>
        </ReactHookFormWrapper>
      </div>
    </Modal>
  );
};

export default FilterModal;
