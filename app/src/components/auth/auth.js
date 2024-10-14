import api from '../../api/axios';

const register = async (username, email, password) => {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
};

const login = async (email, password) => {
    const response = await api.post('/auth/signin', { email, password });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return access_token;
};

const logout = () => {
    localStorage.removeItem('token');
};

const authService = {
    register,
    login,
    logout
};

export default authService;
