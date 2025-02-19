"use client";

import { Fragment, PropsWithChildren, useCallback, useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Footer1 } from "components/footer";
import Header from "components/header/header";
import { MobileNavigationBar } from "components/mobile-navigation";
import NavigationList from "components/navbar/nav-list/nav-list";
import Sticky from "components/sticky";
import Topbar from "components/topbar";

/**
 *  USED IN:
 *  1. MARKET-1, MARKET-2, GADGET, FASHION-1, FASHION-2, FASHION-3, FURNITURE, GROCERY-3, GIFT
 *  2. PRODUCT DETAILS, PRODUCT-SEARCH, ORDER-CONFIRMATION
 *  5. SHOPS, SHOP-DETAILS
 */

export default function ShopLayout1({ children }: PropsWithChildren) {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);
console.log("inside  shop layout 1");
  return (
    <Fragment>
      <Topbar />
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} midSlot={<NavigationList />} />
      </Sticky>
      {children}
      <MobileNavigationBar />
      <Footer1 />
    </Fragment>
  );
}
