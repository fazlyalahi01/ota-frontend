import { Metadata } from "next";
import { PaymentMethodsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";

export const metadata: Metadata = {
  title: "Payment Methods - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function PaymentMethods() {
  return <PaymentMethodsPageView />;
}
