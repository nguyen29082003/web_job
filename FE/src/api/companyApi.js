import { message } from "antd";
import axiosClient from "./axiosClient";

class CompanyApi {
    getAll = (params) => {
        const url = '/companys';
        return axiosClient.get(url, { params });
    };
    getOne = (params) => {
        const url = `/companys/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    getCompanySaveUser = (params) => {
        const url = `/getCompanySaveUser/${params}`;
        return axiosClient.get(url).then(data => {
            return data.data
        });
    };
    getCheck = (params) => {
        const url = '/checkCompanys';
        return axiosClient.get(url, { params });
    }
    postcompany = (params) => {
        const url = '/companys';
        return axiosClient.post(url, params).then(data => {
            return data.data;
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    deletecompany = (id) => {
        const url = `/companys/${id}`;
        return axiosClient.delete(url).then(data => {
            message.success("Xoá thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    };
    editcompany = (params) => {
        const url = `/companys/${params.id}`;
        return axiosClient.patch(url, params).then(data => {
            message.success("Sửa thành công!");
        }).catch(err => {
            message.error("Có lỗi xảy ra!");
        });
    }
}
const companyApi = new CompanyApi();
export default companyApi;