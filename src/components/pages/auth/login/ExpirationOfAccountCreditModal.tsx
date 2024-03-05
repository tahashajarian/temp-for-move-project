import ModalWithCloseButton from "../../../others/Modal/ModalWithCloseButton";
import {LoginErrorStatusType} from "./hooks/useLogin";
import {SetStateType} from "../../../../types/SetStateType";


type Props = {
  errorStatus: LoginErrorStatusType;
  setErrorStatus: SetStateType<LoginErrorStatusType>;
  modalErrorMessage: string;
}

function ExpirationOfAccountCreditModal({errorStatus, setErrorStatus, modalErrorMessage}: Props) {
  return (
    <ModalWithCloseButton
      open={errorStatus === 'EXPIRED'} onClose={() => setErrorStatus('')} title='وضعیت حساب کاربری'
      width='w-[450px]' modalErrorMessage={modalErrorMessage}
    />
  )
}

export default ExpirationOfAccountCreditModal