import { QuestionCircleOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { Pagination, Popconfirm, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import workApi from "../../../../../api/workApi";
import { formatDateWork } from "../../../../container/Functionjs";
import SpinLoad from "../../../Spin/Spin";
import EditJobForm from "../EditJob/EditJob";

export default function Jobs({ id, heard, hident }) {
  const [data, setData] = useState();
  const [state, setState] = useState({
    page: localStorage.getItem("pageWorkHomeInfor") || 1,
  });
  const { page } = state;
  const [loadEffect, setLoadEffect] = useState(false);

  const [editingJobId, setEditingJobId] = useState(null); // 👈 Dùng để hiện form sửa

  const getApi = async () => {
    const response = await workApi.getAllId({ page, id });
    setData(response);
  };

  useEffect(() => {
    localStorage.setItem("pageWorkHomeInfor", page);
    getApi();
  }, [page, loadEffect]);

  const hangdleDelete = async (e) => {
    await workApi.deletework(e);
    setLoadEffect(!loadEffect);
  };

  const handleSubmit = async (formData) => {
    await workApi.editwork(formData);
    setEditingJobId(null); // 👈 đóng form sửa
    setLoadEffect(!loadEffect); // reload danh sách
    message.success("Đã lưu!");
  };

  const handleCancel = () => {
    setEditingJobId(null); // 👈 đóng modal khi hủy
  };

  return (
    <div className="ListJob">
      {/* Hiện Modal khi có jobId đang sửa */}
      <Modal
        open={!!editingJobId}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={800}
      >
        {editingJobId && (
          <EditJobForm
            id={editingJobId}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </Modal>
      <>
          {heard && (
            <div className="heading">
              <div className="heading__title">
                <h3>Việc đã đăng</h3>
              </div>
              <div className="heading__hr"></div>
            </div>
          )}

          <div className="content">
            <div className="row">
              {!data ? (
                <SpinLoad />
              ) : (
                data.data.rows.map((ok) => (
                  <div className="col-lg-12" key={ok.id}>
                    <div className="job__box mb-3">
                      {!hident && (
                        <>
                          <Popconfirm
                            title="Bạn có muốn xoá？"
                            onConfirm={() => hangdleDelete(ok.id)}
                            icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                          >
                            <div className="btn-delete-job">Xoá Công việc</div>
                          </Popconfirm>
                          <Button
                            type="link"
                            className="btn-edit-job"
                            onClick={() => setEditingJobId(ok.id)}
                          >
                            Sửa Công việc
                          </Button>
                        </>
                      )}

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
                          <div className="job__detail--deadline outSize">
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
              {data && data.data.count > 0 && (
                <div className="pagination">
                  <Pagination
                    current={parseInt(page)}
                    total={data.data.count}
                    pageSize={10}
                    onChange={(newPage) => setState({ page: newPage })}
                  />
                </div>
              )}
            </div>
          </div>
        </>
    </div>
  );
}
