import { useState } from "react";
// MUI
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
// GLOBAL CUSTOM COMPONENTS
import { H6, Small } from "components/Typography";
import useAuth from "hooks/useAuth";
import Link from "next/link";

// STYLED COMPONENT
const Divider = styled("div")(({ theme }) => ({
    margin: "0.5rem 0",
    border: `1px dashed ${theme.palette.grey[200]}`
}));

export default function ProfilePopover() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { userInfo: { user }, isLogin, logout } = useAuth();


    const handleClose = () => setAnchorEl(null);

    return (
        <div>
            <IconButton
                sx={{ padding: 0 }}
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-expanded={open ? "true" : undefined}
                aria-controls={open ? "account-menu" : undefined}>
                <Avatar alt="Remy Sharp" src="/assets/images/avatars/001-man.svg" />
            </IconButton>

            <Menu
                open={open}
                id="account-menu"
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            mt: 1,
                            boxShadow: 2,
                            minWidth: 200,
                            borderRadius: "8px",
                            overflow: "visible",
                            border: "1px solid",
                            borderColor: "grey.200",
                            "& .MuiMenuItem-root:hover": {
                                backgroundColor: "grey.200"
                            },
                            "&:before": {
                                top: 0,
                                right: 14,
                                zIndex: 0,
                                width: 10,
                                height: 10,
                                content: '""',
                                display: "block",
                                position: "absolute",
                                borderTop: "1px solid",
                                borderLeft: "1px solid",
                                borderColor: "grey.200",
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)"
                            }
                        }
                    }
                }}>
                {isLogin ? (
                    <>
                        <Box px={2} pt={1}>
                            <H6 style={{ textTransform: 'capitalize' }}>{user?.first_name}</H6>
                            <Small >{user?.email}</Small> <br />
                            <Small color="grey.500">Admin</Small>
                        </Box>

                        <Divider />
                        <MenuItem>
                            <Link href="/property/dashboard">
                                Dashboard
                            </Link>
                        </MenuItem>
                        <MenuItem href="/dashboard">Profile</MenuItem>
                        <Divider />
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </>
                ) : (
                    <>
                        <Box px={2} pt={1}>
                            <H6 style={{ textTransform: 'capitalize' }}>Hey Guest</H6>
                            <Small >Login & Get exclusive deals</Small> <br />
                            <Divider />
                            <MenuItem href="/login">
                                <Link href="/login">Login</Link>
                            </MenuItem>
                        </Box>
                    </>
                )}
            </Menu>
        </div>
    );
}
