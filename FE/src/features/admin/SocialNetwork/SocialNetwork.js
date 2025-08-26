import React, { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Spin, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removesocialNetwork, socialNetworkData, updatesocialNetwork } from '../Slice/socialNetworkSlice';

export default function SocialNetwork() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socialNetwork = useSelector(state => state.socialNetworks.socialNetwork.data);
    const loading = useSelector(state => state.socialNetworks.loading);
    const [page, setPage] = useState(localStorage.getItem("pageSocialNetwork") || 1);

    useEffect(() => {
        localStorage.setItem("pageSocialNetwork", page);
        dispatch(socialNetworkData({ page }));
    }, [page, dispatch]);

    const handleStatus = (status, id) => {
        dispatch(updatesocialNetwork({ status: status === 1 ? 0 : 1, id }));
        setTimeout(() => {
            dispatch(socialNetworkData({ page }));
        }, 500);
    };

    const handleEdit = (id) => navigate(`/admin/social-network/edit/${id}`);

    const handleDelete = (id) => {
        dispatch(removesocialNetwork(id));
        setTimeout(() => {
            dispatch(socialNetworkData({ page }));
        }, 500);
    };

    const columns = [
        {
            title: 'Tên mạng xã hội',
            dataIndex: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            render: (icon, record) => <i className={record.icon} style={{ fontSize: "1.7rem", color: record.color }} />,
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            render: (status, record) => (
                <div className="action">
                    <Link onClick={() => handleStatus(status, record.id)}>
                        <i className={`far ${status === 1 ? "fa-thumbs-up" : "fa-thumbs-down"}`}></i>
                    </Link>
                </div>
            ),
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div className="action">
                    <Popconfirm title="Bạn có muốn sửa?" onConfirm={() => handleEdit(record.id)} icon={<QuestionCircleOutlined style={{ color: 'green' }} />}> 
                        <Link><i className="far fa-edit mr-4"></i></Link>
                    </Popconfirm>
                    <Popconfirm title="Bạn có muốn xoá?" onConfirm={() => handleDelete(record.id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}> 
                        <Link><i className="far fa-trash-alt"></i></Link>
                    </Popconfirm>
                </div>
            ),
        }
    ];

    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>Mạng xã hội</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <div className="add">
                    <Link to="/admin/social-network/add">
                        <Button variant="outlined" color="secondary">
                            <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm mới
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="spin"><Spin className="mt-5" /></div>
                ) : (
                    <div>
                        <Table columns={columns} pagination={false} dataSource={socialNetwork.rows.map((item, index) => ({ ...item, key: index + 1 }))} />
                        <Pagination current={page} onChange={setPage} total={socialNetwork.count} />
                    </div>
                )}
            </div>
        </div>
    );
}
