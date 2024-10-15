import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from './auth/auth';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await authService.register(username, email, password);
            console.log("Response from register:", response);
        } catch (error) {
            console.error("Registration error:", error);
            if (error.response) {
                console.error("Error details:", error.response.data);
            } else {
                console.error("Error message:", error.message);
            }
        }
    };

    return (
        <Form style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
            </Form.Group>
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
                    Register
                </Button>
            </div>

            <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link to="/login">Login</Link>
            </div>
        </Form>
    );
};

export default Register;
