import { Select, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Cập nhật từ react-router
import newApi from "../../../api/newApi";
import tagNewApi from "../../../api/tagNewApi";
import { storage } from "../../../firebase";
import { checkArrayEquar } from "../../container/Functionjs";
import { addnew, newData, updatenew } from "../Slice/newSlice";
import { tagData } from "../Slice/tagSlice";

export default function AddNew() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [state, setState] = useState({
    load: false,
    linkImg: "",
    tenanh: "",
    img: "",
    anh: "",
    tagId: "",
    tag1: "",
  });
  const { linkImg, tenanh, img, anh, tagId, tag1 } = state;
  const [content, setContent] = useState("");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const actiontag = async () => {
    await dispatch(tagData({ status: 1 }));
  };

  const actionResult = async (page) => {
    await dispatch(newData(page));
  };

  const getApi = async () => {
    try {
      const data = await newApi.getOne(id);
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    }
  };

  const getTag = (tags) => tags.map((tag) => `${tag.id}`);

  useEffect(() => {
    const fetchData = async () => {
      await actiontag();
      if (id) {
        const data = await getApi();
        if (data) {
          setContent(data.content);
          reset(data);
          setState((prevState) => ({
            ...prevState,
            anh: data.avatar,
            tagId: getTag(data.Tags),
            tag1: getTag(data.Tags),
          }));
        }
      }
    };
    fetchData();
  }, [id, reset]);

  const tags = useSelector((state) => state.tags.tag.data);
  const loadingTag = useSelector((state) => state.tags.loading);

  const onhandleSubmit = async (data) => {
    setState((prevState) => ({ ...prevState, load: true }));

    try {
      let imageUrl = anh;
      if (img) {
        await storage.ref(`imagesNew/${img.name}`).put(img);
        imageUrl = await storage.ref("imagesNew").child(img.name).getDownloadURL();
      }

      if (id) {
        if (!checkArrayEquar(tagId, tag1)) {
          await tagNewApi.deletetagNew(id);
          const newTags = tagId.map((tag) => ({ newId: id, tagId: tag }));
          await tagNewApi.posttagNew(newTags);
        }
        await dispatch(
          updatenew({
            name: data.name,
            samary: data.samary,
            avatar: imageUrl,
            content,
            id,
          })
        );
      } else {
        const newTags = tagId.map((tag) => ({ tagId: tag }));
        await dispatch(
          addnew({
            name: data.name,
            samary: data.samary,
            content,
            avatar: imageUrl,
            useId: 1,
            status: 0,
            tagnew: newTags,
          })
        );
      }

      setTimeout(() => {
        actionResult({ page: localStorage.getItem("pageNew") || 1 });
      }, 800);
      navigate("/admin/new"); // Dùng navigate thay vì history.push
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
    <div id="admin">
      <div className="heading">
        <div className="heading__title">
          <h3>{id ? "Sửa tin tức" : "Thêm tin tức"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit(onhandleSubmit)}>
          <div className="form-group">
            <div className="mt-3">
              <label htmlFor="">Tên bài viết</label>
              <input {...register("name", { required: true })} className="form-control w-50" />
              {errors.name && <span className="text-danger">Bạn không được để trống!</span>}
            </div>
            <div className="mt-3">
              <label htmlFor="">Ảnh đại diện</label>
              <input type="file" hidden id="img" onChange={(e) => setState({ ...state, linkImg: URL.createObjectURL(e.target.files[0]), tenanh: e.target.files[0].name, img: e.target.files[0] })} />
              {linkImg ? (
                <img src={linkImg} className="ml-3" height="150px" width="250px" alt="" />
              ) : anh ? (
                <img src={anh} className="ml-5" height="150px" width="250px" alt="" />
              ) : null}
              {tenanh && <span><span className="text-danger">Tên ảnh</span>: {tenanh}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="">Tags liên quan</label>
              {loadingTag ? <Spin className="mt-5" /> : (
                <Select value={tagId || []} mode="tags" onChange={(e) => setState({ ...state, tagId: e })} className="w-50 ml-4">
                  {tags.rows?.map((tag) => <Option key={tag.id}>{tag.name}</Option>)}
                </Select>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="">Tóm tắt</label>
              <textarea {...register("samary", { required: true })} className="form-control w-50" rows="4"></textarea>
              {errors.samary && <span className="text-danger">Bạn không được để trống!</span>}
            </div>
            <div className="mt-3">
              <label htmlFor="">Nội dung</label>
              <JoditEditor value={content} tabIndex={1} onChange={(e) => setContent(e)} />
            </div>
          </div>
          <div className="text-center mtb">
            <input type="submit" value={id ? "Sửa" : "Thêm mới"} />
            {state.load && <Spin className="mt-5" />}
          </div>
        </form>
      </div>
    </div>
  );
}
