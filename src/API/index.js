import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5002' : process.env.REACT_APP_BACKEND;

axios.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            let obj = JSON.parse(userInfo)
            config.headers['Authorizationd'] = `Bearer ${obj.token?.accessToken}`
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;

        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            let obj = JSON.parse(userInfo)
            let refreshToken = obj.token.refreshToken
            if (refreshToken && error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                return axios
                    .post(`${baseUrl}/auth/refresh_token`, { refreshToken: refreshToken })
                    .then((res) => {
                        if (res.status === 200) {
                            const { accessToken } = res.data
                            localStorage.setItem("userInfo", JSON.stringify({ ...obj, token: { ...obj.token, accessToken } }));
                            return axios(originalRequest);
                        }
                    });
            }
        }

        if (error?.response?.data) {
            handle403(error)
        }
        return Promise.reject(error);
    }
);


const handle403 = (error) => {
    // const { RESULT_STATUS, RESULT_MESSAGE } = error.response.data
    toast.error(`session expire please login again!!`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    setTimeout(() => {
        window.location.replace('/login')
    }, 5000);

}

const api = {
    getListTimeBooking: async (param) => {
        const { data } = await axios.get(`${baseUrl}/time-booking`, param);
        return data
    },
    getListTBuilding: async (param) => {
        const { data } = await axios.get(`${baseUrl}/building`, param);
        return data
    },
    getBooking: async (params) => {
        const { data } = await axios.get(`${baseUrl}/booking`, { params });
        return data
    },
    saveBooking: async (params) => {
        const { data } = await axios.post(`${baseUrl}/booking`, params);
        return data
    },
    deleteBooking: async (params) => {
        const { data } = await axios.delete(`${baseUrl}/booking`, { params });
        return data
    },
    login: async (params) => {
        const { data } = await axios.post(`${baseUrl}/auth/login`, params)
        return data;
    },
    logOut: async (params) => {
        const { data } = await axios.post(`${baseUrl}/auth/logout`, params)
        return data;
    },
};

export default api;