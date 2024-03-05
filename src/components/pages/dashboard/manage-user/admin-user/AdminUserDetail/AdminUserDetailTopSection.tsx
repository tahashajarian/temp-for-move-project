
import BackIconClickable from "../../../../../others/BackIconClickable";
import Tab from "../../../../../others/Tab/Tab";
import ADMIN_USER_DETAIL_TABS from "./adminUserDetailTabs";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import ROUTER_LINKS from "../../../../../../constance/routerLinks";
import {useEffect, useMemo} from "react";
import {UserDetailDataType, useUserDetailContext} from "../../../../../../contexts/AdminUserDetailContext";
import Loading from "../../../../../others/Loading/Loading";

function AdminUserDetailTopSection({}) {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const params = useParams()

  const {userDetailResponse, fetchUserDetail} = useUserDetailContext()
  const userDetailData:UserDetailDataType = userDetailResponse?.data?.result

  useEffect(() => {
    fetchUserDetail()
  }, []);

  function tabOnChangeHandler(tabId:any) {
    navigate(`${ROUTER_LINKS.MANAGE_ADMIN_USER_LIST}/${params.userId}/${tabId}`, {replace: true})
  }

  const activeTab = useMemo(function () {
    const tabName = pathname.split('/').at(-1)
    return tabName
  }, [pathname])

  return (
    <div className='bg-white border-b border-gray-300'>
      <div className='flex items-center py-4 space-x-reverse space-x-1 px-3'>
        <BackIconClickable onBackRoute={() => navigate(-1)}/>
        {userDetailResponse.loading ? <Loading size='sm'/> : (
          <span className='text-lg font-bold'>
            {`${userDetailData?.firstName || ''} ${userDetailData?.lastName || ''}`}
          </span>
        )}
      </div>

      <div className='mx-4'>
        <Tab
          tabs={ADMIN_USER_DETAIL_TABS} onClick={(item) => console.log({item})}
          activeTab={activeTab} onChange={tabOnChangeHandler}
        />
      </div>
    </div>
  )
}

export default AdminUserDetailTopSection