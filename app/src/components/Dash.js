import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import authService from './auth/auth';

const Dash = ({ user }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchWorkspaces = async () => {
                try {
                    console.log('Fetching workspaces from authService');
                    const response = await authService.getWorkspaces();
                    console.log('API response (workspaces):', response);
                    setWorkspaces(response);
                } catch (error) {
                    console.error('Error fetching workspaces:', error);
                }
            };
            const fetchBoards = async () => {
                try {
                    console.log('Fetching boards from authService');
                    const response = await authService.getBoards();
                    console.log('API response (boards):', response);
                    setBoards(response);
                } catch (error) {
                    console.error('Error fetching boards:', error);
                }
            };
            fetchWorkspaces();
            fetchBoards();
        }
    }, [navigate]);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div>
            <h2>Workspaces</h2>
            {workspaces.length > 0 ? (
                <ListGroup>
                    {workspaces.map((workspace, index) => {
                        return (
                            <ListGroup.Item key={index} onClick={() => navigate(`/w/${workspace.name}`)}>
                                <strong>{capitalize(workspace.name)}</strong>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            ) : (
                <p>No workspaces found.</p>
            )}
            <h2>Boards</h2>
            {boards.length > 0 ? (
                <ListGroup>
                    {boards.map((board, index) => {
                        return (
                            <ListGroup.Item key={index} onClick={() => navigate(`/b/${board.name}`)}>
                                <strong>{capitalize(board.name)}</strong>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            ) : (
                <p>No boards found.</p>
            )}
        </div>
    );
}

export default Dash;
