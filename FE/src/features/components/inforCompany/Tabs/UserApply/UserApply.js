import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import workApplyApi from "../../../../../api/workApplyApi";
import "../../../../scss/inforCompany/UserApply.scss";
import { Popover } from "antd";
import SpinLoad from "../../../Spin/Spin";

export default function UserApply({ id }) {
  const [data, setData] = useState();

  const getApi = async () => {
    await workApplyApi.checkWorkApply(id).then((data) => {
      setData(data.Works);
    });
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="userApply">
      <div className="heading">
        <div className="heading__title">
          <h3>Ứng viên ứng tuyển</h3>
        </div>
        <div className="heading__hr"></div>
      </div>

      <div className="content">
        {!data ? (
          <SpinLoad />
        ) : (
          data.map((ok) => (
            <div className="content___box" key={ok.id}>
              <div className="content___box--title">
                <Link to={`/jobs/work/${ok.id}`} className="text-dark">
                  {ok.name}
                </Link>
              </div>
              <div className="hr"></div>
              <div className="content___box---user">
                <div className="row">
                  {ok.workapply2.length === 0 ? (
                    <p className="text-danger">Chưa có ứng viên ứng tuyển</p>
                  ) : (
                    ok.workapply2.map((oki) => (
                      <div className="col-md-12" key={oki.id}>
                        <Link to={`/candidates/${oki.id}`} className="candidate-link">
                          <div className="d-flex">
                            <div className="content___box---user---img">
                              <img src={oki.avatar} title={oki.name} width={150} />
                            </div>
                            <div className="content___box---user---infor position-relative">
                              <table>
                                <tbody>
                                  <tr>
                                    <td className="td">Tên người dùng</td>
                                    <td>{oki.name}</td>
                                  </tr>
                                  <tr>
                                    <td className="td">Địa chỉ</td>
                                    <td>{oki.address}</td>
                                  </tr>
                                  <tr>
                                    <td className="td">Email</td>
                                    <td>{oki.email}</td>
                                  </tr>
                                  <tr>
                                    <td className="td">Điện thoại</td>
                                    <td>{oki.phone}</td>
                                  </tr>
                                  <tr>
                                    <td className="td">Giới tính</td>
                                    <td>{oki.male}</td>
                                  </tr>
                                </tbody>
                              </table>

                              {oki.WorkApplies.link && (
                                <button
                                  className="btn-link"
                                  onClick={(e) => {
                                    e.preventDefault(); // ngăn chuyển trang khi bấm nút
                                    window.open(oki.WorkApplies.link, "_blank");
                                  }}
                                >
                                  Xem CV
                                </button>
                              )}

                              <Popover content={oki.WorkApplies.message} title="Lời nhắn">
                                <button
                                  className="btn-message"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-comment-dots"></i>
                                </button>
                              </Popover>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
