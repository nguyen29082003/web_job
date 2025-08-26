import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { companyData } from '../../admin/Slice/companySlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { Link } from "react-router-dom";

export default function RegisterCompany() {
    const schema = yup.object().shape({
        userName: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        name: yup.string().required("Vui lòng nhập tên công ty"),
        password: yup.string().min(4, "Mật khẩu ít nhất 4 ký tự").max(20, "Mật khẩu tối đa 20 ký tự").required("Vui lòng nhập mật khẩu"),
        rePassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp").required("Vui lòng nhập lại mật khẩu")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const banner = "https://phuoc-associates.com/wp-content/uploads/2019/10/5-Things-To-Keep-In-Mind-When-Opening-A-Company-In-Vietnam.jpg";
    const avatar = "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg";
    const address = "Hà Nội";

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const actionResult = async () => { await dispatch(companyData()) };

    const onSubmit = async (data) => {
        const dataCompany = { address, banner, avatar, name: data.name, email: data.userName, password: data.password, status: 0 };
        const link = "http://localhost:4000/companys";

        try {
            const response = await axios.post(link, dataCompany);
            if (response.data.data === "email đã tồn tại!") {
                message.info("Email đã được đăng ký!");
            } else {
                message.success("Đăng ký tài khoản thành công!");
                setTimeout(() => {
                    actionResult();
                    navigate("/login");
                }, 700);
            }
        } catch (error) {
            console.error(error);
            message.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register__box__left__title">
                Email công ty
            </div>
            <input type="text" {...register("userName")} placeholder="Email" />
            <p className="text-danger">{errors.userName?.message}</p>

            <div className="register__box__left__title">
                Tên công ty
            </div>
            <input type="text" {...register("name")} placeholder="Tên công ty" />
            <p className="text-danger">{errors.name?.message}</p>

            <div className="register__box__left__title">
                Mật khẩu
            </div>
            <input type="password" {...register("password")} placeholder="Mật khẩu" />
            <p className="text-danger">{errors.password?.message}</p>

            <div className="register__box__left__title">
                Nhập lại mật khẩu
            </div>
            <input type="password" {...register("rePassword")} placeholder="Mật khẩu" />
            <p className="text-danger">{errors.rePassword?.message}</p>

            <div className="register__box__left__button">
                <input type="submit" value="Đăng ký" />
            </div>
            <div className="register__box__right__text">
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link> ở đây
            </div>
        </form>
    );
}
