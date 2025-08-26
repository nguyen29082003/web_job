import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userData } from "../../../admin/Slice/userSlice";
import "../../../scss/Candidates/Candidates.scss";
import SpinLoad from "../../Spin/Spin";
export default function ListCandidates() {
  const users = useSelector((state) => state.users.user.data);
  const loading = useSelector((state) => state.users.loading);
  const [state, setState] = useState({
    page: localStorage.getItem("pageUserHome") || 1,
  });
  const { page } = state;
  const dispatch = useDispatch();
  const actionResult = async (page) => {
    await dispatch(userData(page));
  };
  useEffect(() => {
    localStorage.setItem("pageUserHome", page);
    actionResult({ page: page, status: 1 });
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <div className="listCandidates">
      <div className="heading">
        <div className="heading__title">
          <h3>Ứng viên</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="container">
        <div className="row">
          {loading ? (
            <SpinLoad />
          ) : (
            users.rows.map((data) => (
              <div className="col-md-3 ">
                <div className="candidate__box">
                  <div className="candidate__box__img">
                    <img src={data.avatar} alt="" />
                  </div>
                  <div className="candidate__box__name">{data.name}</div>
                  <div className="candidate__box__job">Thiết kế website</div>
                  <div className="candidate__box__address">{data.address}</div>
                  <div className="candidate__box__viewProfile">
                    <Link to={`/candidates/${data.id}`}>Xem hồ sơ</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {loading ? (
          <SpinLoad />
        ) : (
          <div className="pagination">
            <Pagination defaultCurrent={page} total={users.count} />
          </div>
        )}
      </div>
    </div>
  );
}
