import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "../../../../../api/userApi";
import { formatDateWork } from "../../../../container/Functionjs";
import SpinLoad from "../../../Spin/Spin";

export default function WorkSave({ id }) {
  const [data, setData] = useState();
  const getApi = async () => {
    await userApi.getUserSaveWork(id).then((data) => {
      setData(data.Works);
    });
  };
  useEffect(() => {
    getApi();
  }, []);
  return (
    <div className="ListJob">
      <div className="heading">
        <div className="heading__title">
          <h3>Công việc đã lưu</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <div className="row">
          {!data ? (
            <SpinLoad />
          ) : (
            data.map((ok) => (
              <div className="col-lg-12">
                <div className="job__box mb-3">
                  <div className="job__tag">hot</div>
                  <div className="job__logo">
                    <img src={ok.Company.avatar} alt="" />
                  </div>
                  <div className="job__content">
                    <div className="job__title">
                      <Link to={`/jobs/work/${ok.id}`}>
                        <h4 className="jobTitle">{ok.name}</h4>
                      </Link>
                    </div>
                    <div className="job__nameCompany">
                      <Link to={`/jobs/work/${ok.id}`}>
                        <span>{ok.Company.name}</span>
                      </Link>
                    </div>
                    <div className="job__detail">
                      <div className="job__detail--address">
                        <div className="job__icon">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <span>{ok.address}</span>
                      </div>
                      <div className="job__detail--deadline outSize outSize">
                        <div className="job__icon">
                          <i className="far fa-clock"></i>
                        </div>
                        <span>{formatDateWork(ok.dealtime)}</span>
                      </div>
                      <div className="job__detail--salary">
                        <div className="job__icon">
                          <i className="fas fa-dollar-sign"></i>
                        </div>
                        <span>
                          {ok.price1} - {ok.price2} Triệu VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
