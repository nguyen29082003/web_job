import React from "react";
import { useLocation } from "react-router-dom";
import Menu from "../Home/Menu/Menu";

export default function CheckMenu() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const HidenMenu = () => {
    return <div></div>;
  };

  return <>{isHome ? <Menu /> : <HidenMenu />}</>;
}
