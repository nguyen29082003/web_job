import { message } from "antd";
import axiosClient from "./axiosClient";

class UserTypeOfWorkApi {
    getAll = (params) => {
        const url = '/userTypeOfWorks';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/userTypeOfWorks/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    postuserTypeOfWork = (params) => {
        const url = '/userTypeOfWorks';
        return axiosClient.post(url, params)
    };
    deleteuserTypeOfWork = (id) => {
        const url = `/userTypeOfWorks/${id}`;
        return axiosClient.delete(url)
    };
    edituserTypeOfWork = (params) => {
        const url = `/userTypeOfWorks/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const userTypeOfWorkApi = new UserTypeOfWorkApi();
export default userTypeOfWorkApi;