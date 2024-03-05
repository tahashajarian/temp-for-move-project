import {apiAddressCreator} from "./AxsoisProvider";
import getToken from "../utils/auth/getToken";
import getUrlWithParams from "../utils/getUrlWithParams";


type Props = {
  url: string;
  params?: Record<string, string | number>;
  data?: any;
  headers?: HeadersInit;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  cache?: RequestCache;
  tokenFromServerSide?: string
}

async function customFetch({url, params, data, headers = {}, method, cache = 'no-store', tokenFromServerSide}: Props) {
  const token = tokenFromServerSide ?  tokenFromServerSide  : getToken()

  const urlWithParams = getUrlWithParams(url, params)

  let finalUrl;

  if (typeof window !== "undefined") {
    finalUrl = await apiAddressCreator(urlWithParams)
  } else {
    const apiAddressCreatorInServer = require("../request/utils/apiAddressCreatorInServer").default
    finalUrl = await apiAddressCreatorInServer(urlWithParams)
  }

  try {
    const res = await fetch(
      finalUrl,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...token && {Authorization: `Bearer ${token}`},
          ...headers
        },
        method: method || 'GET',
        cache: cache || "no-store",
        ...data && {body: JSON.stringify(data)}
      }
    )

    const convertedToJson = await res.json();

    return convertedToJson
  } catch (error) {
    return {}
  }

}

export default customFetch