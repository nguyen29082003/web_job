import React, { useEffect, useState } from 'react';
import { Button, Image, Pagination, Popconfirm, Spin, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeformCV, formCVData, updateformCV } from '../Slice/formCVSlice';

export default function FormCv() {
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
        },
    ];

    const formCV = useSelector((state) => state.formCVs.formCV.data);
    const loading = useSelector((state) => state.formCVs.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(Number(localStorage.getItem('pageFormCV')) || 1);

    useEffect(() => {
        // Lưu thông tin vào localStorage
        localStorage.setItem('pageFormCV', page);
      
        // Gọi dispatch để lấy dữ liệu từ API
        const fetchData = async () => {
          try {
            await dispatch(formCVData({ page }));
            // Nếu cần thêm xử lý sau khi dispatch (như cập nhật state), có thể làm ở đây
          } catch (error) {
            console.error('Error fetching form CV data:', error);
          }
        };
      
        fetchData();
    }, [page, dispatch]);
      

    const handleStatus = (status, id) => {
        dispatch(updateformCV({ status: status === 1 ? 0 : 1, id }));
        setTimeout(() => dispatch(formCVData({ page })), 500);
    };

    const handleEdit = (id) => {
        navigate(`/admin/editFormCV/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(removeformCV(id));
        setTimeout(() => dispatch(formCVData({ page })), 500);
    };

    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>Mẫu CV</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to="/admin/addFormCV">
                        <Button variant="outlined" color="secondary">
                            <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm mới
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="spin">
                        <Spin className="mt-5" />
                    </div>
                ) : (
                    <div>
                        <Table
                            columns={columns}
                            pagination={false}
                            dataSource={formCV.rows?.map((ok, index) => ({
                                key: index + 1,
                                avatar: <Image src={ok.avatar} width="200px" />,
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
                                action: (
                                    <div className="action">
                                        <Popconfirm
                                            title="Bạn có muốn sửa？"
                                            onConfirm={() => handleEdit(ok.id)}
                                            icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                                        >
                                            <Link>
                                                <i className="far fa-edit mr-4"></i>
                                            </Link>
                                        </Popconfirm>
                                        <Popconfirm
                                            title="Bạn có muốn xoá？"
                                            onConfirm={() => handleDelete(ok.id)}
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        >
                                            <Link>
                                                <i className="far fa-trash-alt"></i>
                                            </Link>
                                        </Popconfirm>
                                    </div>
                                ),
                            }))}
                        />
                        <Pagination current={page} onChange={setPage} total={formCV.count} />
                    </div>
                )}
            </div>
        </div>
    );
}
