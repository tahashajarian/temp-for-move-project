import ModalWithCloseButton from "../../../others/Modal/ModalWithCloseButton";
import Ls from "../../../../utils/customLocalStorage";
import LS_KEYS from "../../../../constance/localStorageKeys";


type Props = {
  open: boolean,
  onClose: () => void
}

function SuccessFulRegistrationModal({open, onClose}: Props) {

  const message = Ls.get(LS_KEYS.LOGIN.SUCCESSFUL_MESSAGE_AFTER_REGISTER)

  return (
    <ModalWithCloseButton
      open={open} onClose={onClose} title='تکمیل ثبت نام' width='w-[450px]' modalErrorMessage={message}
    />
  )
}

export default SuccessFulRegistrationModal