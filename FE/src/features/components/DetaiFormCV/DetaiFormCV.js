import React, { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Footer from "../Home/Footer/Footer";
import MenuNotHome from "../MenuNotHome/MenuNotHome";
import { useParams } from "react-router";
import formCVApi from "../../../api/formCVApi";
import CV from "./CV/CV";
export default function DetaiFormCV() {
  const { id } = useParams();
  const [data, setData] = useState();
  const getApi = async () => {
    return await formCVApi.getOne(id).then((data) => {
      setData(data);
    });
  };
  console.log(data);
  useEffect(() => {
    getApi();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <MenuNotHome /> */}
      <Breadcrumb name={data ? data.name : ""} />
      <CV data={data} />
      <Footer />
    </div>
  );
}
