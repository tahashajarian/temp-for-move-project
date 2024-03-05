import Input from "../../../../../Form/Input/Input";
import {
  RoleObjectType
} from "./AdminUserRoleFormDropDownExports";
import {useEffect, useState} from "react";
import CheckBox from "../../../../../Form/CheckBox/CheckBox";
import Button from "../../../../../Form/Button/Button";


type Props = {
  allRoleList: RoleObjectType[];
  activeRoleList: RoleObjectType[];
  saveChanges: () => void;
  onCheck: (role: RoleObjectType) => void;
  loading: boolean;
}

function AdminUserRoleFormDropDown({allRoleList, activeRoleList, onCheck, saveChanges, loading}: Props) {

  const [filteredRoleList, setFilteredRoleList] = useState<RoleObjectType[]>(allRoleList)

  useEffect(() => {
    setFilteredRoleList(allRoleList)
  }, [allRoleList]);

  function onChange(e: any) {
    const value = e.target.value.trim().toLowerCase()

    let finalList;
    if (value) {
      finalList = allRoleList.filter(role => role.name.toLowerCase().includes(value))
    } else {
      finalList = allRoleList
    }

    setFilteredRoleList(finalList)
  }

  return (
    <div className='p-4 min-w-[400px]'>
      <Input onChange={onChange} placeholder='جستجوی...' hiddenErrorMessage/>

      <div className='max-h-80 overflow-auto my-4 space-y-2'>
        {filteredRoleList.map(role => {
          const isActive = Boolean(activeRoleList.find(activeRole => activeRole.id === role.id))

          return (
            <div
              className='flex items-center cursor-pointer duration-200 hover:bg-gray-50 py-2 px-1 rounded-md' key={role.id}
              onClick={() => onCheck(role)}
            >
              <CheckBox
                value={isActive}
              />
              <p className={`${isActive ? 'text-gray-600 font-medium' : 'text-gray-500'} select-none pr-2 duration-200`}>
                {role.name}
              </p>
            </div>
          )
        })}
      </div>

      <Button onClick={saveChanges} loading={loading}>ذخیره</Button>
    </div>
  )
}

export default AdminUserRoleFormDropDown