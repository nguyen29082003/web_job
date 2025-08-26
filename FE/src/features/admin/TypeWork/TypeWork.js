import React, { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Spin, Table } from 'antd';
import { Link, useNavigate, useMatch } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removetypeWork, typeWorkData, updatetypeWork } from '../Slice/typeWorkSlice';

export default function TypeWork() {
    const navigate = useNavigate();
    const match = useMatch("/admin/typeWork/*"); // Lấy URL hiện tại
    const dispatch = useDispatch();

    const typeWork = useSelector(state => state.typeWorks.typeWork?.data || { rows: [], count: 0 });
    const loading = useSelector(state => state.typeWorks.loading);

    const [page, setPage] = useState(Number(localStorage.getItem("pagetypeWork")) || 1);

    useEffect(() => {
        localStorage.setItem("pagetypeWork", page);
        dispatch(typeWorkData({ page }));
    }, [page, dispatch]);

    const handleStatus = (status, id) => {
        dispatch(updatetypeWork({ status: status === 1 ? 0 : 1, id }));
        setTimeout(() => {
            dispatch(typeWorkData({ page }));
        }, 500);
    };

    const handleEdit = (id) => {
        navigate(`/admin/typeWork/editTypeWork/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(removetypeWork(id));
        setTimeout(() => {
            dispatch(typeWorkData({ page }));
        }, 500);
    };

    const columns = [
        {
            title: 'Tên loại công việc',
            dataIndex: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            render: (icon) => <div dangerouslySetInnerHTML={{ __html: icon }} />,
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            render: (status, record) => (
                <div className="action">
                    <Link onClick={() => handleStatus(status, record.id)}>
                        <i className={`far ${status === 1 ? 'fa-thumbs-up' : 'fa-thumbs-down'}`}></i>
                    </Link>
                </div>
            ),
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
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
                    <h3>Loại công việc</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to="/admin/typeWork/addTypeWork">
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
                            dataSource={typeWork.rows.map((item, index) => ({ ...item, key: index + 1 }))} 
                        />
                        <Pagination 
                            current={page} 
                            onChange={setPage} 
                            total={typeWork.count} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
