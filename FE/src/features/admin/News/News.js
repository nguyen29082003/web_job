import React, { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Image, Spin, Table } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removenew, newData, updatenew } from '../Slice/newSlice';

export default function New() {
    const columns = [
        {
            title: 'Tên tin tức',
            dataIndex: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
        },
        {
            title: 'Hành động',
            dataIndex: 'action'
        }
    ];

    const { id } = useParams(); // Lấy ID nếu cần từ URL
    const navigate = useNavigate();
    const news = useSelector(state => state.news.new.data);
    const loading = useSelector(state => state.news.loading);
    const dispatch = useDispatch();
    const [state, setState] = useState({ page: localStorage.getItem("pageNew") || 1 });
    const { page } = state;

    const actionResult = async (page) => {
        await dispatch(newData(page));
    };

    useEffect(() => {
        localStorage.setItem("pageNew", page);
        actionResult({ page });
    }, [page]);

    const handleStatus = (status, id) => {
        dispatch(updatenew({ status: status === 1 ? 0 : 1, id }));
        setTimeout(() => {
            actionResult({ page });
        }, 500);
    };

    const onChangePage = page => {
        setState({ page, pageCurent: page });
    };

    const handleEdit = (id) => {
        navigate(`/admin/news/editNew/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(removenew(id));
        setTimeout(() => {
            actionResult({ page });
        }, 500);
    };

    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>Tin tức</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to="/admin/news/addNew">
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
                            dataSource={news.rows.map((ok, index) => ({
                                key: index + 1,
                                name: ok.name,
                                avatar: <Image src={ok.avatar} width="200px" />,
                                status: (
                                    <div className="action">
                                        <Link onClick={() => handleStatus(ok.status, ok.id)}>
                                            <i className={`far ${ok.status === 1 ? "fa-thumbs-up" : "fa-thumbs-down"}`}></i>
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
                                            <Link><i className="far fa-edit mr-4"></i></Link>
                                        </Popconfirm>
                                        <Popconfirm 
                                            title="Bạn có muốn xoá？" 
                                            onConfirm={() => handleDelete(ok.id)} 
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        >
                                            <Link><i className="far fa-trash-alt"></i></Link>
                                        </Popconfirm>
                                    </div>
                                )
                            }))}
                        />
                        <Pagination defaultCurrent={page} onChange={onChangePage} total={news.count} />
                    </div>
                )}
            </div>
        </div>
    );
}
