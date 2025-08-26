import { message } from "antd";
import axiosClient from "./axiosClient";

class UserTagApi {
    getAll = (params) => {
        const url = '/userTags';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/userTags/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    postuserTag = (params) => {
        const url = '/userTags';
        return axiosClient.post(url, params)
    };
    deleteuserTag = (id) => {
        const url = `/userTags/${id}`;
        return axiosClient.delete(url)
    };
    edituserTag = (params) => {
        const url = `/userTags/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const userTagApi = new UserTagApi();
export default userTagApi;