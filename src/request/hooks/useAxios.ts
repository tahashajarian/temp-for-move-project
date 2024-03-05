import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import { getErrorStatus, getResponseError } from "../utils/getResponse";
import useLogout from "../../hooks/auth/useLogout";
import {cloudFlareFieldName} from "../../components/others/CloudFlareCaptcha/CloudFlareCaptcha";
import {useCloudFlareCaptchaContext} from "../../contexts/CloudFlareCaptchaContext";


export type ErrorsArrayResponse = {
  errorMessage: string,
  propertyName: string
}

export type ResponseType = {
  data: any;
  error: any;
  loading: boolean;
  status: any;
};

export const initialResponse = {
  data: null,
  error: null,
  loading: false,
  status: null,
}

export const beforeLoginUrl = "beforeLoginUrl"


type SendRequestType = {
  disabledThrowErrorToastForThisStatuses?: number[];
  disabledThrowErrorToast?: boolean;
  addCloudFlareCode?: boolean;
} & AxiosRequestConfig

const useAxios = () => {

  const [response, setResponse] = useState<ResponseType>(initialResponse);

  const logout = useLogout();

  const {cloudFlareCode} = useCloudFlareCaptchaContext()

  const sendRequest = async function (props: SendRequestType) {

    const {toast} = await import("react-toastify");

    setResponse((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { axiosProvider } = await import("../../request/AxsoisProvider");

      const result = await axiosProvider.request({
        ...props,
        ...props.addCloudFlareCode ? {data: {...props.data, [cloudFlareFieldName]: cloudFlareCode}} : {}
      });

      //error handling
      const resultData = result?.data
      if (resultData?.statusCode === 900) {

        const error = resultData?.message || resultData?.errors
        setResponse((prev) => ({
          ...prev,
          error,
          status: "",
          loading: false,
        }));

        if (!props.disabledThrowErrorToast) {
          if (typeof error === 'string') {
            toast.error(error)
          } else {
            for (const errorField of error) {
              toast.error(errorField?.errorMessage || '')
            }
          }
        }

        return Promise.reject({
          error, status: ''
        })
      }

      setResponse((prev) => ({
        ...prev,
        data: result.data,
        loading: false,
        status: result.status,
        error: null,
      }));
      return {
        data: result.data, status: result.status
      };
    } catch (error) {
      const errorStatusCode:any = getErrorStatus(error)

      if (!props.disabledThrowErrorToast && !props.disabledThrowErrorToastForThisStatuses?.includes(errorStatusCode)) {
        toast.error(getResponseError(error))
      }

      if ([403, 401].includes(getErrorStatus(error))) {
        // getErrorStatus(error) === 401 && Ls.add(beforeLoginUrl, window.location.pathname + window.location.search);
        logout();
      }

      setResponse((prev) => ({
        ...prev,
        error: getResponseError(error),
        status: "",
        loading: false,
      }));
      return Promise.reject({
        error: getResponseError(error), status: errorStatusCode
      });
    }
  };
  return [response, sendRequest] as const;
};

export default useAxios;
