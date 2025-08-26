import React from "react";
import { Link } from "react-router-dom";
import "../../../scss/Home/Footer.scss";

export default function Footer() {
  const contact = {
    description: "Trang web cung cấp các khóa học lập trình, thiết kế và công nghệ mới nhất.",
    address: "16/6 Ngô Sĩ Liên,Đà nẵng",
    phone: "0362 102 062",
    email: "nguyen29082003@gmail.com",
  };

  const socialNetworks = [
    { id: 1, name: "Facebook", link: "https://facebook.com", color: "#1877F2", icon: "fab fa-facebook-f" },
    { id: 2, name: "Twitter", link: "https://twitter.com", color: "#1DA1F2", icon: "fab fa-twitter" },
    { id: 3, name: "Instagram", link: "https://instagram.com", color: "#E4405F", icon: "fab fa-instagram" },
    { id: 4, name: "LinkedIn", link: "https://linkedin.com", color: "#0077B5", icon: "fab fa-linkedin-in" },
  ];

  const chuyentrang = (url) => {
    window.open(url);
  };

  return (
    <div className="footer">
      <div className="container-footer">
        <div className="row justify-content-center">
          <div className="col-lg-3">
            <div className="footer__box">
              <div className="footer__title">
                <h3>Giới thiệu</h3>
              </div>
              <div className="footer__content">
                <div className="about">
                  <span>{contact.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer__box">
              <div className="footer__title">
                <h3>Liên lạc với chúng tôi</h3>
              </div>
              <div className="footer__content">
                <div className="footer__content--location">
                  <div className="location--title text-white">Địa chỉ :</div>
                  <div className="location--content">{contact.address}</div>
                </div>
                <div className="footer__content--contact">
                  <div className="contact--title text-white pt-3">Liên hệ :</div>
                  <div className="contact--content">
                    <span>Điện thoại: {contact.phone}</span>
                    <br />
                    <span>Email: {contact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer__box">
              <div className="footer__title">
                <h3>Đường dẫn nhanh</h3>
              </div>
              <div className="footer__content">
                <div className="row">
                  <div className="col-lg-6">
                    <ul>
                      <li><Link to="">Lập trình web</Link></li>
                      <li><Link to="">Thiết kế đồ hoạ</Link></li>
                      <li><Link to="">Trí tuệ nhân tạo</Link></li>
                      <li><Link to="">Mạng máy tính</Link></li>
                      <li><Link to="">Cơ sở dữ liệu</Link></li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul>
                      <li><Link to="">JavaScript</Link></li>
                      <li><Link to="">Python</Link></li>
                      <li><Link to="">Java</Link></li>
                      <li><Link to="">.NET</Link></li>
                      <li><Link to="">HTML, CSS</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="footer__box">
              <div className="footer__title">
                <h3>Mạng xã hội</h3>
              </div>
              <div className="footer__content">
                {socialNetworks.map((network) => (
                  <div key={network.id} title={network.name} onClick={() => chuyentrang(network.link)}>
                    <div
                      className="icon_footer"
                      style={{ background: network.color, cursor: "pointer" }}
                    >
                      <i className={network.icon}></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
