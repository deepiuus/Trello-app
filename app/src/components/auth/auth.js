import axios from '../../api/axios';

const register = async (username, email, password) => {
    const response = await axios.post('/auth/signup', { username, email, password });
    return response.data;
};

const authService = {
    register
};

export default authService;
