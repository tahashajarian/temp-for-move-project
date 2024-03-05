import {useSearchParams} from "react-router-dom";

function useGetDecodedSearchParam() {

  const [searchParams, ] = useSearchParams()

  function getDecodedSearchParam(label: string) {
    return decodeURIComponent(searchParams.get(label) || '')
  }

  return getDecodedSearchParam
}

export default useGetDecodedSearchParam