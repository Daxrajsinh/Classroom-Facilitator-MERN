import React from 'react';
import './homepage.css';
import doubt from './Doubt2.jpg';
import { NavLink, useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate();

    // Function to handle redirection to the login page
    const redirectToLogin = () => {
        // Redirect to the login page
        navigate('/login');
    };

    // Function to handle click on Get Started button
    const handleGetStarted = () => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('username') !== null;

        // If user is not logged in, redirect to login page
        if (!isLoggedIn) {
            redirectToLogin();
        } else {
            // If user is logged in, redirect to questions page or desired page
            navigate('/questions');
        }
    };

    return (
        <>
            <header Style="height:100%; margin-top:20vh; z-index:1; background-color:white">
                <div className="container mt-5 text-center">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-xs-12 mx-4">
                            <div className="contents">
                                <h2 className="head-title">DoubtOut <br /><small>- A Student Community and Doubt Solving Platform</small></h2>
                                <p>Find the best answer to your question, help others. <b>DoubtOut</b> is a community-based space to find and contribute answers to questions asked by your classmates !</p>
                            </div>
                            <div className="text-left">
                                {/* Bind handleGetStarted function to onClick event */}
                                <button onClick={handleGetStarted} className="btn btn-primary started-btn">Get Started</button>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 col-xs-12 mx-3">
                            <div className="intro-img">
                                <img src={doubt} alt="Not Loaded" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <footer className="text-center text-lg-start" Style="background-color: #4e63d7; position:absolute; bottom:0vh;width:100%;">
                <div className="text-center text-white p-3" Style="background-color: rgba(0, 0, 0, 0.2);">
                    © 2024 Made With ❤ by Doubtout
                </div>
            </footer>
        </>
    );
}

export default Homepage;