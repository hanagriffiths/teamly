import api from "./apiClient";

const postData = async (endpoint: string, data: object) => {
    try {
        const res = await api.post(endpoint, data);
        return res.data;
    } catch (error) {
        console.error('POST error: ', error.response?.data || error.message);
        throw error;
    }
};

const getData = async (endpoint: string) => {
    try {
        const res = await api.get(endpoint);
        return res.data;
    } catch (error) {
        console.error('GET error: ', error.response?.data || error.message);
        throw error;
    }
};

export {
    postData,
    getData
};