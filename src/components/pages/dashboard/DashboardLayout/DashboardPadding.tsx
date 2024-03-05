import {Types} from "../../../../types/types";

function DashboardPadding({children}: {children: Types['children']}) {
  return (
    <div className='p-4'>
      {children}
    </div>
  )
}

export default DashboardPadding