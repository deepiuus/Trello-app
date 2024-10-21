import React from 'react';
import { Button } from 'react-bootstrap';
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
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;
