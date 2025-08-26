import React, { useEffect, useState } from "react";
import "../../../scss/ListNews/News.scss";
import { Link } from "react-router-dom";
import { Pagination, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { checkDate } from "../../../container/Functionjs";
import { newData } from "../../../admin/Slice/newSlice";
export default function News() {
  const news = useSelector((state) => state.news.new.data);
  const loading = useSelector((state) => state.news.loading);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    page: localStorage.getItem("pageNew") || 1,
  });
  const { page } = state;
  const actionResult = async (page) => {
    await dispatch(newData(page));
  };
  useEffect(() => {
    localStorage.setItem("pageNew", page);
    actionResult({ page: page });
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <div className="News">
      <div className="heading">
        <div className="heading__title">
          <h3>Tin tức</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="news__content">
        <div className="container">
          <div className="row justify-content-center">
            {loading ? (
              <div className="spin">
                <Spin className="mt-5" />
              </div>
            ) : (
              news.rows.map((data) => (
                <div className="col-md-4 d-flex">
                  <div className="new__box">
                    <div className="new__box__img">
                      <img src={data.avatar} alt="" />
                    </div>
                    <div className="new__box__content">
                      <Link to={`/news/detailNew/${data.id}`}>
                        <div className="new__box__content__title">
                          {data.name}
                        </div>
                      </Link>
                      <div className="new__box__content__date">
                        {checkDate(data.createdAt)}
                      </div>
                      <div className="new__box__content__sumary">
                        {data.samary}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {loading ? (
            ""
          ) : (
            <div className="pagination">
              <Pagination defaultCurrent={page} total={news.count} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
