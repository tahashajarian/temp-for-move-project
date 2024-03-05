import useAxios from "../../../../request/hooks/useAxios";
import {useState} from "react";
import useReactHookFormWrapper from "../../../Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import {
  mobileFieldName,
  MobileType
} from "../../../Form/FormFields/MobileField/MobileFieldExports";
import APIES from "../../../../constance/apies";
import {getResponseSuccess} from "../../../../request/utils/getResponse";
import useDisplayWithAnimation from "../../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";

type FormDataType = {
  [mobileFieldName]: MobileType;
};

type ChangeMobileDataType = {
  phoneNumber: string;
  trackingCode?: string;
};

type Props = {
  onClose: (phoneNumber: string) => void;
};

function useProfileChangeMobileNumber({onClose}: Props) {
  const [changeMobileNumberResponse, changeMobileNumberRequest] = useAxios();
  const [
    changeMobileNumberModalAdminUserId,
    setChangeMobileNumberModalAdminUserId,
  ] = useState<string>("");
  const {shouldBeRemoved: changeMobileNumberModalShouldBeRemoved} =
    useDisplayWithAnimation({
      show: Boolean(changeMobileNumberModalAdminUserId),
    });
  const [mobileNumberNotVerifiedMessage, setMobileNumberNotVerifiedMessage] =
    useState<string>("");
  const {
    shouldBeRemoved: mobileNumberNotVerifiedMessageModalShouldBeRemoved,
  } = useDisplayWithAnimation({
    show: Boolean(mobileNumberNotVerifiedMessage),
  });
  const [mobileNumberNotVerifiedData, setMobileNumberNotVerifiedData] =
    useState<ChangeMobileDataType>();

  const {formMethods, onSubmit} = useReactHookFormWrapper({
    onSubmitHandler,
  });

  function onSubmitHandler(formData: FormDataType) {
    const data = {
      phoneNumber: formData[mobileFieldName],
    };

    changeMobileNumberHandler(data);
  }

  function changeMobileNumberHandler(data: ChangeMobileDataType) {
    changeMobileNumberRequest({
      url: APIES.PROFILE_CHANGE_MOBILE_NUMBER,
      method: "POST",
      data,
      addCloudFlareCode: true
    }).then(async (res) => {
      if (res.data?.statusCode === 901) {
        setMobileNumberNotVerifiedMessage(res.data.message);
        setMobileNumberNotVerifiedData({
          ...data,
          trackingCode: res.data?.result,
        });
        setChangeMobileNumberModalAdminUserId("");
      } else {
        const {toast} = await import("react-toastify");
        toast.success(getResponseSuccess(res));
        onClose(data.phoneNumber);
        onCloseMobileNumberNotVerified();
        closeChangeMobileNumberModal();
      }
    });
  }

  function closeChangeMobileNumberModal() {
    setChangeMobileNumberModalAdminUserId("");
    formMethods.reset();
  }

  function onCloseMobileNumberNotVerified() {
    setMobileNumberNotVerifiedMessage("");
    setMobileNumberNotVerifiedData(undefined);
    formMethods.reset();
  }

  function onConfirmChangingMobileNumberWhenNotVerified() {
    if (!mobileNumberNotVerifiedData) return;
    changeMobileNumberHandler(mobileNumberNotVerifiedData);
  }

  return {
    changeMobileNumberModalAdminUserId,
    closeChangeMobileNumberModal,
    setChangeMobileNumberModalAdminUserId,
    changeMobileFormMethods: formMethods,
    changeMobileLoading: changeMobileNumberResponse.loading,
    changeMobileOnSubmit: onSubmit,
    mobileNumberNotVerifiedMessage,
    onCloseMobileNumberNotVerified,
    onConfirmChangingMobileNumberWhenNotVerified,
    changeMobileNumberModalShouldBeRemoved,
    mobileNumberNotVerifiedMessageModalShouldBeRemoved,
  };
}

export default useProfileChangeMobileNumber;
