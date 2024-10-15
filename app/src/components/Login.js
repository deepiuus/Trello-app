import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from './auth/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { username } = await authService.login(email, password);
            console.log('Logged in as:', username);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setErrorMessage(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </Form.Group>

            <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" className="mt-3 mb-3">
                    Login
                </Button>
            </div>

            {errorMessage && (
                <div className="alert alert-danger mt-3">
                    {errorMessage}
                </div>
            )}
        </Form>
    );
};

export default Login;
