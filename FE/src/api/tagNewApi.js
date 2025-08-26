import { message } from "antd";
import axiosClient from "./axiosClient";

class TagNewApi {
    getAll = (params) => {
        const url = '/tagNews';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/tagNews/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    posttagNew = (params) => {
        const url = '/tagNews';
        return axiosClient.post(url, params)
    };
    deletetagNew = (id) => {
        const url = `/tagNews/${id}`;
        return axiosClient.delete(url)
    };
    edittagNew = (params) => {
        const url = `/tagNews/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const tagNewApi = new TagNewApi();
export default tagNewApi;