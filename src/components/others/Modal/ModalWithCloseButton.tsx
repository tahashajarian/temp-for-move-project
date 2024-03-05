import Modal, {ModalProps} from "./Modal";
import Button from "../../Form/Button/Button";


type Props = {
  modalErrorMessage: string;
} & Omit<ModalProps, 'children'>

function ModalWithCloseButton({modalErrorMessage, ...props}: Props) {
  return (
    <Modal {...props}>
      <p className='leading-8'>
        {modalErrorMessage}
      </p>
      <Button color='gray' className={{extra: 'mt-5'}} onClick={props.onClose}>
        بستن
      </Button>
    </Modal>
  )
}

export default ModalWithCloseButton