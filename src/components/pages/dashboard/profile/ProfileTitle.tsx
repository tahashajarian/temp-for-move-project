import {useEffect} from "react";
import {useUserDetailContext} from "../../../../contexts/AdminUserDetailContext";

function ProfileTopSection(props: { title: string }) {
  const {fetchUserDetail} = useUserDetailContext();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="flex items-center py-4 space-x-reverse space-x-1 px-3">
        <span className="text-lg font-bold">{props.title}</span>
      </div>

      <div className="mx-4"></div>
    </div>
  );
}

export default ProfileTopSection;
