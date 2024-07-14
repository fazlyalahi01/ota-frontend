import Link from "next/link";
import { useState } from "react";
// MUI
import IconButton from "@mui/material/IconButton";
// TRANSLATION
import { useTranslation } from "react-i18next";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Remove from "@mui/icons-material/Remove";
import Twitter from "@mui/icons-material/Twitter";
// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import { Span } from "components/Typography";
// STYLED COMPONENTS
import { StyledChip, StyledContainer, StyledRoot } from "./styles";

// ==============================================================
interface LanguageOption {
  [key: string]: { title: string; value: string };
}
// ==============================================================

// LANGUAGE OPTIONS
const languageOptions: LanguageOption = {
  en: { title: "EN", value: "en" },
  es: { title: "DE", value: "de" }
};

const socialLinks = [
  { id: 1, Icon: Twitter, url: "#" },
  { id: 2, Icon: Facebook, url: "#" },
  { id: 3, Icon: Instagram, url: "#" }
];

// ===========================================
type Props = { bgColor?: string };
// ===========================================

export default function Topbar({ bgColor }: Props) {
  const { i18n, t } = useTranslation();
  const [expand, setExpand] = useState<boolean>(false);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <StyledRoot bgColor={bgColor} expand={expand ? 1 : 0}>
      <StyledContainer>
        <FlexBetween width="100%">
          <FlexBox alignItems="center" gap={1}>
            <StyledChip label={t("HOT")} size="small" />
            <Span className="title">{t("Free Express Shipping")}</Span>
          </FlexBox>

          <IconButton disableRipple className="expand" onClick={() => setExpand((state) => !state)}>
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </FlexBetween>

        <FlexBox className="topbarRight" alignItems="center">         

          {/* SOCIAL LINKS AREA */}
          <FlexBox alignItems="center" gap={1.5}>
            {socialLinks.map(({ id, Icon, url }) => (
              <Link href={url} key={id}>
                <Icon sx={{ fontSize: 16 }} />
              </Link>
            ))}
          </FlexBox>
        </FlexBox>
      </StyledContainer>
    </StyledRoot>
  );
}
