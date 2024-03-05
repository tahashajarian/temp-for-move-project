import Button from "../../../../../Form/Button/Button";
import ReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import useReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import Modal from "../../../../../others/Modal/Modal";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
};

const SetPasswordModal = (props: Props) => {
  const onSubmitHandler = (data: any) => {
    console.log({ data });
  };
  const { formMethods, onSubmit } = useReactHookFormWrapper({
    onSubmitHandler,
  });

  return (
    <Modal
      width="w-[600px]"
      open={props.open}
      title={props.title}
      onClose={props.onClose}
    >
      <div>
        <ReactHookFormWrapper
          formMethods={formMethods}
          onSubmit={onSubmit}
          className="flex flex-col justify-between flex-1"
        >
          <div className="mt-3">
            <Button type="submit"> ثبت </Button>
          </div>
        </ReactHookFormWrapper>
      </div>
    </Modal>
  );
};

export default SetPasswordModal;
