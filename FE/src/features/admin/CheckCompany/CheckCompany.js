import React, { useEffect, useState } from "react";
import { Button, Pagination, Popconfirm, Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removecheckCompany,
  checkCompanyData,
} from "../Slice/checkCompanySlice";
import { updatecompany } from "../Slice/companySlice";

export default function CheckCompany() {
  const columns = [
    {
      title: "Tên công ty",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Duyệt",
      dataIndex: "status",
    },
    {
      title: "Xoá",
      dataIndex: "action",
    },
  ];

  const checkCompanys = useSelector(
    (state) => state.checkCompanys.checkCompany.data
  );
  const loading = useSelector((state) => state.checkCompanys.loading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(
    Number(localStorage.getItem("pageCheckCompany")) || 1
  );

  useEffect(() => {
    const fetchData = async () => {
      localStorage.setItem("pageCheckCompany", page);
      await dispatch(checkCompanyData({ page }));
    };
  
    fetchData();
  }, [page, dispatch]);
  

  const handleStatus = (status, id) => {
    dispatch(updatecompany({ status: status === 1 ? 0 : 1, id }));
    setTimeout(() => dispatch(checkCompanyData({ page })), 500);
  };

  const handleDelete = (id) => {
    dispatch(removecheckCompany(id));
    setTimeout(() => dispatch(checkCompanyData({ page })), 500);
  };

  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>Kiểm tra tài khoản công ty</h3>
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
              dataSource={checkCompanys.rows?.map((ok, index) => ({
                key: index + 1,
                name: ok.name,
                email: ok.email,
                status: (
                  <div className="action">
                    <Link onClick={() => handleStatus(ok.status, ok.id)}>
                      {ok.status === 1 ? (
                        <i className="far fa-thumbs-up"></i>
                      ) : (
                        <i className="fas fa-check"></i>
                      )}
                    </Link>
                  </div>
                ),
                action: (
                  <div className="action">
                    <Popconfirm
                      title="Bạn có muốn xoá？"
                      onConfirm={() => handleDelete(ok.id)}
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    >
                      <Link>
                        <i className="far fa-trash-alt"></i>
                      </Link>
                    </Popconfirm>
                  </div>
                ),
              }))}
            />
            <Pagination
              current={page}
              onChange={setPage}
              total={checkCompanys.count}
            />
          </div>
        )}
      </div>
    </div>
  );
}
