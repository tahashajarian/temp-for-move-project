import ReactHookFormWrapper from "../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import Button from "../../../Form/Button/Button";
import Modal from "../../../others/Modal/Modal";
import MobileField from "../../../Form/FormFields/MobileField/MobileField";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import ModalDescriptionText from "../../../others/Modal/ModalDescriptionText";
import CloudFlareCaptcha from "../../../others/CloudFlareCaptcha/CloudFlareCaptcha";

type Props = {
  open: boolean;
  onClose: () => void;
  formMethods: UseFormReturn<any, any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
  mobileNumberNotVerifiedMessage: string;
  onCloseMobileNumberNotVerified: () => void;
  onConfirmChangingMobileNumberWhenNotVerified: () => void;
  modalShouldBeRemoved: boolean;
  mobileNumberNotVerifiedMessageModalShouldBeRemoved: boolean;
};

function ProfileChangeMobileNumberModal({
  open,
  onClose,
  formMethods,
  onSubmit,
  loading,
  mobileNumberNotVerifiedMessage,
  onCloseMobileNumberNotVerified,
  onConfirmChangingMobileNumberWhenNotVerified,
  modalShouldBeRemoved,
  mobileNumberNotVerifiedMessageModalShouldBeRemoved,
}: Props) {
  return (
    <>
      {!modalShouldBeRemoved && (
        <Modal open={open} onClose={onClose} title="تغییر شماره همراه کاربر">
          <ModalDescriptionText text="لطفا شماره همراه جدید کاربر را وارد کنید" />
          <CloudFlareCaptcha />

          <ReactHookFormWrapper
            formMethods={formMethods}
            onSubmit={onSubmit}
            className="flex flex-col justify-between flex-1"
          >
            <MobileField checkValidation />

            <Button
              type="submit"
              loading={loading}
              className={{ extra: "mt-1" }}
              needCloudFlare
            >
              تأیید
            </Button>
          </ReactHookFormWrapper>
        </Modal>
      )}

      {!mobileNumberNotVerifiedMessageModalShouldBeRemoved && (
        <Modal
          open={Boolean(mobileNumberNotVerifiedMessage)}
          onClose={onCloseMobileNumberNotVerified}
          title="تغییر شماره همراه کاربر"
        >
          <ModalDescriptionText text={mobileNumberNotVerifiedMessage} />
          <div className="grid grid-cols-2 gap-x-4">
            <Button
              color="gray"
              onClick={onConfirmChangingMobileNumberWhenNotVerified}
              loading={loading}
            >
              تأیید
            </Button>
            <Button
              color="red"
              variant="outlined"
              onClick={onCloseMobileNumberNotVerified}
            >
              انصراف
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileChangeMobileNumberModal;
