
import ReactHookFormWrapper
  from "../../../../../../components/Form/FormLayout/ReactHookFormWrapper/ReactHookFormWrapper";
import OverContainerLoading from "../../../../../../components/others/Loading/OverContainerLoading";
import AdminUserEditForm
  from "../../../../../../components/pages/dashboard/manage-user/admin-user/AdminUserDetail/AdminUserEditForm";
import useAdminUserDetailPage
  from "../../../../../../components/pages/dashboard/manage-user/admin-user/AdminUserDetail/hooks/useAdminUserDetailPage";

function AdminUserDetailPage() {
  const { formMethods, onSubmit, loading, editLoading } =
    useAdminUserDetailPage();

  return (
    <>
      <ReactHookFormWrapper
        formMethods={formMethods}
        onSubmit={onSubmit}
        className="w-full"
      >
        <AdminUserEditForm loading={editLoading} />
      </ReactHookFormWrapper>
      <OverContainerLoading loading={loading} overlayPage />
    </>
  );
}

export default AdminUserDetailPage;
