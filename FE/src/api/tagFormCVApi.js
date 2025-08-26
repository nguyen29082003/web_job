import { message } from "antd";
import axiosClient from "./axiosClient";

class TagFormCVApi {
    getAll = (params) => {
        const url = '/tagFormCVs';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/tagFormCVs/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    posttagFormCV = (params) => {
        const url = '/tagFormCVs';
        return axiosClient.post(url, params)
    };
    deletetagFormCV = (id) => {
        const url = `/tagFormCVs/${id}`;
        return axiosClient.delete(url)
    };
    edittagFormCV = (params) => {
        const url = `/tagFormCVs/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const tagFormCVApi = new TagFormCVApi();
export default tagFormCVApi;