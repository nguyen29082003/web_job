import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { companyData } from "../../../admin/Slice/companySlice";
import "../../../scss/Companys/Company.scss";
import SpinLoad from "../../Spin/Spin";

export default function Companys() {
  const companys = useSelector((state) => state.companys.company.data);
  const loading = useSelector((state) => state.companys.loading);
  const [state, setState] = useState({
    page: parseInt(localStorage.getItem("pagecompanyHome")) || 1,
  });
  const { page } = state;
  const dispatch = useDispatch();

  const actionResult = async (page) => {
    await dispatch(companyData(page));
  };

  useEffect(() => {
    localStorage.setItem("pagecompanyHome", page);
    actionResult({ page: page, status: 1 });
    window.scrollTo(0, 0);
  }, [page]);

  const handlePageChange = (newPage) => {
    setState({ ...state, page: newPage });
  };

  return (
    <div className="companys">
      <div className="heading">
        <div className="heading__title">
          <h3>Công ty</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="container">
        <div className="row">
          {loading ? (
            <SpinLoad />
          ) : (
            companys?.rows?.map((data) => (
              <div className="col-md-4" key={data.id}>
                <div
                  className="company__box"
                  style={{
                    background: `url(${data.banner}) repeat center`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="company__bg">
                    <div className="company__box__avatar">
                      <img src={data.avatar} alt="" />
                    </div>
                    <div className="company__box__name">{data.name}</div>
                    <div className="company__box__address">
                      <span>{data.address}</span>
                    </div>
                    <div className="company__box__button">
                      <Link to={`/companys/${data.id}`}>Xem thêm</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {!loading && companys?.count && (
            <div className="pagination">
              <Pagination
                current={page}
                total={companys.count}
                pageSize={9}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
