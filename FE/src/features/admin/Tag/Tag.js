import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Pagination, Popconfirm, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { removetag, tagData, updatetag } from "../Slice/tagSlice";

export default function Tag() {
    const match = useMatch("/admin/tag/*"); // Sử dụng useMatch để lấy URL hiện tại
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tag = useSelector((state) => state.tags.tag.data);
    const loading = useSelector((state) => state.tags.loading);
    const [page, setPage] = useState(Number(localStorage.getItem("pageTag")) || 1);

    useEffect(() => {
        localStorage.setItem("pageTag", page);
        dispatch(tagData({ page }));
    }, [page, dispatch]);

    const handleStatus = (status, id) => {
        dispatch(updatetag({ status: status === 1 ? 0 : 1, id }));
        setTimeout(() => {
            dispatch(tagData({ page }));
        }, 500);
    };

    const handleEdit = (id) => navigate(`/admin/tag/editTag/${id}`);

    const handleDelete = (id) => {
        dispatch(removetag(id));
        setTimeout(() => {
            dispatch(tagData({ page }));
        }, 500);
    };

    const columns = [
        {
            title: "Tên tag",
            dataIndex: "name",
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            render: (status, record) => (
                <div className="action">
                    <Link onClick={() => handleStatus(status, record.id)}>
                        <i className={`far ${status === 1 ? "fa-thumbs-up" : "fa-thumbs-down"}`}></i>
                    </Link>
                </div>
            ),
        },
        {
            title: "Hành động",
            dataIndex: "action",
            render: (_, record) => (
                <div className="action">
                    <Popconfirm 
                        title="Bạn có muốn sửa?" 
                        onConfirm={() => handleEdit(record.id)} 
                        icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                    >
                        <Link><i className="far fa-edit mr-4"></i></Link>
                    </Popconfirm>
                    <Popconfirm 
                        title="Bạn có muốn xoá?" 
                        onConfirm={() => handleDelete(record.id)} 
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Link><i className="far fa-trash-alt"></i></Link>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>Tag</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to="/admin/tag/addTag">
                        <Button variant="outlined" color="secondary">
                            <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm mới
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="spin"><Spin className="mt-5" /></div>
                ) : (
                    <div>
                        <Table 
                            columns={columns} 
                            pagination={false} 
                            dataSource={tag?.rows?.map((item, index) => ({ ...item, key: index + 1 }))} 
                        />
                        <Pagination 
                            current={page} 
                            onChange={setPage} 
                            total={tag?.count || 0} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
