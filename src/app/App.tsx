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
import "../css/app.css";
import "../css/navbar.css"
import "../css/footer.css"
import AuthenticationModal from "./components/auth";



function App() {
  const location = useLocation();
  const {setAuthMember} = useGlobals();
  const {cartItems, onAdd, onRemove, onDelete, onDeleteAll,} = useBasket();
  const [ signupOpen, setSignupOpen ] = useState<boolean>(false);
  const [ loginOpen, setLoginOpen ] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose =() => setLoginOpen(false);

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
    setSignupOpen,
    setLoginOpen,
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
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}

export default App;