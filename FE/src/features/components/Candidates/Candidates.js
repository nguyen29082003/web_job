import React from "react";
import Footer from "../Home/Footer/Footer";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import ListCandidates from "./ListCandidates/ListCandidates";
import MenuNotHome from "../MenuNotHome/MenuNotHome";
export default function Candidates() {
  return (
    <div>
      <MenuNotHome/>
      <Breadcrumb />
      <ListCandidates />
      <Footer />
    </div>
  );
}
