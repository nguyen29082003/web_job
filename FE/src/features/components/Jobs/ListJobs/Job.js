import { Pagination, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { workData } from "../../../admin/Slice/workSlice";
import { typeWorkData } from "../../../admin/Slice/typeWorkSlice";
import { formatDateWork } from "../../../container/Functionjs";
import "../../../scss/SearchJobs/ListJob.scss";
import SpinLoad from "../../Spin/Spin";
import KeyTag from "./KeyTag";

export default function Job({
  searchData,
  onTime,
  onAmout,
  amount,
  onSalary,
  onExp,
  salary,
  time,
  typeWorkValue,
  onTypeWork,
}) {
  const dispatch = useDispatch();
  const work = useSelector((state) => state.works.work.data);
  const loading = useSelector((state) => state.works.loading);
  const typework = useSelector((state) => state.typeWorks.typeWork.data);

  const [state, setState] = useState({
    page: localStorage.getItem("pageWorkHome") || 1,
  });
  const { page } = state;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeWorkIdFromUrl = queryParams.get("typeWork");

  useEffect(() => {
    if (typeWorkIdFromUrl) {
      onTypeWork(typeWorkIdFromUrl); // Set loại công việc khi có typeWorkId trên URL
    }
  }, []);

  const onChangePage = (page) => {
    setState({ page });
  };

  const actionResult = (page) => {
    dispatch(workData(page));
    dispatch(typeWorkData({ status: 1 }));
  };

  useEffect(() => {
    localStorage.setItem("pageWorkHome", page);
    actionResult({ page: page, status: 1 });
  }, [page]);

  const resetBoxExp = () => {
    const boxExpEl = document.querySelectorAll("#box-exp>.box");
    boxExpEl.forEach((box) => box.classList.remove("active"));
  };

  useEffect(() => {
    const boxExpEl = document.querySelectorAll("#box-exp>.box");
    boxExpEl.forEach((box) => {
      box.onclick = function () {
        if (!box.className.includes("active")) {
          resetBoxExp();
          onExp(box.id);
          box.classList.add("active");
        }
      };
    });
  }, []);

  const onChangeTime = (e) => {
    onTime(e.target.value);
  };

  const onChangeTypeWork = (e) => {
    onTypeWork(+e.target.value !== 0 ? e.target.value : "");
  };

  const onChangeAmount = (e) => {
    onAmout(e.target.value);
  };

  const onChangeSalary = (e) => {
    onSalary(e.target.value);
  };
  const isNewJob = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diff = (now - created) / (1000 * 60 * 60 * 24);
    return diff <= 20;
  };

  return (
    <div className="ListJobSearch">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="filter-exp">
              <div className="title">Kinh nghiệm:</div>
              <div className="box-exp" id="box-exp">
                <div className="box" id="1">Không cần kinh nghiệm</div>
                <div className="box" id="2">1 - 3 năm</div>
                <div className="box" id="3">3 - 5 năm</div>
                <div className="box" id="4">5 - 10 năm</div>
                <div className="box" id="5">trên 10 năm</div>
                <div className="box" id="0">Tất cả</div>
              </div>
            </div>

            {searchData === "" ? (
              loading ? (
                <SpinLoad />
              ) : (
                work?.rows?.map((data, index) => (
                  <div className="job__box" key={index}>
                    <div className="job__tag">{isNewJob(data.createdAt) ? "new" : "hot"}</div>
                    <div className="job__logo">
                      <img src={data.Company.avatar} alt="" />
                    </div>
                    <div className="job__content">
                      <div className="job__title">
                        <Link to={`/jobs/work/${data.id}`}>
                          <h4 className="jobTitle" title={data.name}>
                            {data.name}
                          </h4>
                        </Link>
                      </div>
                      <div className="job__nameCompany">
                        <Link to={`/jobs/work/${data.id}`}>
                          <span>{data.Company.name}</span>
                        </Link>
                      </div>
                      <div className="job__detail">
                        <div className="job__detail--address">
                          <div className="job__icon"><i className="fas fa-map-marker-alt"></i></div>
                          <span>{data.address}</span>
                        </div>
                        <div className="job__detail--deadline outSize">
                          <div className="job__icon"><i className="far fa-clock"></i></div>
                          <span>{formatDateWork(data.dealtime)}</span>
                        </div>
                        <div className="job__detail--salary">
                          <div className="job__icon"><i className="fas fa-dollar-sign"></i></div>
                          <span>{data.price1} - {data.price2} Triệu VNĐ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : (
              searchData?.rows?.map((data, index) => (
                <div className="job__box" key={index}>
                  <div className="job__tag">{isNewJob(data.createdAt) ? "new" : "hot"}</div>
                  <div className="job__logo">
                    <img src={data.Company.avatar} alt="" />
                  </div>
                  <div className="job__content">
                    <div className="job__title">
                      <Link to={`/jobs/work/${data.id}`}>
                        <h4 className="jobTitle" title={data.name}>
                          {data.name}
                        </h4>
                      </Link>
                    </div>
                    <div className="job__nameCompany">
                      <Link to={`/jobs/work/${data.id}`}>
                        <span>{data.Company.name}</span>
                      </Link>
                    </div>
                    <div className="job__detail">
                      <div className="job__detail--address">
                        <div className="job__icon"><i className="fas fa-map-marker-alt"></i></div>
                        <span>{data.address}</span>
                      </div>
                      <div className="job__detail--deadline outSize">
                        <div className="job__icon"><i className="far fa-clock"></i></div>
                        <span>{formatDateWork(data.dealtime)}</span>
                      </div>
                      <div className="job__detail--salary">
                        <div className="job__icon"><i className="fas fa-dollar-sign"></i></div>
                        <span>{data.price1} - {data.price2} Triệu VNĐ</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {searchData === "" ? (
              loading ? (
                <SpinLoad />
              ) : (
                <div className="pagination">
                  <Pagination
                    defaultCurrent={page}
                    onChange={onChangePage}
                    total={work.count}
                  />
                </div>
              )
            ) : (
              ""
            )}
          </div>

          <div className="col-md-4">
            <div className="box__filter">
              <div className="filter--title"><p>Mức lương</p></div>
              <div className="filter__content">
                <Radio.Group onChange={onChangeSalary} value={salary}>
                  <Radio className="mb-1" value="0">Tất cả</Radio><br />
                  <Radio className="mb-1" value="1">Dưới 5 triệu</Radio><br />
                  <Radio className="mb-1" value="2">5 - 10 triệu</Radio><br />
                  <Radio className="mb-1" value="3">10 - 15 triệu</Radio><br />
                  <Radio value="4">Trên 15 triệu</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="box__filter">
              <div className="filter--title"><p>Thời gian làm việc</p></div>
              <div className="filter__content">
                <Radio.Group onChange={onChangeTime} value={time}>
                  <Radio className="mb-1" value="0">Tất cả</Radio><br />
                  <Radio className="mb-1" value="Full Time">Full Time</Radio><br />
                  <Radio value="Part Time">Part Time</Radio><br />
                  <Radio value="Remote">Remote</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="box__filter">
              <div className="filter--title"><p>Loại công việc</p></div>
              <div className="filter__content">
                <Radio.Group onChange={onChangeTypeWork} value={typeWorkValue}>
                  <Radio className="mb-1" value="">Tất cả</Radio><br />
                  {typework?.rows?.map((data) => (
                    <React.Fragment key={data.id}>
                      <Radio className="mb-1" value={data.id}>{data.name}</Radio><br />
                    </React.Fragment>
                  ))}
                </Radio.Group>
              </div>
            </div>

            {/* <KeyTag /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
