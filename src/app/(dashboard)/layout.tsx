import { PropsWithChildren } from "react";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import ProgressBar from "components/progress/progress";

const Layout = ({ children }: PropsWithChildren) => {
  return <VendorDashboardLayout>
    <ProgressBar />
    {children}
  </VendorDashboardLayout>;
};

export default Layout;
