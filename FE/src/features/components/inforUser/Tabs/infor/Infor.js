import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { message, Select } from "antd";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userApi from "../../../../../api/userApi";
import { updateuser, userData } from "../../../../admin/Slice/userSlice";
import { tagData } from "../../../../admin/Slice/tagSlice";
import { typeWorkData } from "../../../../admin/Slice/typeWorkSlice";

export default function Infor({ id }) {
  const [state, setState] = useState({
    tagId: [],
    loading: false,
    img: null,
    imgBanner: null,
    anh: "",
    anhBanner: "",
  });

  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [male, setMale] = useState("");
  const tags = useSelector((state) => state.tags.tag || { data: { rows: [] } });
  const tagWork = tags.data?.rows || [];

  useEffect(() => {
    dispatch(tagData({ status: 1 }));
    dispatch(typeWorkData({ status: 1 }));

    if (id) {
      userApi.getOne(id).then((data) => {
        setContent(data.introduce);
        setMale(data.male);
        reset(data);
        setState((prev) => ({
          ...prev,
          anh: data.avatar,
          anhBanner: data.banner,
          tagId: data.Tags.map((tag) => tag.id),
        }));
      });
    }
  }, [id, dispatch, reset]);

  const onSubmit = async (data) => {
    if (!data.phone || !state.tagId.length || !content) {
      message.warning("Bạn cần nhập đầy đủ thông tin!");
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    const updates = {
      id,
      name: data.name,
      address: data.address,
      phone: data.phone,
      tags: state.tagId, // ✅ API yêu cầu là "tags"
      male,
      introduce: content,
      status: 1,
    };

    const storage = getStorage();

    if (state.img) {
      const imgRef = ref(storage, `imagesuser/${state.img.name}`);
      await uploadBytes(imgRef, state.img);
      updates.avatar = await getDownloadURL(imgRef);
    }

    if (state.imgBanner) {
      const bannerRef = ref(storage, `imagesuser/${state.imgBanner.name}`);
      await uploadBytes(bannerRef, state.imgBanner);
      updates.banner = await getDownloadURL(bannerRef);
    }

    await dispatch(updateuser(updates));
    dispatch(userData({ page: 1 }));
    navigate(`/candidates/${id}`);
  };

  return (
    <div className="infor">
      <h3>Thông tin cá nhân</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Ảnh đại diện</label>
          <input
            type="file"
            onChange={(e) => setState({ ...state, img: e.target.files[0] })}
          />
        </div>
        <div className="form-group">
          <label>Ảnh banner</label>
          <input
            type="file"
            onChange={(e) =>
              setState({ ...state, imgBanner: e.target.files[0] })
            }
          />
        </div>
        <div className="form-group">
          <label>Tên ứng viên</label>
          <input type="text" className="form-control" {...register("name")} />
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            {...register("address")}
          />
        </div>
        <div className="form-group">
          <label>Giới tính</label>
          <Select value={male} onChange={setMale} className="form-control">
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nữ">Nữ</Select.Option>
          </Select>
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            {...register("phone")}
          />
        </div>
        <div className="form-group">
          <label>Kỹ năng</label>
          <Select
            mode="multiple"
            value={state.tagId}
            onChange={(value) => setState((prev) => ({ ...prev, tagId: value }))}
            className="form-control"
            placeholder="Chọn kỹ năng"
          >
            {tagWork.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="form-group">
          <label>Giới thiệu bản thân</label>
          <JoditEditor value={content} onChange={setContent} />
        </div>
        <button type="submit" disabled={state.loading}>
          {state.loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}
