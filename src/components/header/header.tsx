import Link from "next/link";
import { Fragment, ReactNode } from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
// LOCAL CUSTOM HOOKS
import useHeader from "./hooks/use-header";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM COMPONENTS
import MobileHeader from "./components/mobile-header";
import DialogDrawer from "./components/dialog-drawer";
import CategoriesMenu from "./components/categories-menu";
// STYLED COMPONENTS
import { HeaderWrapper, StyledContainer } from "./styles";
import UserProfileButton from "./components/user-profile";

// ==============================================================
interface Props {
  isFixed?: boolean;
  className?: string;
  midSlot: ReactNode;
}
// ==============================================================

export default function Header({ isFixed, className, midSlot }: Props) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = useHeader();

  const CONTENT_FOR_LARGE_DEVICE = (
    <Fragment>
      {/* LEFT CONTENT - LOGO AND CATEGORY */}
      <FlexBox minWidth={100} alignItems="center">
        <Link href="/">
          <LazyImage src={require("../../../public/assets/images/logo-black.png")} alt="logo" />
        </Link>

        {/* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */}
        {isFixed ? <CategoriesMenu /> : null}
      </FlexBox>

      {/*  NAVIGATION */}
      {midSlot}

      {/* LOGIN AND CART BUTTON */}
      <UserProfileButton toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />     
    </Fragment>
  );

  return (
    <HeaderWrapper className={clsx(className)}>
      <StyledContainer>{downMd ? <MobileHeader /> : CONTENT_FOR_LARGE_DEVICE}</StyledContainer>
    </HeaderWrapper>
  );
}
