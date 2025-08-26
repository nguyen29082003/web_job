import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addtypeWork, typeWorkData, updatetypeWork } from "../Slice/typeWorkSlice";
import typeWorkApi from "../../../api/typeWorkApi";

export default function AddtypeWork() {
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
        const data = await typeWorkApi.getOne(id);
        reset(data);
      }
    };
    fetchData();
  }, [id, reset]);

  const actionResult = async (page) => {
    await dispatch(typeWorkData(page));
  };

  const onhandleSubmit = async (data) => {
    if (id) {
      await dispatch(updatetypeWork({ name: data.name, description: data.description, icon: data.icon, id }));
    } else {
      await dispatch(addtypeWork({ name: data.name, description: data.description, icon: data.icon, status: 0 }));
    }

    setTimeout(() => {
      actionResult({ page: localStorage.getItem("pagetypeWork") || 1 });
    }, 700);

    navigate("/admin/typeWork");
  };

  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>{id ? "Sửa loại công việc" : "Thêm loại công việc"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <div className="form-group">
            <label htmlFor="">Tên loại công việc</label>
            <input {...register("name", { required: true })} className="form-control w-50" />
            {errors.name && <span className="text-danger">Bạn không được để trống!</span>}
          </div>
          <div className="form-group">
            <label htmlFor="">Icon</label>
            <input {...register("icon", { required: true })} className="form-control w-50" />
            {errors.icon && <span className="text-danger">Bạn không được để trống!</span>}
          </div>
          <div className="form-group">
            <label htmlFor="">Mô tả</label>
            <textarea {...register("description", { required: true })} className="form-control w-50" cols="30" rows="5"></textarea>
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
