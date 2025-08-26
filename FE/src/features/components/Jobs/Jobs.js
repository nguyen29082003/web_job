import React, { useEffect, useState } from "react";
import workApi from "../../../api/workApi";
import { getQueryVariable } from "../../container/Functionjs";
import Footer from "../Home/Footer/Footer";
import ListNew from "../Home/New/ListNew";
import MenuNotHome from "../MenuNotHome/MenuNotHome";
import Breadcrumbs from "./Breadcrumb/Breadcrumb";
import Job from "./ListJobs/Job";
import Search from "./Search/Search";
export default function Jobs() {
  const [state, setState] = useState({
    name: getQueryVariable("name") || "",
    address: getQueryVariable("address") || "",
    data: "",
  });
  const { name, address, data } = state;
  const [time, setTime] = useState("0");
  const [amount, setAmount] = useState("0");
  const [salary, setSalary] = useState("0");
  const [exp, setExp] = useState(0);
  const [typeWorkValue, setTypeWorkValue] = useState(
    +getQueryVariable("typeWordId") || "",
  );
  const hangdelOnChange = (e) => {
    const { name, address } = e;
    setState({
      ...state,
      name: name,
      address: address,
    });
  };
  const onChangeTime = (e) => {
    setTime(e);
  };
  const onChangeAmount = (e) => {
    setAmount(e);
  };
  const onChangeSalary = (e) => {
    setSalary(e);
  };
  const onChangeTypeWork = (e) => {
    setTypeWorkValue(e);
  };
  const onChangeExp = (e) => {
    setExp(e);
  };
  const [page, setPage] = useState(1); // thêm page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ok = await workApi.search({
          name,
          nature: time,
          address,
          status: 1,
          exp,
          salary,
          typeWordId: typeWorkValue,
          page: page, // thêm page vào gọi API
        });
        if (!ok || !ok.data) return;
        setState((prevState) => ({
          ...prevState,
          data: ok.data,
        }));
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };
    fetchData();
  }, [name, address, time, salary, typeWorkValue, exp, page]); // thêm page vào dependency

const onChangePage = (newPage) => {
  setPage(newPage);
};

  
  return (
    <div>
      <MenuNotHome />
      <Breadcrumbs />
      <Search onchange={hangdelOnChange} />
      <Job
        searchData={
          name === "" &&
          address === "" &&
          time === "0" &&
          salary === "0" &&
          exp === 0 &&
          typeWorkValue === ""
            ? ""
            : data
        }
        page={page}
        onChangePage={onChangePage}
        onSalary={onChangeSalary}
        onTime={onChangeTime}
        onExp={onChangeExp}
        time={time}
        amount={amount}
        salary={salary}
        exp={exp}
        typeWorkValue={typeWorkValue}
        onTypeWork={onChangeTypeWork}
      />
      {/* <ListNew /> */}
      <Footer />
    </div>
  );
}
