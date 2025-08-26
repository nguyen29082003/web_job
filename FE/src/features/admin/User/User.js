import { message, Modal, Pagination, Radio, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkLoginApi from "../../../api/checkLogin";
import userRoleApi from "../../../api/userRole";
import { updateuser, userData } from "../Slice/userSlice";
export default function User() {
  const columns = [
    {
      title: "tên người dùng",
      dataIndex: "name",
    },
    {
      title: "quyền hiện tại",
      dataIndex: "authen",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const user = useSelector((state) => state.users.user.data);
  const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    page: localStorage.getItem("pageUser") || 1,
  });
  const { page } = state;
  const [userId, setUserId] = useState();
  const actionResult = async (page) => {
    await dispatch(userData(page));
  };
  const [role, setRole] = useState();
  console.log(role);
  useEffect(() => {
    checkLoginApi.checkLogin().then((ok) => {
      setRole(ok.data.user.role);
    });
    localStorage.setItem("pageUser", page);
    actionResult({ page: page });
  }, [page]);
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updateuser({ status: 0, id: id }));
    } else {
      dispatch(updateuser({ status: 1, id: id }));
    }
    setTimeout(() => {
      actionResult({ page: page });
    }, 500);
  };
  const onChangePage = (page) => {
    setState({
      page: page,
      pageCurent: page,
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    setUserId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (role === "grant") {
      userRoleApi.edituserRole({ idEdit: userId, roleId: authen });
      setTimeout(() => {
        actionResult({ page: page });
      }, 500);
      setIsModalVisible(false);
    } else {
      message.warning("Bạn không đủ quyền!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [authen, setAuthen] = useState(2);
  const onChangeAuthen = (e) => {
    setAuthen(e.target.value);
  };
  const noShow = () => {
    message.warning("Không thể thay đổi tài khoản này!");
  };
  const formatNameAuthen = (e) => {
    if (e === "user") {
      return <strong className="text-primary">{e}</strong>;
    } else if (e === "admin") {
      return <strong className="text-danger">{e}</strong>;
    } else if (e === "grant") {
      return <strong className="text-grant">{e}</strong>;
    }
  };
  return (
    <div id="admin">
      <Modal
        title="Cấp quyền cho người dùng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group onChange={onChangeAuthen} value={authen}>
          <Radio className="mb-2" value={1}>
            Admin
          </Radio>
          <br />
          <Radio value={2}>Người dùng</Radio>
        </Radio.Group>
      </Modal>
      <div className="heading">
        <div className="heading__title">
          <h3>Cấp quyền sử dụng</h3>
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
              dataSource={user.rows.map((ok, index) => ({
                key: index + 1,
                name: ok.name,
                authen: formatNameAuthen(ok.Roles[0].name),
                status: (
                  <div className="action">
                    {ok.status === 1 ? (
                      <Link
                        onClick={
                          ok.Roles[0].name === "grant"
                            ? noShow
                            : () => {
                                handleStatus(ok.status, ok.id);
                              }
                        }
                      >
                        <i
                          className={`far fa-thumbs-up ${
                            ok.Roles[0].name === "grant" ? "text-grant" : ""
                          }`}
                        ></i>
                      </Link>
                    ) : (
                      <Link onClick={() => handleStatus(ok.status, ok.id)}>
                        <i className="far fa-thumbs-down "></i>
                      </Link>
                    )}
                  </div>
                ),
                action: (
                  <div className="action">
                    <Link>
                      <i
                        className={`fas fa-user-shield ${
                          ok.Roles[0].name === "grant" ? "text-grant" : ""
                        }`}
                        onClick={
                          ok.Roles[0].name === "grant"
                            ? noShow
                            : () => {
                                showModal(ok.id);
                              }
                        }
                      ></i>
                    </Link>
                  </div>
                ),
              }))}
            />
            <Pagination
              defaultCurrent={page}
              onChange={onChangePage}
              total={user.count}
            />
          </div>
        )}
      </div>
    </div>
  );
}
