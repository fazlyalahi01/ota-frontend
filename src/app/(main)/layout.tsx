import { Box } from "@mui/material";
import ShopLayout1 from "components/layouts/shop-layout-1";
import { PropsWithChildren } from "react";

export default function Layout1({ children }: PropsWithChildren) {
  return <ShopLayout1>{children}</ShopLayout1>;
}
