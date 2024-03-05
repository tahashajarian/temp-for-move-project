import DeleteModal, {DeleteModalProps} from "../../../others/Modal/DeleteModal";

function DeleteRoleModal(
  {
    onConfirmHandler, open, onClose, loading
  }: Pick<DeleteModalProps, 'onConfirmHandler' | 'open' | 'onClose' | 'loading'>
) {
  return (
    <DeleteModal
      title='حذف نقش' open={open} onClose={onClose} width='w-[430px]'
      onConfirmHandler={onConfirmHandler} loading={loading}
    >
      <span className='text-gray-500 leading-[24px]'>
        آیا از حذف نقش انتخاب شده اطمینان دارید ؟
      </span>
    </DeleteModal>
  )
}

export default DeleteRoleModal