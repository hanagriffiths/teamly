import api from "./apiClient";
import axios from "axios";

const postData = async (endpoint: string, data: object) => {
    try {
        const res = await api.post(endpoint, data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
              "POST error:",
              error.response?.data || error.message
            );
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

const getData = async (endpoint: string) => {
    try {
        const res = await api.get(endpoint);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
              "POST error:",
              error.response?.data || error.message
            );
        } else {
            console.error("Unexpected error:", error);
        }
    }
};

export {
    postData,
    getData
};