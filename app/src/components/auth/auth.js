import api from '../../api/axios';

const register = async (username, email, password) => {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
};

const login = async (email, password) => {
    const response = await api.post('/auth/signin', { email, password });
    console.log('Login response:', response.data);
    const { access_token, username } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('username', username);
    return { access_token, username };
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

const authService = {
    register,
    login,
    logout
};

export default authService;
