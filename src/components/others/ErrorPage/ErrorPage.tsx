import {useNavigate, useRouteError} from "react-router-dom";
import Button from "../../Form/Button/Button";
import ROUTER_LINKS from "../../../constance/routerLinks";
import Arrow2Icon from "../../svg/Arrow2Icon";
import ErrorIcon from "../../svg/ErrorIcon";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate()
  console.error(error);

  function onClick() {
    navigate(ROUTER_LINKS.HOME)
  }

  return (
    <div className='h-screen w-screen flex-center'>
      <div id="error-page" className='space-y-10 p-5 rounded-md shadow-base m-auto flex flex-col items-center justify-center w-96 h-auto bg-white'>
        <div className='flex items-center space-x-reverse space-x-1'>
          <ErrorIcon />
          <p className='text-red-500 text-xl font-bold'>مشکلی پیش آمده.</p>
        </div>

        <div className='flex items-center space-x-reverse space-x-2'>
          <p>{error?.statusText || error?.message}</p>
          <p>{error?.status}</p>
        </div>

        <Button variant='outlined' color='gray' onClick={onClick}>
          <Arrow2Icon />
          <span>برگشت به صفحه خانه</span>
        </Button>
      </div>
    </div>
  );
}