import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; 
import { addcontact, contactData, updatecontact } from '../Slice/contactSlice';
import contactApi from "./../../../api/contactApi";

export default function Addcontact() {
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 

    useEffect(() => {
        const fetchContact = async () => {
            if (id) {
                const data = await contactApi.getOne(id);
                reset(data);
            }
        };
        fetchContact();
    }, [id, reset]); // Thêm id vào dependency list

    const actionResult = async (page) => {
        await dispatch(contactData(page));
    };

    const onhandleSubmit = (data) => {
        if (id) {
            dispatch(updatecontact({ ...data, id }));
        } else {
            dispatch(addcontact({ ...data, status: 0 }));
        }
        setTimeout(() => {
            actionResult(localStorage.getItem("pageContact") || 1);
        }, 700);
        navigate("/admin/contact"); 
    };

    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>{id ? "Sửa liên hệ" : "Thêm liên hệ"}</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <form onSubmit={handleSubmit(onhandleSubmit)}>
                    <div className="form-group">
                        <label>Email liên hệ</label>
                        <input {...register("email", { required: true })} className="form-control w-50" />
                        {errors.email && <span className="text-danger">Bạn không được để trống!</span>}
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <input {...register("address", { required: true })} className="form-control w-50" />
                        {errors.address && <span className="text-danger">Bạn không được để trống!</span>}
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input {...register("phone", { required: true })} className="form-control w-50" />
                        {errors.phone && <span className="text-danger">Bạn không được để trống!</span>}
                    </div>
                    <div className="form-group">
                        <label>Thông tin</label>
                        <textarea {...register("description", { required: true })} className="form-control w-50" rows="5" />
                        {errors.description && <span className="text-danger">Bạn không được để trống!</span>}
                    </div>
                    <div className="text-center mtb">
                        <input type="submit" value={id ? "Sửa" : "Thêm mới"} />
                    </div>
                </form>
            </div>
        </div>
    );
}
