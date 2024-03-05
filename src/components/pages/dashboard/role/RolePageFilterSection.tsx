import SearchInput from "../../../Form/Input/SearchInput";
import Button from "../../../Form/Button/Button";
import {useUserPermissionsContext} from "../../../../contexts/UserPermissionsContext/UserPermissionsContext";
import PERMISSIONS_NAMES from "../../../../constance/permissionsNames";


type Props = {
  searchHandler: (value:string) => void;
  openCreateModalForm: () => void;
}

function RolePageFilterSection({searchHandler, openCreateModalForm}: Props) {

  const {hasPermission} = useUserPermissionsContext()

  return (
    <div className='flex items-center justify-between'>
      <SearchInput
        searchHandler={searchHandler}
        inputProps={{
          size: 'sm',
          placeholder: 'جستجوی نام نقش...',
          wrapperClassName: {extra: 'w-64'}
        }}
      />

      {hasPermission(PERMISSIONS_NAMES.ROLE_CREATE) && (
        <Button size='sm' onClick={openCreateModalForm}>
          ایجاد نقش
        </Button>
      )}
    </div>
  )
}

export default RolePageFilterSection