import {Types} from "../../../../types/types";
import DashboardContainer from "./DashboardContainer";

type Props = {
  children: Types["children"];
  filterSection?: Types["children"];
  title: string;
};

function DashboardMainLayout({children, filterSection, title}: Props) {
  return (
    <DashboardContainer>
      <div className="w-full flex flex-col py-3 px-4 flex- space-y-4">
        <div className="text-gray-900 font-bold text-lg">{title}</div>
        {filterSection && <div>{filterSection}</div>}
      </div>
      <div className="w-full">{children}</div>
    </DashboardContainer>
  )
}

export default DashboardMainLayout