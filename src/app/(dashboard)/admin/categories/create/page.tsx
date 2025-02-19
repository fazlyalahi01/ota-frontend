import { Metadata } from "next";
import { CreateCategoryPageView } from "pages-sections/vendor-dashboard/categories/page-view";

export const metadata: Metadata = {
  title: "Create Category - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function CreateCategory() {
  return <CreateCategoryPageView />;
}
