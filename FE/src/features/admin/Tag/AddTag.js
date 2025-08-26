import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addtag, tagData, updatetag } from "../Slice/tagSlice";
import tagApi from "../../../api/tagApi";

export default function AddTag() {
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
        const data = await tagApi.getOne(id);
        reset(data);
      }
    };
    fetchData();
  }, [id, reset]);

  const actionResult = async (page) => {
    await dispatch(tagData(page));
  };

  const onhandleSubmit = async (data) => {
    if (id) {
      await dispatch(updatetag({ name: data.name, id }));
    } else {
      await dispatch(addtag({ name: data.name, status: 0 }));
    }

    setTimeout(() => {
      actionResult({ page: localStorage.getItem("pageTag") || 1 });
    }, 700);

    navigate("/admin/tag");
  };

  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>{id ? "Sửa Tag" : "Thêm Tag"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <div className="form-group">
            <label htmlFor="">Tên tag</label>
            <input {...register("name", { required: true })} className="form-control w-50" />
            {errors.name && <span className="text-danger">Bạn không được để trống!</span>}
          </div>
          <div className="text-center mtb">
            <input type="submit" value={id ? "Sửa" : "Thêm mới"} />
          </div>
        </form>
      </div>
    </div>
  );
}
