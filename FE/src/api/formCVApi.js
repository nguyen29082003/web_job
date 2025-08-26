import { message } from "antd";
import axiosClient from "./axiosClient";

class FormCVApi {
    getAll = (params) => {
        const url = '/formCVs';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/formCVs/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    postformCV = (params) => {
        const url = '/formCVs';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deleteformCV = (id) => {
        const url = `/formCVs/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editformCV = (params) => {
        const url = `/formCVs/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const formCVApi = new FormCVApi();
export default formCVApi;