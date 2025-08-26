import { message } from "antd";
import axiosClient from "./axiosClient";

class LoginApi {
    loginCompany = (params) => {
        const url = '/loginCompany';
        return axiosClient.post(url, params);
    };
    loginUser = (params) => {
        const url = '/loginUser';
        return axiosClient.post(url, params);
    };
}
const loginApi = new LoginApi();
export default loginApi;