import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../firebase";
import companyApi from "../../../../../api/companyApi";
import { companyData, updatecompany } from "../../../../admin/Slice/companySlice";
import SpinLoad from "../../../Spin/Spin";

export default function Infor({ id }) {
    const [state, setState] = useState({
        loading: false,
        linkImg: "",
        tenanh: "",
        img: "",
        anh: "",
        linkImgBanner: "",
        tenanhBanner: "",
        imgBanner: "",
        anhBanner: ""
    });

    const { loading, linkImg, tenanh, img, anh, linkImgBanner, tenanhBanner, imgBanner, anhBanner } = state;
    const { register, handleSubmit, reset } = useForm();
    const [content, setContent] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (id) {
            companyApi.getOne(id).then(data => {
                setContent(data.introduce);
                reset(data);
                setState(prev => ({
                    ...prev,
                    anh: data.avatar,
                    anhBanner: data.banner
                }));
            });
        }
    }, [id, reset]);

    const actionResult = async (page) => {
        await dispatch(companyData(page));
    };

    const edit = async (data) => {
        const updatedData = {
            name: data.name,
            address: data.address,
            nation: data.nation,
            website: data.website,
            phone: data.phone,
            introduce: content,
            id: id
        };

        if (data.anh) updatedData.avatar = data.anh;
        if (data.anhBanner) updatedData.banner = data.anhBanner;

        await dispatch(updatecompany(updatedData));
    };

    const onSubmit = async (data) => {
        if (!data.name || !data.nation || !data.address || !data.phone || !content || !data.website) {
            message.warning("Bạn chưa nhập đầy đủ thông tin!");
            return;
        }

        setState(prev => ({ ...prev, loading: true }));

        let anh = null;
        let anhBanner = null;

        if (img) {
            const imageRef = ref(storage, `imagescompany/${img.name}`);
            await uploadBytes(imageRef, img);
            anh = await getDownloadURL(imageRef);
        }

        if (imgBanner) {
            const bannerRef = ref(storage, `imagescompany/${imgBanner.name}`);
            await uploadBytes(bannerRef, imgBanner);
            anhBanner = await getDownloadURL(bannerRef);
        }

        await edit({ ...data, anh, anhBanner });
        setTimeout(() => {
            actionResult({ page: 1 });
        }, 800);
        
        navigate(`/companys/${id}`);
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        setState(prev => ({
            ...prev,
            [type === "avatar" ? "linkImg" : "linkImgBanner"]: URL.createObjectURL(file),
            [type === "avatar" ? "tenanh" : "tenanhBanner"]: file.name,
            [type === "avatar" ? "img" : "imgBanner"]: file
        }));
    };

    return (
        <div className="infor">
            <div className="heading">
                <div className="heading__title">
                    <h3>Thông tin công ty</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Ảnh đại diện</label>
                        <label htmlFor="img">
                            <div className="btn_camera">
                                <i className="fas fa-camera-retro"></i>
                            </div>
                        </label>
                        <input type="file" hidden id="img" onChange={(e) => handleImageChange(e, "avatar")} />
                        {linkImg ? <img src={linkImg} height="150px" alt="" /> : anh && <img src={anh} height="150px" alt="" />}
                        {tenanh && <span><span className="text-danger">Tên ảnh</span>: {tenanh}</span>}
                    </div>

                    <div className="form-group">
                        <label>Ảnh banner</label>
                        <label htmlFor="imgBanner">
                            <div className="btn_camera">
                                <i className="far fa-images"></i>
                            </div>
                        </label>
                        <input type="file" hidden id="imgBanner" onChange={(e) => handleImageChange(e, "banner")} />
                        {linkImgBanner ? <img src={linkImgBanner} height="150px" alt="" /> : anhBanner && <img src={anhBanner} height="150px" width="250px" alt="" />}
                        {tenanhBanner && <span><span className="text-danger">Tên ảnh</span>: {tenanhBanner}</span>}
                    </div>

                    <div className="d-flex">
                        <div className="form-group w-45">
                            <label>Tên công ty</label>
                            <input type="text" className="form-control" {...register("name")} />
                        </div>
                        <div className="form-group w-45">
                            <label>Địa chỉ</label>
                            <input type="text" className="form-control" {...register("address")} />
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="form-group w-45">
                            <label>Quốc gia</label>
                            <input type="text" className="form-control" {...register("nation")} />
                        </div>
                        <div className="form-group w-45">
                            <label>Website</label>
                            <input type="text" className="form-control" {...register("website")} />
                        </div>
                    </div>

                    <div className="form-group w-45">
                        <label>Số điện thoại</label>
                        <input type="text" className="form-control" {...register("phone")} />
                    </div>

                    <div className="form-group">
                        <label>Mô tả</label>
                        <JoditEditor value={content} tabIndex={1} onChange={(newContent) => setContent(newContent)} />
                    </div>

                    {loading ? <SpinLoad /> : <div className="text-center mtb"><input type="submit" value="Cập nhật" /></div>}
                </form>
            </div>
        </div>
    );
}
