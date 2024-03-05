import APIES from "../../../../../../constance/apies";
import useAxios from "../../../../../../request/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { SimpleFilter } from "../types";
import useReactHookFormWrapper from "../../../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";

type Props = {};

const useUserList = () => {
  const [simpleFilters, setSimpleFilters] = useState<SimpleFilter>({
    nationalCode: "",
    status: { name: "همه", id: "All" },
  });
  const [tableDateRes, tableDateReq] = useAxios();
  const { formMethods, onSubmit } = useReactHookFormWrapper({
    onSubmitHandler,
  });

  const [isFormDirty, setIsFormDirty] = useState(false);
  const { reset, formState } = formMethods;

  function onSubmitHandler(data: any) {
    modalSearchSubmit(data);
  }
  const [filters, setFilters] = useState<any>({});
  const [openModalFilters, setOpenModalFilters] = useState(false);
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const [timeoutstate, settimeoutstate] = useState<NodeJS.Timeout>();
  const handleChangeSimpleFilters = (filed: {
    key: "nationalCode" | "status";
    value: string;
  }) => {
    const newSimplerFilters = {
      ...simpleFilters,
      [filed.key]: filed.value,
    };
    setSimpleFilters(() => newSimplerFilters);
    clearTimeout(timeoutstate);
    settimeoutstate(
      setTimeout(() => {
        setFilters({
          nationalCode: newSimplerFilters.nationalCode || undefined,
          status: newSimplerFilters.status?.id,
        });
      }, 1000)
    );
  };
  const getData = useCallback(() => {
    console.log("calling api...");
    const url = APIES.ADMIN_USERS_LIST;
    tableDateReq({
      url,
      method: "GET",
      params: {
        pageNumber: 1,
        rowsOfPage: 10000,
        filter: JSON.stringify({
          ...filters,
          status:
            filters?.status === "All" ? undefined : Number(filters?.status),
        }),
        withTotalCount: true,
      },
    })
      .then((res) => {
        console.log("res ===> ", res);
      })
      .catch((error) => {});
  }, [filters]);

  const modalSearchSubmit = (data: any) => {
    setIsFormDirty(
      data.firstName ||
        data.lastName ||
        data.phoneNumber ||
        data.gender?.id ||
        data.birthday[0] ||
        data.birthday[1] ||
        data.registerDate[0] ||
        data.registerDate[1] ||
        data.organizationId?.id ||
        data.postName ||
        data.accountExpirationDate[0] ||
        data.accountExpirationDate[1] ||
        data.hasAccountExpirationDate.id
    );
    setOpenModalFilters(false);
    const newFilters = {
      firstname: data.firstName || undefined,
      lastname: data.lastName || undefined,
      Phonenumber: data.phoneNumber || undefined,
      gender: data.gender?.id || undefined,
      birthdateFrom: data.birthday[0] || undefined,
      birthdateTo: data.birthday[1] || undefined,
      registerdateFrom: data.registerDate[0] || undefined,
      registerdateTo: data.registerDate[1] || undefined,
      organizationid: data.organizationId?.id || undefined,
      postname: data.postName || undefined,
      accountExpirationDateFrom: data.accountExpirationDate[0] || undefined,
      accountExpirationDateTo: data.accountExpirationDate[1] || undefined,
      hasAccountExpirationDate: data.hasAccountExpirationDate.id || undefined,
    };
    setFilters({ ...filters, ...newFilters });
  };

  useEffect(() => {
    getData();
  }, [getData]);


  return {
    modalSearchSubmit,
    tableDateRes,
    handleChangeSimpleFilters,
    openModalFilters,
    setOpenModalFilters,
    openModalAddUser,
    setOpenModalAddUser,
    getData,
    simpleFilters,
    reset,
    onSubmit,
    formMethods,
    formDirty: isFormDirty,
  };
};

export default useUserList;
