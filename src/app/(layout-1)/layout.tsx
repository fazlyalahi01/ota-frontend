import { PropsWithChildren } from "react";
import ShopLayout1 from "components/layouts/shop-layout-1";

export default function Layout1({ children }: PropsWithChildren) {
  console.log("shop 1 layout");
  return <ShopLayout1>{children}</ShopLayout1>;
}
