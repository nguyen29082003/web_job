import React from "react";
import { useLocation } from "react-router-dom";
import Mn from "./Mn";
import "./menujs";

export default function ListMenu() {
  const location = useLocation();
  const checkMenu = location.pathname === "/"; // Kiểm tra nếu đang ở trang chủ

  return (
    <div>
      <Mn className={`menu ${checkMenu ? "" : "notMenu"}`} />
    </div>
  );
}
