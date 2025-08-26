import { message } from "antd";
import axiosClient from "./axiosClient";

class SaveWorkApi {
    getAll = (params) => {
        const url = '/saveWorks';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/saveWorks/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    postsaveWork = (params) => {
        const url = '/saveWorks';
        return axiosClient.post(url, params).then(data => {
            message.success("Đã lưu công việc!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletesaveWork = (id) => {
        const url = `/deleteSaveWorks/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Huỷ lưu công việc!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editsaveWork = (params) => {
        const url = `/saveWorks/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const saveWorkApi = new SaveWorkApi();
export default saveWorkApi;