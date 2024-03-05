import {Types} from "../../types/types";


type Props = {
  children: Types['children']
  className?: string
  onClick?: () => void
  rounded?: 'rounded-full' | 'rounded-md'
}

function IconClickable({children, className, onClick, rounded='rounded-full'}: Props) {
  return (
    <div {...onClick && {onClick}} className={`${className || ''} p-1 cursor-pointer ${rounded} duration-200 hover:bg-gray-100`}>
      {children}
    </div>
  )
}

export default IconClickable