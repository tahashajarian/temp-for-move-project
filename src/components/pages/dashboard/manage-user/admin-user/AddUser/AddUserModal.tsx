import Button from "../../../../../Form/Button/Button";
import ReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import useReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import Modal from "../../../../../others/Modal/Modal";

import React, { useState } from "react";
import AddUserField from "./AddUserField";
import useAxios from "../../../../../../request/hooks/useAxios";
import APIES from "../../../../../../constance/apies";
import SetPasswordForm from "../../../../../others/SetPasswordFrom/SetPasswordForm";
import ModalDescriptionText from "../../../../../others/Modal/ModalDescriptionText";


type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  getData: () => void;
};

const AddUserModal = (props: Props) => {
  const { formMethods, onSubmit } = useReactHookFormWrapper({
    onSubmitHandler,
  });

  const [isStepOne, setIsStepOne] = useState(true);
  const [trackId, setTrackId] = useState("");
  const { reset, setValue, watch } = formMethods;
  const [conflictPhoneNumberModal, setConflictPhoneNumberModal] =
    useState(false);
  const [addUserResponse, addUserRequest] = useAxios();

  function onSubmitHandler(data: any) {
    console.log("submit form  => ", data);
    const instanceData = { ...data };

    instanceData.organizationId = instanceData.organizationId?.id;
    instanceData.roles = instanceData.roles?.map((role: any) => role.id);
    instanceData.accountExpirationDate = instanceData.hasAccountExpirationDate
      ? instanceData.accountExpirationDate
      : undefined;
    if (conflictPhoneNumberModal) {
      instanceData.phoneNumberConfirmed = true;
    } else {
      instanceData.phoneNumberConfirmed = undefined;
    }
    if (!isStepOne && trackId) {
      instanceData.trackingCode = trackId;
    }
    addUserRequest({
      url: APIES.ADMIN_USERS_CREATE_USER,
      method: "POST",
      data: instanceData,
      addCloudFlareCode: true
    }).then((res) => {
      console.log("res => ", res);
      if (res.data.statusCode === 201) {
        setTrackId(res.data.result);
        setIsStepOne(false);
        setConflictPhoneNumberModal(false);
      }
      if (res.data.statusCode === 200) {
        props.getData();
        closeModal();
      }
      if (res.data.statusCode === 901) {
        setConflictPhoneNumberModal(true);
      }
    });
  }

  const closeModal = () => {
    reset();
    setIsStepOne(true);
    props.onClose();
  };

  return (
    <div>
      <Modal
        width="w-[600px]"
        open={props.open}
        title={props.title}
        onClose={closeModal}
        backAction={
          isStepOne
            ? undefined
            : () => {
                setIsStepOne(true);
              }
        }
        keepOpenOnClickAway
      >
        <div>
          <ReactHookFormWrapper
            formMethods={formMethods}
            onSubmit={onSubmit}
            className="flex flex-col justify-between flex-1"
          >
            {isStepOne ? (
              <>
                <AddUserField
                  hasAccountExpirationDate={watch().hasAccountExpirationDate}
                />
                <div className="mt-3">
                  <Button loading={addUserResponse.loading} type="submit" needCloudFlare>
                    تایید و ادامه
                  </Button>
                </div>
              </>
            ) : (
              <SetPasswordForm
                buttonDisabled={false}
                passwordFieldname="password"
                repeatPasswordFieldName="repassword"
                loading={addUserResponse.loading}
                generateButtonAction={(pass) => {
                  console.log({ pass });
                  setValue("password", pass);
                  setValue("repassword", pass);
                }}
              />
            )}
          </ReactHookFormWrapper>
        </div>
      </Modal>
      <Modal
        open={conflictPhoneNumberModal}
        onClose={() => {
          setConflictPhoneNumberModal(false);
        }}
        title="تایید شماره همراه کاربر"
      >
        <ModalDescriptionText
          text={
            "مالکیت شماره تلفن همراه احراز نشد؛ در صورت تأیید مسئولیت تغییر آن بر عهده شماست"
          }
        />
        <div className="grid grid-cols-2 gap-x-4">
          <Button
            color="gray"
            onClick={onSubmit}
            loading={addUserResponse.loading}
          >
            تأیید
          </Button>
          <Button
            color="red"
            variant="outlined"
            onClick={() => {
              setConflictPhoneNumberModal(false);
            }}
          >
            انصراف
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserModal;
