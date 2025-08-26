import { message } from "antd";
import axiosClient from "./axiosClient";

class NewApi {
    getAll = (params) => {
        const url = '/news';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/news/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    postnew = (params) => {
        const url = '/news';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletenew = (id) => {
        const url = `/news/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editnew = (params) => {
        const url = `/news/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const newApi = new NewApi();
export default newApi;