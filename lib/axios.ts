
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use((res) => res, (error) => {
    const message = error.response?.data.message || "Something Went Wrong"
    return Promise.reject(message)
})

export default axiosInstance;