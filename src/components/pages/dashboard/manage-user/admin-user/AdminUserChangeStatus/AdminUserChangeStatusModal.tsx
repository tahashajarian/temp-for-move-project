import {UseFormReturn} from "react-hook-form";
import React from "react";
import Modal from "../../../../../others/Modal/Modal";
import ModalDescriptionText from "../../../../../others/Modal/ModalDescriptionText";
import ReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import Button from "../../../../../Form/Button/Button";
import AdminUserStatusField from "../../../../../Form/FormFields/AdminUserStatusField/AdminUserStatusField";


type Props = {
  open: boolean;
  onClose: () => void;
  formMethods: UseFormReturn<any, any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
}

function AdminUserChangeStatusModal({open, onClose, onSubmit, loading, formMethods}: Props) {
  return (
    <Modal open={open} onClose={onClose} title='تغییر وضعیت کاربر'>
      <ModalDescriptionText text='لطفا وضعیت کاربر را انتخاب کنید' />

      <ReactHookFormWrapper
        formMethods={formMethods}
        onSubmit={onSubmit}
        className="flex flex-col justify-between flex-1"
      >
        <div>
          <AdminUserStatusField />
        </div>

        <Button type='submit' loading={loading} className={{extra: 'mt-1'}}>
          تأیید
        </Button>
      </ReactHookFormWrapper>
    </Modal>
  )
}

export default AdminUserChangeStatusModal