import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './questions.css';
import '../Header/header.css';
import Posts from './Posts';
import Pagination from './Pagination';

export default function Search() {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [originalQuestions, setOriginalQuestions] = useState([]);

    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const fetchAnswers = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/answer/fetchanswer", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch answers');
            }
    
            const data = await response.json();
            setAnswers(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (location.state !== null) {
            setQuestions(location.state);
            setOriginalQuestions(location.state);
        }
        fetchAnswers();
    }, [location.state]);

    const sortByVotes = () => {
        const sortedQuestions = [...questions].sort((a, b) => b.votes - a.votes);
        setQuestions(sortedQuestions);
    };

    const filteredAnsweredQue = () => {
        const ansobj = {};
        answers.forEach(ans => {
            ansobj[ans.questionid] = 1;
        });
        const answeredQuestions = originalQuestions.filter(que => ansobj[que._id] === 1);
        setQuestions(answeredQuestions);
    };

    const filteredUnansweredQue = () => {
        const ansobj = {};
        answers.forEach(ans => {
            ansobj[ans.questionid] = 1;
        });
        const unansweredQuestions = originalQuestions.filter(que => ansobj[que._id] === undefined);
        setQuestions(unansweredQuestions);
    };

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <>
            <div Style="height:100%; margin-top:13vh; z-index:1; background-color:white">
                <div class="">
                    <div className="stack-index">
                        <div className="stack-index-content" >
                            {!isAdmin && <Sidebar />}
                            <div className="main">
                                <div className="main-container">
                                    <div className="main-top">
                                        <h2>All Questions</h2>
                                        <NavLink to="/editor"><button className='btn-question'>Ask Question</button></NavLink>
                                    </div>
                                    <div className='main-desc'>
                                        <p>{questions.length} Questions</p>
                                        <div className="main-filter">
                                            <div className="main-tabs">
                                                <div className="main-tab">
                                                    <NavLink className="tab" onClick={filteredAnsweredQue}>Answered</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink onClick={sortByVotes}>Votes</NavLink>
                                                </div>
                                                <div className="main-tab">
                                                    <NavLink onClick={filteredUnansweredQue}>Unanswered</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="questions">
                                        <div className="question">
                                            <Posts posts={currentPosts} />
                                        </div>
                                    </div>
                                    <div className="container">
                                        <Pagination postsPerPage={postPerPage} totalPosts={questions.length} paginate={paginate} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
