import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addformCV, formCVData, updateformCV } from '../Slice/formCVSlice';
import formCVApi from '../../../api/formCVApi';
import { tagData } from '../Slice/tagSlice';
import { Select, Spin } from 'antd';
import { storage } from '../../../firebase';
import JoditEditor from 'jodit-react';
import tagFormCVApi from '../../../api/tagFormCVApi';

export default function AddFormCV() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [content, setContent] = useState('');
    const [state, setState] = useState({ load: false, linkImg: '', tenanh: '', img: '', anh: '', tagId: [], tag1: [] });
    const { linkImg, tenanh, img, anh, tagId, tag1 } = state;
    const tags = useSelector(state => state.tags.tag.data);
    const loadingTag = useSelector(state => state.tags.loading);

    useEffect(() => {
        // Dispatch action để lấy tag data
        dispatch(tagData({ status: 1 }));
      
        // Kiểm tra nếu id có sẵn thì tiến hành gọi API lấy thông tin
        if (id) {
          const fetchData = async () => {
            try {
              // Gọi API để lấy dữ liệu theo id
              const data = await formCVApi.getOne(id);
              
              // Cập nhật state với dữ liệu từ API trả về
              setContent(data.content);
              reset(data);
      
              setState(prev => ({
                ...prev,
                anh: data.avatar,
                tagId: data.Tags.map(tag => `${tag.id}`),
                tag1: data.Tags.map(tag => `${tag.id}`)
              }));
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          // Gọi hàm fetchData khi id có sẵn
          fetchData();
        }
    }, [id, dispatch, reset]);
      

    const onChangeTag = (value) => {
        setState(prev => ({ ...prev, tagId: value }));
    };

    const onhandleSubmit = async (data) => {
        setState(prev => ({ ...prev, load: true }));
        let avatarUrl = anh;

        if (img) {
            await storage.ref(`imagesFormCV/${img.name}`).put(img);
            avatarUrl = await storage.ref("imagesFormCV").child(img.name).getDownloadURL();
        }

        if (id) {
            if (tag1.join() !== tagId.join()) {
                await tagFormCVApi.deletetagFormCV(id);
                const tagData = tagId.map(tag => ({ formCVId: id, tagId: tag }));
                await tagFormCVApi.posttagFormCV(tagData);
            }
            await dispatch(updateformCV({ avatar: avatarUrl, content, id }));
        } else {
            const tagFormCV = tagId.map(tag => ({ tagId: tag }));
            await dispatch(addformCV({ content, avatar: avatarUrl, status: 0, tagform: tagFormCV }));
        }

        setTimeout(() => {
            dispatch(formCVData({ page: localStorage.getItem("pageFormCV") || 1 }));
        }, 700);
        navigate("/admin/formCV");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setState(prev => ({
            ...prev,
            linkImg: URL.createObjectURL(file),
            tenanh: file.name,
            img: file
        }));
    };

    return (
        <div id="admin">
            <div className="heading">
                <div className="heading__title">
                    <h3>{id ? "Sửa Form CV" : "Thêm Form CV"}</h3>
                </div>
                <div className="heading__hr"></div>
            </div>
            <div className="content">
                <form onSubmit={handleSubmit(onhandleSubmit)}>
                    <div className="mt-3">
                        <label>Ảnh đại diện</label>
                        <label htmlFor="img"><div className="btn_camera"><i className="fas fa-camera-retro"></i></div></label>
                        <input type="file" hidden id="img" onChange={handleImageUpload} />
                        {linkImg && <img src={linkImg} height="150" width="250" alt="Preview" />}
                        {anh && !linkImg && <img src={anh} height="150" width="250" alt="Avatar" />}
                        {tenanh && <span><span className="text-danger">Tên ảnh:</span> {tenanh}</span>}
                    </div>
                    <div className="form-group">
                        <label>Tags liên quan</label><br />
                        {loadingTag ? <Spin className="mt-5" /> :
                            <Select value={tagId} mode="tags" onChange={onChangeTag} className="w-50 ml-4" placeholder="Tags Mode">
                                {tags?.rows?.map(tag => <Select.Option key={tag.id}>{tag.name}</Select.Option>)}
                            </Select>
                        }
                    </div>
                    <div className="mt-3">
                        <label>Nội dung</label>
                        <JoditEditor value={content} tabIndex={1} onChange={setContent} />
                    </div>
                    <div className="text-center mtb">
                        <input type="submit" value={id ? "Sửa" : "Thêm mới"} />
                    </div>
                </form>
            </div>
        </div>
    );
}
