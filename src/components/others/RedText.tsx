import {Types} from "../../types/types";

type Props = {
  children: Types['children']
}

function RedText({children}: Props) {
  return (
    <span className='text-red-500 font-bold'>{children}</span>
  )
}

export default RedText