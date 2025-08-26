import axios from "axios";
import queryString from "query-string";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase"; // ✅ app đã được khởi tạo ở firebase.js

const auth = getAuth(app);

const getFirebaseToken = async () => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    return await currentUser.getIdToken();
  }

  const hasRememberAccount = localStorage.getItem("token");
  if (!hasRememberAccount) return null;

  return new Promise((resolve, reject) => {
    const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(null);
      } else {
        const token = await user.getIdToken();
        console.log("✅ Firebase token:", token);
        resolve(token);
      }
      unregisterAuthObserver();
    });
  });
};

const axiosClient = axios.create({
    baseURL: `http://localhost:4000`,
    headers: {
        'content-type': "application/json",
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    // const token = await getFirebasetoken();
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.authorization = `Bearer ${token}`
        //console.log(token);
    }
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;
