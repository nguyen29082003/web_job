import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { message } from 'antd';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function RegisterUser() {
    const schema = yup.object().shape({
        userName: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        name: yup.string().required("Vui lòng nhập tên người dùng"),
        password: yup.string().min(4, "Mật khẩu ít nhất 4 ký tự").max(20, "Mật khẩu tối đa 20 ký tự").required("Vui lòng nhập mật khẩu"),
        rePassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp").required("Vui lòng nhập lại mật khẩu")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const banner = "https://static.ohga.it/wp-content/uploads/sites/24/2020/02/lavoro-precario-convivere.jpg";
    const avatar = "https://vn-live-02.slatic.net/p/49c931dd11cde1e48fee9a07424a22dc.jpg";
    const address = "Hà Nội";

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const asUserRole = [{ roleId: 2 }];
        const dataUser = { address, banner, avatar, name: data.name, email: data.userName, password: data.password, asUserRole, status: 1 };
        const link = "http://localhost:4000/users";

        try {
            const response = await axios.post(link, dataUser);
            if (response.data.data === "email đã tồn tại!") {
                message.info("Email đã được đăng ký!");
            } else {
                message.success("Đăng ký tài khoản thành công!");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            message.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register__box__left__title">
                Email đăng nhập
            </div>
            <input type="text" {...register("userName")} placeholder="Email" />
            <p className="text-danger">{errors.userName?.message}</p>

            <div className="register__box__left__title">
                Tên người dùng
            </div>
            <input type="text" {...register("name")} placeholder="Tên người dùng" />
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
