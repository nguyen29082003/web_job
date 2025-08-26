import { message } from "antd";
import axiosClient from "./axiosClient";

class TypeWorkApi {
    getAll = (params) => {
        const url = '/typeWorks';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/typeWorks/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    posttypeWork = (params) => {
        const url = '/typeWorks';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletetypeWork = (id) => {
        const url = `/typeWorks/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    edittypeWork = (params) => {
        const url = `/typeWorks/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const typeWorkApi = new TypeWorkApi();
export default typeWorkApi;