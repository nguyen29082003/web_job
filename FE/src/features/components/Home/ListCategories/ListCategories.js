import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { typeWorkData } from "../../../admin/Slice/typeWorkSlice";
import { GetCategoryHome } from "../../../container/Functionjs";
import "../../../scss/Home/ListCategories.scss";
import SpinLoad from "../../Spin/Spin";
import parse from "html-react-parser";

export default function ListCategories() {
  const dispatch = useDispatch();
  const typework = useSelector((state) => state.typeWorks.typeWork.data);
  const loading = useSelector((state) => state.typeWorks.loading);

  useEffect(() => {
    dispatch(typeWorkData({ status: 1 }));
  }, [dispatch]);

  return (
    <div className="categori">
      <div className="container">
        <div className="heading">
          <div className="heading__title">
            <h3>Chọn việc theo ngành</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="row">
          {loading ? (
            <SpinLoad />
          ) : (
            GetCategoryHome(typework).map((ok, index) => (
              <div className="col-lg-3 col-md-4 col-sm-12" key={index}>
                <Link
                  to={`/jobs?typeWork=${encodeURIComponent(ok.id)}`}
                  className="categori__link"
                >
                  <div className="categori__box">
                    <div className="categori__title">{ok.name}</div>
                    <div className="categori__icon">
                      {ok.icon ? parse(ok.icon) : ""}
                    </div>
                    <div className="categori__total">
                      {ok.length} công việc
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
