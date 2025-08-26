import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Form,
  Select,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import JoditEditor from "jodit-react";
import workApi from "../../../../../api/workApi";

const { Title } = Typography;

export default function EditJobForm({ id, onSubmit, onCancel }) {
  const { control, handleSubmit, reset } = useForm();

  const typeWork = useSelector(
    (state) => state.typeWorks.typeWork?.data?.rows || []
  );
  const tagWork = useSelector(
    (state) => state.tags.tag?.data?.rows || []
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await workApi.getOne(id);
      setData(result);
      reset({
        id: result.id,
        name: result.name,
        address: result.address,
        email: result.email,
        phone: result.phone,
        workType: result.TypeOfWorks?.[0]?.id || null,
        tagWork: result.Tags?.map((tag) => tag.id) || [],
        price1: result.price1,
        price2: result.price2,
        request: result.request,
        nature: result.nature,
        dealtime: moment(result.dealtime),
        exprience: result.exprience,
        description: result.description,
        form: result.form,
        interest: result.interest,
      });
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id, reset]);

  if (!data) return null;

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <Title level={5} style={{ textAlign: "center" }}>Chỉnh sửa công việc</Title>

      <Form layout="vertical" onFinish={handleSubmit((formData) => {
        const payload = {
          ...formData,
          id,
          tagIds: formData.tagWork,
          typeOfWorkIds: [formData.workType],
          dealtime: formData.dealtime?.format("YYYY-MM-DD"),
          status: 1, // giá trị mặc định cho status
        };
        onSubmit(payload);
      })}>
        <Form.Item label="Tên công việc">
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ">
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item label="Email">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Số điện thoại">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Loại công việc">
              <Controller
                name="workType"
                control={control}
                render={({ field }) => (
                  <Select {...field} onChange={field.onChange}>
                    {typeWork.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Yêu cầu kỹ năng">
              <Controller
                name="tagWork"
                control={control}
                render={({ field }) => (
                  <Select mode="multiple" {...field} onChange={field.onChange}>
                    {tagWork.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Mức lương từ">
              <Controller
                name="price1"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} addonAfter="triệu VNĐ" />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mức lương đến">
              <Controller
                name="price2"
                control={control}
                render={({ field }) => (
                  <Input type="number" {...field} addonAfter="triệu VNĐ" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Yêu cầu học vấn">
              <Controller
                name="request"
                control={control}
                render={({ field }) => (
                  <Select {...field} onChange={field.onChange}>
                    <Select.Option value="Đại học">Đại học</Select.Option>
                    <Select.Option value="Cao đẳng">Cao đẳng</Select.Option>
                    <Select.Option value="Không yêu cầu">Không yêu cầu</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Hình thức làm việc">
              <Controller
                name="nature"
                control={control}
                render={({ field }) => (
                  <Select {...field} onChange={field.onChange}>
                    <Select.Option value="Full Time">Full Time</Select.Option>
                    <Select.Option value="Part Time">Part Time</Select.Option>
                    <Select.Option value="Remote">Remote</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Hạn nộp hồ sơ">
              <Controller
                name="dealtime"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    format="YYYY/MM/DD"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Yêu cầu kinh nghiệm">
              <Controller
                name="exprience"
                control={control}
                render={({ field }) => (
                  <Select {...field} onChange={field.onChange}>
                    <Select.Option value="Không yêu cầu kinh nghiệm">Không yêu cầu</Select.Option>
                    <Select.Option value="1-3 năm">1-3 năm</Select.Option>
                    <Select.Option value="3-5 năm">3-5 năm</Select.Option>
                    <Select.Option value="5-10 năm">5-10 năm</Select.Option>
                    <Select.Option value="Trên 10 năm">Trên 10 năm</Select.Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Mô tả công việc">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <JoditEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </Form.Item>

        <Form.Item label="Yêu cầu">
          <Controller
            name="form"
            control={control}
            render={({ field }) => (
              <JoditEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </Form.Item>

        <Form.Item label="Quyền lợi">
          <Controller
            name="interest"
            control={control}
            render={({ field }) => (
              <JoditEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            Lưu thay đổi
          </Button>
          <Button onClick={onCancel}>Hủy thay đổi</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
