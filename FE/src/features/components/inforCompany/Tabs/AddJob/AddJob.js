import { DatePicker, Input, message, Select, Space } from "antd";
import JoditEditor from "jodit-react";
import { InputNumber } from 'antd';
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProvinces } from "sub-vn";
import { tagData } from "../../../../admin/Slice/tagSlice";
import { typeWorkData } from "../../../../admin/Slice/typeWorkSlice";
import { addwork } from "../../../../admin/Slice/workSlice";
import { FormatProvince } from "../../../../container/Functionjs";
import SpinLoad from "../../../Spin/Spin";
import dayjs from "dayjs";

export default function AddJob({ id }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, control } = useForm();

    useEffect(() => {
        dispatch(tagData({ status: 1 }));
        dispatch(typeWorkData({ status: 1 }));
    }, [dispatch]);
    const typeWorks = useSelector(state => state.typeWorks.typeWork || { data: { rows: [] } });
    const typeWork = typeWorks.data?.rows || [];
    const tags = useSelector(state => state.tags.tag || { data: { rows: [] } });
    const tagWork = tags.data?.rows || [];

    const [state, setState] = useState({
        load: false,
        typeofworkId: 2,
        address: "Hà Nội",
        tagId: [],
        nature: "Full Time",
        request: "Không yêu cầu",
        date: "",
        experience:""
    });

    const [interest, setInterest] = useState("");
    const [form, setForm] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = (data) => {
        if (
            !data.name || !data.price1 || !data.price2 || !state.request || !state.nature ||
            !interest || !description || !state.experience || !form || !state.address ||
            !data.phone || !data.email || !state.date ||
            !state.tagId || state.tagId.length === 0
        ) {
            message.warning("Bạn chưa nhập đầy đủ thông tin!");
            return;
        }

        setState(prev => ({ ...prev, load: true }));

        const action = addwork({
            workType: [{ typeofworkId: state.typeofworkId }],
            tagWork: state.tagId.map(id => ({ tagId: id })), // ✅ danh sách ngôn ngữ mới thêm
            companyId: id,
            name: data.name,
            status: 1,
            price1: data.price1,
            price2: data.price2,
            request: state.request,
            nature: state.nature,
            interest,
            description,
            exprience:state.experience,
            form,
            address: state.address,
            phone: data.phone,
            email: data.email,
            addressGoogle: "Không có",
            dealtime: state.date,
            
        });

        dispatch(action);
        navigate("/");
    };


    return (
        <div className="infor">
            <div className="heading">
                <div className="heading__title">
                    <h3>Đăng tuyển việc làm</h3>
                </div>
                <div className="heading__hr"></div>
            </div>

            <div className="content pb-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                    <div className="col-md-8">
                        <label>Tên công việc</label>
                        <input type="text" className="form-control" {...register("name")} />
                    </div>

                    <div className="col-md-4">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            value={state.address}
                            onChange={(e) => setState(prev => ({ ...prev, address: e.target.value }))}
                        />
                    </div>

                    </div>
                    <div className="form-group row">
                    <div className="col-md-6">
                        <label>Email</label>
                        <input type="text" className="form-control" {...register("email")} />
                    </div>
                    <div className="col-md-6">
                        <label>Số điện thoại</label>
                        <input type="text" className="form-control" {...register("phone")} />
                    </div>
                    
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6">
                            <label>Loại công việc</label>
                            <Select
                                value={state.typeofworkId}
                                onChange={(value) => setState(prev => ({ ...prev, typeofworkId: value }))}
                                className="form-control"
                                placeholder="Chọn loại công việc"
                            >
                                {typeWork && typeWork.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-md-6">
                            <label>Yêu cầu kỹ năng</label>
                            <Select
                                mode="multiple"
                                value={state.tagId}
                                onChange={(value) => setState(prev => ({ ...prev, tagId: value }))}
                                className="form-control"
                                placeholder="Chọn ngôn ngữ"
                            >
                                {tagWork && tagWork.map((item) => (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </div>


                    <div className="form-group row">
                        <div className="col-md-6">
                            <label>Mức lương từ</label>
                            <Controller
                                control={control}
                                name="price1"
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        className="form-control"
                                        style={{ width: '100%' }}
                                        min={0}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' Triệu VNĐ'}
                                        parser={value => value.replace(/[Triệu VNĐ,\s]/g, '')}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Mức lương đến</label>
                            <Controller
                                control={control}
                                name="price2"
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        className="form-control"
                                        style={{ width: '100%' }}
                                        min={0}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' Triệu VNĐ'}
                                        parser={value => value.replace(/[Triệu VNĐ,\s]/g, '')}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                    <div className="col-md-6">
                        <label>Yêu cầu</label>
                        <Select
                            value={state.request}
                            onChange={(value) => setState(prev => ({ ...prev, request: value }))}
                            className="form-control"
                            placeholder="Chọn yêu cầu"
                        >
                            <Select.Option value="Không yêu cầu">Không yêu cầu</Select.Option>
                            <Select.Option value="Cao đẳng">Cao đẳng</Select.Option>
                            <Select.Option value="Đại học">Đại học</Select.Option>
                        </Select>
                    </div>

                    <div className="col-md-6">
                        <label>Kinh nghiệm</label>
                        <Select
                            value={state.experience}
                            onChange={(value) => setState(prev => ({ ...prev, experience: value }))}
                            className="form-control"
                            placeholder="Chọn kinh nghiệm"
                        >
                            <Select.Option value="Không yêu cầu kinh nghiệm">Không yêu cầu </Select.Option>
                            <Select.Option value="1-3 năm">1-3 năm</Select.Option>
                            <Select.Option value="3-5 năm">3-5 năm</Select.Option>
                            <Select.Option value="5-10 năm">5-10 năm</Select.Option>
                            <Select.Option value="Trên 10 năm">Trên 10 năm</Select.Option>
                        </Select>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-group col-md-6">
                        <label>Hình thức làm việc</label>
                        <Select
                        value={state.nature}
                        onChange={(value) =>
                            setState((prev) => ({ ...prev, nature: value }))
                        }
                        className="form-control"
                        >
                        <Select.Option value="Full Time">Full Time</Select.Option>
                        <Select.Option value="Part Time">Part Time</Select.Option>
                        <Select.Option value="Remote">Remote</Select.Option>
                        </Select>
                    </div>

                    <div className="form-group col-md-6">
                        <label>Thời hạn tuyển</label>
                        <DatePicker
                        className="form-control"
                        format="YYYY/MM/DD"
                        onChange={(date, dateString) =>
                            setState((prev) => ({ ...prev, date: dateString }))
                        }
                        />
                    </div>
                    </div>

                    <div className="form-group">
                        <label>Mô tả công việc</label>
                        <JoditEditor value={description} onChange={setDescription} />
                    </div>

                    <div className="form-group">
                        <label>Yêu cầu công việc</label>
                        <JoditEditor value={form} onChange={setForm} />
                    </div>
                    <div className="form-group">
                        <label>Quyền lợi</label>
                        <JoditEditor value={interest} onChange={setInterest} />
                    </div>
                    

                    <div className="text-center mtb">
                        {state.load ? <SpinLoad /> : <input type="submit" value="Tạo công việc" className="btn btn-primary" />}
                    </div>
                </form>
            </div>
        </div>
    );
}
