import CheckBoxTree, {CheckBoxTreeProps} from "./CheckBoxTree";
import Input from "../../Form/Input/Input";
import {useState} from "react";
import Loading from "../Loading/Loading";

type Props = {
  hasError?: boolean;
  removeOverflow?: boolean;
  loading?: boolean;
  searchInputWidth?: string;
} & CheckBoxTreeProps

function CheckBoxTreeWithSearch({hasError, removeOverflow, loading, searchInputWidth, ...props}: Props) {

  const [filterValue, setFilterValue] = useState<string>('')

  return (
    <div className={`rounded-lg bg-gray-50 border ${hasError ? 'border-red-500' : 'border-gray-200'}`}>
      <div className='py-3 px-6 border-b border-gray-200'>
        <Input
          onChange={(e) => setFilterValue(e.target.value)} value={filterValue} hiddenErrorMessage
          placeholder='جستجو...' size='sm'
          wrapperClassName={{borderRadius: 'rounded-lg', shadow: 'shadow-none', extra: searchInputWidth || 'w-96'}}
        />
      </div>

      <div className={`py-3 px-6 ${removeOverflow ? '' : 'h-80 overflow-auto'} scroll-thin`}>
        {loading ? (
          <div className='h-80 flex items-center'>
            <Loading />
          </div>
          ) : (
          <CheckBoxTree
            filterValue={filterValue}
            {...props}
          />
        )}
      </div>
    </div>
  )
}

export default CheckBoxTreeWithSearch