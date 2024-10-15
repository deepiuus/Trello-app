import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const username = localStorage.getItem('username');

    return (
        <div className="text-center">
            <h1>Welcome {username}!</h1>
            {username ? (
                <Link to={`/u/${username}/boards`}>
                    <button className="btn btn-primary">Go to Your Boards</button>
                </Link>
            ) : (
                <p>Please log in to see your boards.</p>
            )}
        </div>
    );
};

export default Home;
