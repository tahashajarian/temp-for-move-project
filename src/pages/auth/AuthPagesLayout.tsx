
import TypoAndLogo from "../../components/others/TypoAndLogo";
import {Outlet} from "react-router-dom";


function AuthPagesLayout() {
  return (
    <div className='min-h-screen flex items-center justify-center p-10'>
      <div
        className='bg-white w-[450px] h-auto m-auto flex flex-col border py-6 px-12 rounded-xl border-gray-200 shadow-base'>
        <div className='flex justify-center w-full relative h-11 mb-10'>
          <TypoAndLogo />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthPagesLayout;