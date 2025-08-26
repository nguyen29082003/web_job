import { Checkbox, message } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import "../../scss/Login/Login.scss";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import loginApi from '../../../api/loginApi';

export default function Login() {
    const schema = yup.object().shape({
        userName: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        password: yup.string().min(4, "Mật khẩu ít nhất 4 ký tự").max(20, "Mật khẩu tối đa 20 ký tự").required("Vui lòng nhập mật khẩu"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await loginApi.loginCompany({ email: data.userName, password: data.password, status: 1 });
            console.log("Login company response:", response);
            if (response === "err") {
                response = await loginApi.loginUser({ email: data.userName, password: data.password, status: 1 });
                console.log("Login user response:", response);
                if (response === "err") {
                    message.error("Sai tên đăng nhập hoặc mật khẩu!");
                    return;
                }
            }
            if (typeof response === "string" && response.length > 100) {
                localStorage.setItem("token", response);
                message.success("Đăng nhập thành công!");
                navigate("/");
            } else {
                message.error("Đăng nhập thất bại, vui lòng thử lại!");
            }
        } catch (error) {
            message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };

    return (
        <div className="login">
            <div className="login__title">
                <Link to="/" className="login__title__link">Việc làm tốt</Link>
            </div>
            <div className="login__box">
                <div className="line__login"></div>
                <div className="login__box__left">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="login__box__left__title">
                            Tài khoản
                        </div>
                        <input type="text" {...register("userName")} placeholder="Email" />
                        <p className="text-danger">{errors.userName?.message}</p>

                        <div className="login__box__left__title">
                            Mật khẩu
                        </div>
                        <input type="password" {...register("password")} placeholder="Mật khẩu" />
                        <p className="text-danger">{errors.password?.message}</p>
                        

                        <Checkbox>Nhớ mật khẩu</Checkbox>
                        <div className="login__box__left__button">
                            <input type="submit" value="Đăng nhập" />
                        </div>
                        <div className="login__box__right__text">
                            Chưa có tài khoản? <Link to="/register">Đăng ký</Link> ở đây
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}
