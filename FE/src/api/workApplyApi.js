import { message } from "antd";
import axiosClient from "./axiosClient";

class WorkApplyApi {
    getAll = (params) => {
        const url = '/workApplys';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/workApplys/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    checkWorkApply = (params) => {
        const url = `/checkWorkApply/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    }
    checkUserApply = (params) => {
        const url = `/checkUserApply/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    }
    postworkApply = (params) => {
        const url = '/workApplys';
        return axiosClient.post(url, params).then(data => {
            message.success("Ứng tuyển thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deleteworkApply = (id) => {
        const url = `/workApplys/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editworkApply = (params) => {
        const url = `/workApplys/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const workApplyApi = new WorkApplyApi();
export default workApplyApi;