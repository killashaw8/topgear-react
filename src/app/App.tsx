import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomeNavbar } from "./components/header/HomeNavbar";
import { OtherNavbar } from "./components/header/OtherNavbar";
import ProductsPage from "./screens/productsPage";
import MemberService from "./services/MemberService";
import UserPage from "./screens/userPage";
import OrdersPage from "./screens/ordersPage";
import HelpPage from "./screens/helpPage";
import HomePage from "./screens/homePage";
import Footer from "./components/footer";
import useBasket from "./hooks/useBasket";
import { useGlobals } from "./hooks/useGlobals";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import { T } from "../lib/types/common";
import AuthenticationModal from "./components/auth";
import "../scss/app.scss";
import "../scss/navbar.scss"
import "../scss/footer.scss"



function App() {
  const location = useLocation();
  const {setAuthMember} = useGlobals();
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll,} = useBasket();
  const [authMode, setAuthMode] = useState<"signup" | "login" | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/

  const handleAuthClose = () => setAuthMode(null);

  const handleLogoutClick = (e: T) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  }

  const sharedNavbarProps = {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    openSignup: () => setAuthMode("signup"),
    openLogin: () => setAuthMode("login"),
    anchorEl,
    handleLogoutClick,
    handleCloseLogout,
    handleLogoutRequest,
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar {...sharedNavbarProps} />
      ) : (
        <OtherNavbar {...sharedNavbarProps} />
        )}
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL.
          Always place the root (/) at the end! Otherwise it will freeze at the homepage
          */}
      <Routes>
        <Route path="/products/*" element={<ProductsPage onAdd={onAdd} />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<HomePage openSignup={() => setAuthMode("signup")} />} />
      </Routes>
      <Footer />

      <AuthenticationModal
        authMode={authMode}
        handleClose={handleAuthClose}
      />
    </>
  );
}

export default App;
