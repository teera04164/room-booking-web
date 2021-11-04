import axios from "axios";
// import { toast } from 'react-toastify';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5002' : process.env.REACT_APP_BACKEND;

// axios.interceptors.request.use(
//     (config) => {
//         const userInfo = localStorage.getItem("userInfo");
//         if (userInfo) {
//             let obj = JSON.parse(userInfo)
//             config.headers["token"] = obj.token;
//         }

//         return config;
//     },
//     (error) => {
//         Promise.reject(error);
//     }
// );

// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     function (error) {
//         const originalRequest = error.config;
//         let refreshToken = localStorage.getItem("refreshToken");

//         if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             return axios
//                 .post(`${baseUrl}/auth/refresh_token`, { refreshToken: refreshToken })
//                 .then((res) => {
//                     if (res.status === 200) {
//                         localStorage.setItem("accessToken", res.data.accessToken);
//                         console.log("Access token refreshed!");
//                         return axios(originalRequest);
//                     }
//                 });
//         }
//         if (error.response && error.response.data) {
//             handle403(error)
//         }
//         return Promise.reject(error);
//     }
// );


// const handle403 = (error) => {
//     const { RESULT_STATUS, RESULT_MESSAGE } = error.response.data
//     toast.error(`${RESULT_STATUS} ${RESULT_MESSAGE}`, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//     });
// }

const api = {
    getListTimeBooking: (param) => {
        return axios.get(`${baseUrl}/time-booking`, param);
    },
    getBooking: (params) => {
        return axios.get(`${baseUrl}/booking`, { params });
    },
    saveBooking: (body) => {
        return axios.post(`${baseUrl}/booking`, body);
    },
    adminEditCourse: (body) => {
        return axios.put(`${baseUrl}/admin/courses`, body);
    },
    getProtected: () => {
        return axios.get(`${baseUrl}/protected_resource`);
    },
};

export default api;