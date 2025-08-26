import { Pagination, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removework, updatework, workData } from "../Slice/workSlice";

export default function Work() {
  const columns = [
    {
      title: "Tên công việc",
      dataIndex: "name",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
  ];

  const work = useSelector((state) => state.works.work.data);
  const loading = useSelector((state) => state.works.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(localStorage.getItem("pagework")) || 1);

  useEffect(() => {
    localStorage.setItem("pagework", page);
    dispatch(workData({ page }));
  }, [page, dispatch]);

  const handleStatus = (status, id) => {
    dispatch(updatework({ status: status === 1 ? 0 : 1, id }));
    setTimeout(() => dispatch(workData({ page })), 500);
  };

  const handleEdit = (id) => {
    navigate(`/admin/editwork/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(removework(id));
    setTimeout(() => dispatch(workData({ page })), 500);
  };

  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>Công việc</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <div>
            <Table
              columns={columns}
              pagination={false}
              dataSource={work.rows?.map((ok, index) => ({
                key: index + 1,
                name: <Link to={`/jobs/work/${ok.id}`}>{ok.name}</Link>,
                status: (
                  <div className="action">
                    <Link onClick={() => handleStatus(ok.status, ok.id)}>
                      {ok.status === 1 ? (
                        <i className="far fa-thumbs-up"></i>
                      ) : (
                        <i className="far fa-thumbs-down"></i>
                      )}
                    </Link>
                  </div>
                ),
              }))}
            />
            <Pagination current={page} onChange={setPage} total={work.count} />
          </div>
        )}
      </div>
    </div>
  );
}
