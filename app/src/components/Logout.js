import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './auth/auth';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
