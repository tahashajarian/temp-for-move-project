
import {Types} from "../../../../types/types";
import ReactHookFormWrapper from "../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import ErrorMessage from "../../../others/ErrorMessage";
import {useNavigate} from "react-router-dom";
import React, {forwardRef} from "react";
import {UseFormReturn} from "react-hook-form";
import BackIconClickable from "../../../others/BackIconClickable";

export type AuthLayoutRefType = {
  setValue: any,
  getValues: any,
}

type Props = {
  title: string;
  subTitle: string | Types['children'];
  children: Types['children'];
  errorMessage?: string;
  backLink?: boolean;
  formMethods: UseFormReturn<any, any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onBackHandler?: () => void;
}

const AuthLayout: React.ForwardRefRenderFunction<AuthLayoutRefType, Props> = (
  {
    title, subTitle, children, errorMessage,
    backLink, formMethods, onSubmit, onBackHandler
  }, ref
) => {

  const navigate = useNavigate()

  function onBackRoute() {
    if (!backLink) return
    onBackHandler ? onBackHandler() : navigate(-1)
  }

  return (
    <ReactHookFormWrapper
      formMethods={formMethods}
      onSubmit={onSubmit}
      className="flex flex-col justify-between flex-1"
    >
      <div className={`duration-300 overflow-hidden ${errorMessage ? 'h-auto mb-5' : 'h-0 opacity-0'}`}>
        <ErrorMessage message={errorMessage || ''}/>
      </div>

      <div className='flex items-center space-x-reverse space-x-2 mb-2'>
        {backLink && (
          <BackIconClickable onBackRoute={onBackRoute} />
        )}
        <p className="font-bold text-xl">
          {title}
        </p>
      </div>

      <p className="text-gray-500 mb-6">
        {subTitle}
      </p>

      {children}
    </ReactHookFormWrapper>
  )
}

export default forwardRef(AuthLayout)