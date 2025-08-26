import React, { useEffect, useState } from 'react';
import { message } from "antd";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import checkLoginApi from "../../../../api/checkLogin";
import { contactData, updatecontact, addcontact } from '../../../admin/Slice/contactSlice';
import contactApi from "../../../../api/contactApi";
import "../../../scss/Home/Contact.scss";

export default function Contact() {
    const [user, setUser] = useState();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await checkLoginApi.checkLogin();
            const currentUser = res?.data?.user;
            if (currentUser) {
                setUser(currentUser);
                reset({
                    email: currentUser.email,
                    name: currentUser.name,
                    description: "", // reset nội dung ban đầu
                });
            }
        };
        fetchUser();
        window.scrollTo(0, 0);
    }, [reset]);

    useEffect(() => {
        const fetchContact = async () => {
            if (id) {
                const data = await contactApi.getOne(id);
                reset(data);
            }
        };
        fetchContact();
    }, [id, reset]);

    const actionResult = async (page) => {
        await dispatch(contactData(page));
    };

    const onhandleSubmit = async (data) => {
        if (!user) {
            message.warning("Bạn cần đăng nhập để gửi phản ánh!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            return;
        }
        const payload = {
            ...data,
            address: user?.id,
            email:user?.email,
            phone:user?.name,
            status: 1,
        };

        if (id) {
            await dispatch(updatecontact({ ...payload, id }));
        } else {
            await dispatch(addcontact(payload));
        }

        setSuccessMessage("Phản ánh của bạn đã được gửi thành công!");

        setTimeout(() => {
            setSuccessMessage("");
            actionResult(localStorage.getItem("pageContact") || 1);
            reset({
                name: user?.id,

                description: "",
            });
        }, 3000);
    };

    return (
        <div className="contact">
            <div className="contact__title">
                <h3>Liên hệ phản ánh</h3>
            </div>
            <div className="contact__detail">
                <p>Liên lạc với chúng tôi nếu bạn gặp vấn đề gì đó.</p>
            </div>
            <form className="contact__gmail" onSubmit={handleSubmit(onhandleSubmit)}>
                {/* Hidden Inputs for name & email */}
                <input type="hidden" {...register("email")} />
                <input type="hidden" {...register("name")} />

                <textarea
                    {...register("description", { required: "Vui lòng nhập nội dung phản ánh" })}
                    placeholder="Nội dung ..."
                    rows="4"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}

                <button type="submit">Phản hồi</button>

                {successMessage && (
                    <p className="text-green-600 mt-2">{successMessage}</p>
                )}
            </form>
        </div>
    );
}
