import { Metadata } from "next";
import PropertyListView from "pages-sections/vendor-dashboard/property/page-view/property-list";


export const metadata: Metadata = {
  title: "Products - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function Products() {
   
  return <PropertyListView />;
}
