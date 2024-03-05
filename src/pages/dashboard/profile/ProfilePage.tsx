
import OverContainerLoading from "../../../components/others/Loading/OverContainerLoading";
import Profile from "../../../components/pages/dashboard/profile/Profile";
import useProfileDetailPage from "../../../components/pages/dashboard/profile/useProfileDetailPage";

function ProfilePage() {
  const { loading } = useProfileDetailPage();

  return (
    <>
      <Profile />
      <OverContainerLoading loading={loading} overlayPage />
    </>
  );
}

export default ProfilePage;
