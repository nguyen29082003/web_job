import { Avatar, Dropdown, Menu } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import checkLoginApi from "../../../../api/checkLogin";
import {
  checkBar,
  funLine,
  lineSlide,
  openMenu,
} from "../../../container/Functionjs";
import logo from "../../../images/logossss.png";
import "../../../scss/Home/Menu.scss";

export default function Mn(props) {
  const okok = (bar_ref, nav_ref, line_ref) => {
    setTimeout(() => {
      lineSlide();
      openMenu(bar_ref.current);
      funLine();
      checkBar(bar_ref.current, nav_ref.current, line_ref.current);
      window.addEventListener("resize", () => {
        funLine();
        checkBar(bar_ref.current, nav_ref.current, line_ref.current);
      });
    }, 500);
  };

  let { pathname } = useLocation();
  const bar_el = useRef(null);
  const nav_el = useRef(null);
  const line_el = useRef(null);
  const [user, setUser] = useState();

  useEffect(() => {
    checkLoginApi.checkLogin().then((ok) => {
      if(ok.message==='token loi roi'||ok.message=='UN'){
        }else{
          setUser(ok.data.user);
        }
    });

    let idClass = pathname.slice(1);
    let ListMenu = nav_el.current.querySelectorAll(".item");
    let activeItem = nav_el.current.querySelector(".item.active");
    
    if (activeItem) {
      activeItem.classList.remove("active");
    }

    for (let i = 0; i < ListMenu.length; i++) {
      if (ListMenu[i].id === idClass) {
        ListMenu[i].classList.add("active");
      }
    }
  }, []);

  const onLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const items = [
    { key: "0", label: <Link to="/login">Đăng nhập</Link> },
    ...(user ? [{ key: "1", label: <Link to={user.type === "company" ? "/inforCompany" : "/inforUser"}>Thông tin cá nhân</Link> }] : []),
    ...(user ? [{ key: "2", label: <Link to="/" onClick={onLogOut}>Đăng xuất</Link> }] : []),
  ];

  const imgDefault =
    "https://1.bp.blogspot.com/-m3UYn4_PEms/Xnch6mOTHJI/AAAAAAAAZkE/GuepXW9p7MA6l81zSCnmNaFFhfQASQhowCLcBGAsYHQ/s1600/Cach-Lam-Avatar-Dang-Hot%2B%25281%2529.jpg";

  return (
    <div className={props.class || "menu"}>
      <div className="menu__brand">
        <Link to="/">
          <img src={logo} height={35} alt="Logo" />
        </Link>
      </div>
      <div className="menu--right">
        <div className="bar menu__bar" ref={bar_el}>
          <div className="line--top"></div>
          <div className="line--mid"></div>
          <div className="line--bot"></div>
        </div>
        <nav ref={nav_el}>
          <div className="item" id="">
            <Link to="/">Trang chủ</Link>
          </div>
          {/* <div className="item" id="candidates">
            <Link to="/candidates">Ứng viên</Link>
          </div> */}
          <div className="item" id="jobs">
            <Link to="/jobs">Việc làm</Link>
          </div>
          <div className="item" id="companys">
            <Link to="/companys">Nhà tuyển dụng</Link>
          </div>
          <div className="line_slide" ref={line_el}></div>
          {user && (user.role === "admin") && (
            <div className="item">
              <Link to="/admin">Admin</Link>
            </div>
          )}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <span className="nav-link">
              <Avatar size="small" src={user ? user.avatar : imgDefault} />
            </span>
          </Dropdown>
        </nav>
      </div>
    </div>
  );
}
