import { ReactNode } from "react";
import SideNav from "../components/SideNav";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <SideNav>{children}</SideNav>;
};

export default DashboardLayout;
