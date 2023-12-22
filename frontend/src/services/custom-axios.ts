import Axios from 'axios';

const customAxios = {
    withToken(token: string) {
        return Axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            timeout: 5000,
            headers: { Authorization: 'Bearer ' + token },
        });
    },
    withoutToken() {
        return Axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            timeout: 5000,
        });
    },
};

export default customAxios;
