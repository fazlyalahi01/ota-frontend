import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import PersonOutline from "@mui/icons-material/PersonOutline";
// CUSTOM ICON COMPONENT
import ShoppingBagOutlined from "icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
import useAuth from "hooks/useAuth";
import ProfilePopover from "components/main/ProfilePopover";
import { Stack } from "@mui/material";

// ==============================================================
interface Props {
  toggleDialog: () => void;
  toggleSidenav: () => void;
}
// ==============================================================

export default function UserProfileButton({ toggleDialog, toggleSidenav }: Props) {
  const { state } = useCart();
  const { userInfo, isLogin, logout } = useAuth();

  const ICON_COLOR = { color: "grey.600" };

  return (
    <Stack direction="row" spacing={2} alignItems="end" justifyContent="center">
      <ProfilePopover />

      {isLogin && <Badge badgeContent={state.cart.length} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>}
    </Stack>
  );
}
