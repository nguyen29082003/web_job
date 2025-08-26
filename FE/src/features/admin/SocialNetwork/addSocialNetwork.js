import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addsocialNetwork, socialNetworkData, updatesocialNetwork } from "../Slice/socialNetworkSlice";
import socialNetworkApi from "../../../api/socialNetworkApi";

export default function AddSocialNetwork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await socialNetworkApi.getOne(id);
        reset(data);
      }
    };
    fetchData();
  }, [id, reset]);

  const actionResult = async (page) => {
    await dispatch(socialNetworkData(page));
  };

  const onhandleSubmit = async (data) => {
    if (id) {
      await dispatch(updatesocialNetwork({ ...data, id }));
    } else {
      await dispatch(addsocialNetwork({ ...data, status: 0 }));
    }

    setTimeout(() => {
      actionResult({ page: localStorage.getItem("pageSocialNetwork") || 1 });
    }, 700);

    navigate("/admin/socialNetwork");
  };

  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>{id ? "Sửa mạng xã hội" : "Thêm mạng xã hội"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <div className="form-group">
            <label htmlFor="">Tên mạng xã hội</label>
            <input {...register("name", { required: true })} className="form-control w-50" />
            {errors.name && <span className="text-danger">Bạn không được để trống!</span>}
          </div>
          <div className="form-group">
            <label htmlFor="">Mã màu</label>
            <input {...register("color", { required: true })} className="form-control w-50" />
            {errors.color && <span className="text-danger">Bạn không được để trống!</span>}
          </div>
          <div className="form-group">
            <label htmlFor="">Icon</label>
            <input {...register("icon", { required: true })} className="form-control w-50" />
            {errors.icon && <span className="text-danger">Bạn không được để trống!</span>}
          </div>
          <div className="form-group">
            <label htmlFor="">Link</label>
            <input {...register("link", { required: true })} className="form-control w-50" />
            {errors.link && <span className="text-danger">Bạn không được để trống!</span>}
          </div>
          <div className="text-center mtb">
            <input type="submit" value={id ? "Sửa" : "Thêm mới"} />
          </div>
        </form>
      </div>
    </div>
  );
}
