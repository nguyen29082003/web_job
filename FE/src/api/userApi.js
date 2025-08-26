import { message } from "antd";
import axiosClient from "./axiosClient";

class UserApi {
    getAll = (params) => {
        const url = '/users';
        return axiosClient.get(url, { params });
    };
    getAllId = (params) => {
        const url = '/userId';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/users/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    getUserSaveWork = (params) => {
        const url = `/getUserSaveWork/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    postuser = (params) => {
        const url = '/users';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm công việc thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deleteuser = (id) => {
        const url = `/users/${id}`;
        return axiosClient.delete(url)
    };
    edituser = (params) => {
        const url = `/users/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const userApi = new UserApi();
export default userApi;