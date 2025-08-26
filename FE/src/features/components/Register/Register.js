import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "../../scss/Register/Register.scss";
import RegisterCompany from "./RegisterCompany";
import RegisterUser from "./RegisterUser";
export default function Register() {
  const UserEl = useRef(null);
  const CompanyEl = useRef(null);

  const [check, setCheck] = useState(1);
  const onClickBtn = (e) => {
    var $ = document.querySelector.bind(document);
    const name = e.current.id;
    const user = $("#user");
    const company = $("#company");
    if (name === "user") {
      user.classList.add("active");
      company.classList.remove("active");
      setCheck(1);
    } else {
      company.classList.add("active");
      user.classList.remove("active");
      setCheck(0);
    }
  };
  return (
    <div className="register">
      <div className="login__title">
                      <Link to="/" className="login__title__link">Việc làm tốt</Link>
                  </div>
      <div className="register__box">
        <div className="line__register"></div>
        <div className="register__box__left">
          <div className="register__box__left--account">
            <button
              className="account active"
              onClick={() => onClickBtn(UserEl)}
              ref={UserEl}
              id="user"
            >
              Tài khoản người dùng
            </button>
            <button
              className="account"
              onClick={() => onClickBtn(CompanyEl)}
              ref={CompanyEl}
              id="company"
            >
              Tài khoản công ty
            </button>
          </div>
          {check === 1 ? <RegisterUser /> : <RegisterCompany />}
        </div>
        <div className="register__box__right">
          <div className="right">
            {/* <div className="register__box__right__text">Hoặc đăng nhập với</div>
            <button className="fb">Đăng nhập với facebook</button>
            <button className="in">Đăng nhập với instagram</button> */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
