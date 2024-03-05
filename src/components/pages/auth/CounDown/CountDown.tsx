import useCountDown from "./hooks/useCountDown";
import React, {forwardRef, useImperativeHandle} from "react";
import Loading from "../../../others/Loading/Loading";


export type CountDownRefType = {
  startCountDown: (customTime:number) => void,
}

type Props = {
  loading: boolean;
  onClick: () => void;
}

const CountDown: React.ForwardRefRenderFunction<CountDownRefType, Props> = ({loading, onClick}, ref) => {

  const [remainingTime, startCountDown] = useCountDown({time: 120})//default should be 120

  useImperativeHandle(ref, () => ({
    startCountDown,
  }));

  let min: number | string = Math.floor(remainingTime / 60);
  let sec: number | string = remainingTime % 60;

  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  const resendCodeTimeEnded = remainingTime === 0

  return (
    <div className='h-6'>
      {loading ? (
        <div className='mx-auto h-5'><Loading size='sm'/></div>
      ) : resendCodeTimeEnded ? (
        <span
          onClick={onClick}
          className='cursor-pointer font-medium duration-200 text-gray-500 hover:text-gray-900 select-none'>
          ارسال مجدد کد
        </span>
      ) : (
        <span className='text-gray-600  inline-block w-12'>{`${min}:${sec}`}</span>
      )}
    </div>
  )
}

export default forwardRef(CountDown)