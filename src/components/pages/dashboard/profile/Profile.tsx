
import ReactHookFormWrapper from "../../../Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import useAdminUserDetailPage from "../manage-user/admin-user/AdminUserDetail/hooks/useAdminUserDetailPage";
import ProfileForm from "./ProfileForm";
import useProfileChangePassword from "./useProfileChangePassword";
import ProfileChangePasswordModal from "./ProfileChangePasswordModal";
import { useState } from "react";
import useProfileChangeMobileNumber from "./useProfileChangeMobileNumber";
import ProfileChangeMobileNumberModal from "./ProfileChangeMobileNumberModal";

function Profile() {
  const { formMethods, onSubmit, loading, editLoading } =
    useAdminUserDetailPage();
  const [openModalChangePass, setOpenModalChagnePass] = useState(false);
  const [openModalChangePhone, setOpenModalChagnePhone] = useState(false);

  const setValue = formMethods.setValue;
  const onClose = (phoneNumber: string) => {
    setOpenModalChagnePhone(false);
    setValue("phoneNumber", phoneNumber);
  };

  const onCloseChangePass = () => {
    setOpenModalChagnePass(false);
  };

  const {
    changePasswordFormMethods,
    changePasswordOnSubmit,
    changePasswordLoading,
  } = useProfileChangePassword({ onCloseChangePass });
  const {
    changeMobileLoading,
    changeMobileFormMethods,
    changeMobileOnSubmit,
    mobileNumberNotVerifiedMessage,
    onCloseMobileNumberNotVerified,
    onConfirmChangingMobileNumberWhenNotVerified,
  } = useProfileChangeMobileNumber({ onClose });
  return (
    <div>
      <ReactHookFormWrapper
        formMethods={formMethods}
        onSubmit={onSubmit}
        className="w-full"
      >
        <ProfileForm
          loading={editLoading}
          setOpenModalChagnePass={setOpenModalChagnePass}
          setOpenModalChagnePhone={setOpenModalChagnePhone}
        />
      </ReactHookFormWrapper>
      <ProfileChangePasswordModal
        loading={changePasswordLoading}
        onClose={() => {
          setOpenModalChagnePass(false);
        }}
        onSubmit={changePasswordOnSubmit}
        open={openModalChangePass}
        formMethods={changePasswordFormMethods}
      />
      <ProfileChangeMobileNumberModal
        onClose={() => {
          setOpenModalChagnePhone(false);
        }}
        open={openModalChangePhone}
        loading={changeMobileLoading}
        formMethods={changeMobileFormMethods}
        onSubmit={changeMobileOnSubmit}
        mobileNumberNotVerifiedMessage={mobileNumberNotVerifiedMessage}
        onCloseMobileNumberNotVerified={onCloseMobileNumberNotVerified}
        onConfirmChangingMobileNumberWhenNotVerified={
          onConfirmChangingMobileNumberWhenNotVerified
        }
        modalShouldBeRemoved={false}
        mobileNumberNotVerifiedMessageModalShouldBeRemoved={false}
      />
    </div>
  );
}

export default Profile;
