import Modal from "../../../others/Modal/Modal";
import RoleNameField from "../../../Form/FormFields/RoleNameField/RoleNameField";
import ReactHookFormWrapper from "../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import {UseFormReturn} from "react-hook-form";
import React from "react";
import Button from "../../../Form/Button/Button";
import PermissionsField from "../../../Form/FormFields/PermissionsFiled/PermissionsField";


type Props = {
  open: boolean;
  onClose: () => void;
  editMode: boolean;
  formMethods: UseFormReturn<any, any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
}

function RoleFormModal({open, onClose, editMode, formMethods, onSubmit, loading}: Props) {
  return (
    <Modal open={open} onClose={onClose} title={`${editMode ? 'ویرایش' : 'ایجاد'} نقش`} width='w-[530px]'>
      <ReactHookFormWrapper
        formMethods={formMethods}
        onSubmit={onSubmit}
        className="flex flex-col justify-between flex-1"
      >
        <RoleNameField/>

        <PermissionsField />

        <Button type='submit' className={{extra: 'mt-1'}} loading={loading}>
          {editMode ? 'ویرایش' : 'ثبت'}
        </Button>
      </ReactHookFormWrapper>
    </Modal>
  )
}

export default RoleFormModal