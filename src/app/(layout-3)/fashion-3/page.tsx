import { Metadata } from "next";
import FashionThreePageView from "pages-sections/fashion-3/page-view";

export const metadata: Metadata = {
  title: "Fashion 3 - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function FashionShopThree() {
  return <FashionThreePageView />;
}
