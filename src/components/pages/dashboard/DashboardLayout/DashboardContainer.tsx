import {Types} from "../../../../types/types";

function DashboardContainer({children}: {children: Types['children']}) {
  return (
    <div className='bg-white w-full flex items-center justify-center flex-col border border-gray-300 rounded-lg'>
      {children}
    </div>
  )
}

export default DashboardContainer