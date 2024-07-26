import { Metadata } from "next";
import { CartPageView } from "pages-sections/cart/page-view";

export const metadata: Metadata = {
  title: "Cart - OTA Hole Managements",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Cart() {
  return <CartPageView />;
}
