import Image from "next/image";
// CUSTOM COMPONENTS
import { H5 } from "components/Typography";
import FlexRowCenter from "components/flex-box/flex-row-center";
// IMPORT IMAGES
import logo from "../../../../public/assets/images/logo-black.png";
import Link from "next/link";

export default function LogoWithTitle() {
  return (
    <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Link href={"/"}>
        <Image src={logo} alt="bazaar" />
      </Link>
      <H5 fontWeight={700}>Welcome To OTA International</H5>
    </FlexRowCenter>
  );
}
