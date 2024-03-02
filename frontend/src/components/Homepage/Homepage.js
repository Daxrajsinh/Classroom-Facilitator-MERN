import React from 'react';
import './homepage.css';

import { useNavigate } from 'react-router-dom';

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
                                <h2 className="head-title">DoubtOut <br /><h3>A Student Classroom Faciliator and Doubt Solving Platform</h3></h2>
                                <br></br>
                                <p>Find the best answer to your question, help others. <b>DoubtOut</b> is a community-based space to find and contribute answers to questions asked by your classmates !</p>
                            </div>
                            <div className="text-center">
                                {/* Bind handleGetStarted function to onClick event */}
                                {/* <button onClick={handleGetStarted} className="btn btn-primary started-btn">Get Started</button> */}
                                <button onClick={handleGetStarted} className="button-color">Get Started</button>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 col-xs-12 mx-3">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
        <div className="carousel-item active">
            <img className="d-block w-100 carousel-image" src="https://i.pinimg.com/564x/e8/80/25/e8802514ddad04c96f1235cc208ba247.jpg" alt="First slide"/>
        </div>
        <div className="carousel-item">
            <img className="d-block w-100 carousel-image" src="https://st2.depositphotos.com/5178011/8137/v/450/depositphotos_81374190-stock-illustration-doubting-man.jpg" alt="Second slide"/>
        </div>
        <div className="carousel-item">
            {/* <img className="d-block w-100 carousel-image" src="https://i1.wp.com/blog.doubtbuddy.com/wp-content/uploads/2021/10/doubttt.jpg?resize=970%2C667&ssl=1" alt="Third slide"/> */}
            <img className="d-block w-100 carousel-image" src="https://cdn.vectorstock.com/i/1000x1000/89/60/cute-kid-thinking-idea-on-white-background-vector-47088960.webp" alt="Third slide"/>
        </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
    </a>
</div>

                        </div>
                    </div>
                </div>
            </header>
            {/* <footer className="text-center text-lg-start" Style="background-color: #4e63d7; position:absolute; bottom:0vh;width:100%;"> */}
            <footer className="text-center text-lg-start" Style="background-color: #4e63d7; position:absolute; bottom:0vh;width:100%;">
                <div className="text-center text-white p-3" Style="background-color: rgb(25, 113, 2)">
                    Made With ❤ by Doubtout (© 2024 )
                </div>
            </footer>
        </>
    );
}

export default Homepage;