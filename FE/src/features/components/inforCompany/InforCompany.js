import React, { useEffect, useState } from "react";
import checkLoginApi from "../../../api/checkLogin";
import MenuNotHome from "../MenuNotHome/MenuNotHome";
import SpinLoad from "../Spin/Spin";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Tabs from "./Tabs/Tabs";
import Footer from "../Home/Footer/Footer";
export default function InforCompany() {
  const [user, setUser] = useState();
  useEffect(() => {
    checkLoginApi.checkLogin().then((ok) => {
      setUser(ok.data.user);
    });
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {!user ? (
        <SpinLoad />
      ) : (
        <div>
          <MenuNotHome />
          <Breadcrumb name={user.name} />
          <Tabs id={user.id} />
        </div>
      )}
      <Footer />
    </div>
  );
}
