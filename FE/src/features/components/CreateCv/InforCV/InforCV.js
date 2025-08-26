import React, { useState } from "react";
import MenuNotHome from "../../MenuNotHome/MenuNotHome";
import Footer from "../../Home/Footer/Footer";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import InputFormCV from "./InputFormCV";
import { Validators } from "./Validator";
import JoditEditor from "jodit-react";
export default function InforCV() {
  const [target, setTarget] = useState();
  const [education, setEducation] = useState();
  const [prize, setPrize] = useState();
  const [certificate, setCertificate] = useState();
  const [presenters, setPresenters] = useState();
  const [experience, setExperience] = useState();
  const [moreInformation, setMoreInformation] = useState();
  const [activate, setActivate] = useState();
  // const handelOnChange = (e) => {
  //     console.log(e);
  //     setvalue(e)
  // }
  return (
    <div>
      <MenuNotHome />
      <Breadcrumb />
      <div className="heading">
        <div className="heading__title">
          <h3>Điền thông tin CV</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="container">
        {/* <InputFormCV
            onChange={handelOnChange}
            validators={[{ check: Validators.number, message: "Số" },
            { check: Validators.required, message: "Bạn chưa nhập thông tin!" }]}
            value={value}
            placeholder="hihi"
            type="number"
            helpText="cái này để nhập input"
            label="huhu" /> */}
        <div className="mt-3">
          <label htmlFor="">Mục tiêu nghề nghiệp</label>
          <JoditEditor
            value={target}
            tabIndex={1}
            onChange={(e) => setTarget(e)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="">Học tập</label>
          <JoditEditor
            value={education}
            tabIndex={1}
            onChange={(e) => setEducation(e)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="">Kinh Nghiệm</label>
          <JoditEditor
            value={experience}
            tabIndex={1}
            onChange={(e) => setExperience(e)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="">Hoạt động</label>
          <JoditEditor
            value={activate}
            tabIndex={1}
            onChange={(e) => setActivate(e)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="">Người tham chiếu</label>
          <JoditEditor
            value={presenters}
            tabIndex={1}
            onChange={(e) => setPresenters(e)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="">Chứng chỉ</label>
          <JoditEditor
            value={certificate}
            tabIndex={1}
            onChange={(e) => setCertificate(e)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="">Thông tin thêm</label>
          <JoditEditor
            value={moreInformation}
            tabIndex={1}
            onChange={(e) => setMoreInformation(e)}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
