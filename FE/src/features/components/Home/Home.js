import React from "react";
import Banner from "./Banner/Banner";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import ListCategories from "./ListCategories/ListCategories";
import ListJobs from "./ListJobs/ListJobs";
import Menu from "./Menu/Menu";
export default function Home() {
  return (
    <div>
      <Menu />
      <Banner />
      <ListJobs />
      <ListCategories />
      <Contact />
      <Footer />
    </div>
  );
}
