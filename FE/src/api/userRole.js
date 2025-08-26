import { message } from "antd";
import axiosClient from "./axiosClient";

class UserRoleApi {
    getAll = (params) => {
        const url = '/userRoles';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/userRoles/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    postuserRole = (params) => {
        const url = '/userRoles';
        return axiosClient.post(url, params).then(data => {
            message.success("Thêm thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deleteuserRole = (id) => {
        const url = `/userRoles/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    edituserRole = (params) => {
        const url = `/userRoles/${params.idEdit}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const userRoleApi = new UserRoleApi();
export default userRoleApi;