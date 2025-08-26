import React, { useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Spin, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removecontact, contactData, updatecontact } from '../Slice/contactSlice';

export default function Contact() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'phone',
        },
        {
            title: 'Nội dung',
            dataIndex: 'description',
        },
        // {
        //     title: 'Tình trạng',
        //     dataIndex: 'status',
        // },
        // {
        //     title: 'Hành động',
        //     dataIndex: 'action',
        // },
    ];

    const contact = useSelector((state) => state.contacts.contact.data);
    const loading = useSelector((state) => state.contacts.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(Number(localStorage.getItem('pageContact')) || 1);

    useEffect(() => {
        const fetchData = async () => {
          localStorage.setItem('pageContact', page);
          await dispatch(contactData({ page }));
        };
      
        fetchData();
    }, [page, dispatch]);

    const handleStatus = (status, id) => {
        dispatch(updatecontact({ status: status === 1 ? 0 : 1, id }));
        setTimeout(() => dispatch(contactData({ page })), 500);
    };

    const handleEdit = (id) => {
        navigate(`/admin/editContact/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(removecontact(id));
        setTimeout(() => dispatch(contactData({ page })), 500);
    };

    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>Phản ánh người dùng</h3>
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
                            dataSource={contact?.rows?.map((ok, index) => ({
                                key: index + 1,
                                address:ok.address,
                                email: ok.email,
                                phone: ok.phone,
                                description:ok.description,
                            
            
                            }))}
                        />
                        <Pagination current={page} onChange={setPage} total={contact?.count} />
                    </div>
                )}
            </div>
        </div>
    );
}
