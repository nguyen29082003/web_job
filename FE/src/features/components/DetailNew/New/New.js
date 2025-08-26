import React from "react";
import "../../../scss/DetailNew/New.scss";
import logo from "../../../images/logoNew2.png";
import qc from "../../../images/1227.gif";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export default function New(props) {
  const styleFacebook = {
    background: "#3f64ab",
  };
  const styleInstagram = {
    background:
      "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
  };
  const styleTwitch = {
    background: "#1d9ceb",
  };

  return (
    <div className="DetailNew">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="new__box">
              <div className="new__box__content">
                {props.content ? parse(props.content) : ""}
              </div>
              <div className="container">
                <div className="new__box__share">
                  <div className="shareNow">
                    <span>Chia sẻ ngay:</span>
                  </div>
                  <div className="shareIcon">
                    <div className="icon" style={styleFacebook}>
                      <i className="fab fa-facebook-f"></i>
                    </div>
                    <div className="icon" style={styleInstagram}>
                      <i className="fab fa-instagram"></i>
                    </div>
                    <div className="icon" style={styleTwitch}>
                      <i className="fab fa-twitter"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box__recruitment">
              <div className="box__recruitment__title title--detail">
                Việc làm đề xuất cho bạn
              </div>
              <div className="box__recruitment__content">
                {[...Array(2)].map((_, index) => (
                  <div className="box__new" key={index}>
                    <div className="icon__new">
                      <img src={logo} alt="logo" />
                    </div>
                    <div className="content">
                      <div className="content__title">
                        <Link to="">Đổ mực máy in</Link>
                      </div>
                      <div className="content__name">
                        <Link to="">Công ty bảo hiểm nhân thọ Haloca</Link>
                      </div>
                    </div>
                  </div>
                ))}
                <Link to="" className="xemthem">
                  Xem thêm {">>"}
                </Link>
              </div>
            </div>
            <div className="newPost">
              <div className="newPost_box">
                <div className="newPost__box__title title--detail pt-2">
                  Bài viết mới
                </div>
                <div className="newPost__box__content">
                  {[...Array(6)].map((_, index) => (
                    <div className="content__link" key={index}>
                      <Link to="">
                        Làm thế nào để CV của bạn trở thành “chân ái” của nhà
                        tuyển dụng?
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="advertisement">
              <img src={qc} width="100%" alt="quảng cáo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
