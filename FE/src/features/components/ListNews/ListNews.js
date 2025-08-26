import React from "react";
import Footer from "../Home/Footer/Footer";
import Menu from "../MenuNotHome/MenuNotHome";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import News from "./News/News";
export default function ListNews() {
  return (
    <div>
      {/* <Menu /> */}
      <Breadcrumb />
      <News />
      <Footer />
    </div>
  );
}
