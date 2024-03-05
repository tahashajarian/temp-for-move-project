import ModalDescriptionText from "../../../../../others/Modal/ModalDescriptionText";
import ReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import Modal from "../../../../../others/Modal/Modal";
import {UseFormReturn} from "react-hook-form";
import PasswordAndRepeatPasswordForm
  from "../../../../../Form/FormLayout/PasswordAndRepeatPasswordForm/PasswordAndRepeatPasswordForm";


type Props = {
  open: boolean;
  onClose: () => void;
  formMethods: UseFormReturn<any, any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
}

function AdminUserChangePasswordModal({loading, formMethods, onSubmit, onClose, open}: Props) {
  return (
    <Modal open={open} onClose={onClose} title='تغییر کلمه عبور کاربر'>
      <ModalDescriptionText text='لطفا کلمه عبور جدید را وارد کنید' />

      <ReactHookFormWrapper
        formMethods={formMethods}
        onSubmit={onSubmit}
        className="flex flex-col justify-between"
      >
        <PasswordAndRepeatPasswordForm loading={loading} hasGenerateRandomPasswordButton />
      </ReactHookFormWrapper>
    </Modal>
  )
}

export default AdminUserChangePasswordModal