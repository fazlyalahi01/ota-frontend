import { Metadata } from "next";
import { PayoutsPageView } from "pages-sections/vendor-dashboard/payouts/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Payouts - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function Payouts() {
  const payouts = await api.payouts();
  return <PayoutsPageView payouts={payouts} />;
}
