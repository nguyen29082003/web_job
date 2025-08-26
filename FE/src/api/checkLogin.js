import { message } from "antd";
import axiosClient from "./axiosClient";

class CheckLoginApi {
    checkLogin = (params) => {
        const url = '/checkLogin';
        // if (localStorage.getItem("token")) {
        return axiosClient.get(url);
        // } else {
        //     return '';
        // }
    };
    // checkLoginUser = (params) => {
    //     const url = '/checkUserLogin';
    //     if (localStorage.getItem("token")) {
    //         return axiosClient.get(url);
    //     } else {
    //         return '';
    //     }
    // };
}
const checkLoginApi = new CheckLoginApi();
export default checkLoginApi;