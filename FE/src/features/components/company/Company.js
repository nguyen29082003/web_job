import React from "react";
import Footer from "../Home/Footer/Footer";
import Menu from "../MenuNotHome/MenuNotHome";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Companys from "./Companys/Companys";
export default function Company() {
  return (
    <div>
      <Menu />
      <Breadcrumb />
      <Companys />
      <Footer />
    </div>
  );
}
