import React, { useEffect, useState } from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  openSignup: () => void;
  openLogin: () => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void
}

export function OtherNavbar(props: OtherNavbarProps) {
  const { 
    cartItems, 
    onAdd, 
    onRemove, 
    onDelete, 
    onDeleteAll, 
    openSignup,
    openLogin,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  
  const {authMember} = useGlobals();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className={`other-navbar ${isScrolled ? "is-scrolled" : ""}`}>
  <Container className="navbar-container">
    <Stack 
      className="menu"
    >
      <Box>
        <NavLink to="/">
          <img className="brand-logo" src="/img/logo.png"/>
        </NavLink>
      </Box>
      <Stack className="links">
        <Box className={"hover-line"}>
          <NavLink to="/">
            Home
          </NavLink>
        </Box>
        <Box className={"hover-line"}>
          <NavLink 
            to="/products" 
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Products
          </NavLink>
        </Box>
        {authMember ? (
          <Box className={"hover-line"}>
            <NavLink 
              to="/orders" 
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Orders
            </NavLink>
          </Box>
        ) : null}
        {authMember ? (
          <Box className={"hover-line"}>
            <NavLink 
              to="/member-page" 
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              My Page
            </NavLink>
          </Box>
        ) : null}
        <Box className={"hover-line"}>
            <NavLink 
              to="/help" 
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Help
            </NavLink>
        </Box>
        
        <Basket 
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />

        {!authMember ? (
          <Box>
            <Button 
              variant="contained" 
              className="login-button"
              onClick={openLogin}
            >
              Login
            </Button>
          </Box>
        ) : (
          <img className="user-avatar"
            src={
              authMember?.memberImage 
                ? `${serverApi}/${authMember?.memberImage}`
                : "/icons/default-user.svg"
            }
            aria-haspopup={"true"}
            onClick={handleLogoutClick}
          />
        )}

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleCloseLogout}
          onClick={handleCloseLogout}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogoutRequest}>
            <ListItemIcon>
              <Logout fontSize="small" style={{ color: 'blue' }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>  

      </Stack>
    </Stack>
  </Container>
</div>;;
}