import axiosInstance from "@/lib/axios";
import { API_ROUTES } from "@/constants/apiRoutes";

export const getImages = async () => {
    const res = await axiosInstance.get(API_ROUTES.IMAGES.BASE);
    return res.data?.data || [];
};

export const uploadImages = async (formData: FormData) => {
    const res = await axiosInstance.post(API_ROUTES.IMAGES.UPLOAD, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
};

export const updateImage = async (id: string, formData: FormData) => {
    const res = await axiosInstance.put(`${API_ROUTES.IMAGES.BASE}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
};

export const deleteImage = async (id: string) => {
    const res = await axiosInstance.delete(`${API_ROUTES.IMAGES.BASE}/${id}`);
    return res.data;
};

export const reorderImages = async (orderedIds: string[]) => {
    const res = await axiosInstance.post(API_ROUTES.IMAGES.REORDER, { orderedIds });
    return res.data?.data;
};
