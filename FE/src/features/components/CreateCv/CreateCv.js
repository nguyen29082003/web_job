import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formCVData } from "../../admin/Slice/formCVSlice";
import Footer from "../Home/Footer/Footer";
import MenuNotHome from "../MenuNotHome/MenuNotHome";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import ListCV from "./ListCV/ListCV";
export default function CreateCv() {
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(formCVData({ status: 1 }));
  };
  const formCVs = useSelector((state) => state.formCVs.formCV.data);
  const loading = useSelector((state) => state.formCVs.loading);
  useState(() => {
    actionResult();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <MenuNotHome /> */}
      <Breadcrumb />
      <ListCV data={formCVs} loading={loading} />
      <Footer />
    </div>
  );
}
