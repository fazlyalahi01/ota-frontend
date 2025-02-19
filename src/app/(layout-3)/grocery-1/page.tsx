import { Metadata } from "next";
import { GroceryOnePageView } from "pages-sections/grocery-1/page-view";
// API FUNCTIONS
import api from "utils/__api__/grocery-1";

export const metadata: Metadata = {
  title: "Grocery 1 - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function GroceryOne() {
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const popularProducts = await api.getPopularProducts();
  const trendingProducts = await api.getTrendingProducts();
  const grocery1NavList = await api.getGrocery1Navigation();

  return (
    <GroceryOnePageView
      products={products}
      serviceList={serviceList}
      popularProducts={popularProducts}
      grocery1NavList={grocery1NavList}
      trendingProducts={trendingProducts}
    />
  );
}
