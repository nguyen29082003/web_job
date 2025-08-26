import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../scss/CreateCV/ListCV.scss";
import SpinLoad from "../../Spin/Spin";
import { Link } from "react-router-dom";
import { message } from "antd";
import checkLoginApi from "../../../../api/checkLogin";

export default function ListCV({ data, loading }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await checkLoginApi.checkLogin();
        if (response.data.user.type === "user") {
          setUser(response.data.user.id);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra đăng nhập:", error);
      }
    };
    fetchUser();
  }, []);

  const onClickInforCV = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/inforCV");
    } else {
      message.warning("Bạn chưa đăng nhập tài khoản người dùng!");
    }
  };

  return (
    <div className="listCv">
      <div className="heading">
        <div className="heading__title">
          <h3>Tạo CV</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="div-btn-cv">
        <button className="btn-infor-cv" onClick={onClickInforCV}>
          Điền thông tin CV
        </button>
      </div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-3">Tìm kiếm</div>
          <div className="col-md-8">
            <div className="row">
              {loading ? (
                <SpinLoad />
              ) : (
                data.rows.map((ok) => (
                  <div key={ok.id} className="col-md-4 d-flex">
                    <Link to={`/detaiFormCV/${ok.id}`}>
                      <div className="box">
                        <div className="box-img">
                          <img src={ok.avatar} alt="" />
                        </div>
                        <div className="box-tag">
                          {ok.Tags.map((oki) => (
                            <p key={oki.name}>{oki.name}</p>
                          ))}
                        </div>
                        <div className="box-name">
                          <p>{ok.name}</p>
                        </div>
                        <div className="box-color">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="color"></div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
