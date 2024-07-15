import ShopLayout1 from "components/layouts/shop-layout-1";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <ShopLayout1>{children} </ShopLayout1>
}
