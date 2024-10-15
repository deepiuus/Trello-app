import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './Home';

function App() {
    const user = localStorage.getItem('username');

    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Trello App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>
                        <Logout />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-3">
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h1>Home</h1>
                            <Home />
                        </div>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<h1>404 not found</h1>} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
