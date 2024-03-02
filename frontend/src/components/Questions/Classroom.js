import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './questions.css';
import Pagination from './Pagination';
import Posts from './Posts';

export default function Classroom() {
  const { tagName } = useParams();
  // console.log(tagName)
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(4);
  // const [loading, setLoading] = useState(true);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  // Fetch questions by tag name
  const fetchQuestionsByTag = async (tagName) => {
    console.log("Called Fetch questions by tag");
    try {
      const response = await fetch(`http://localhost:8000/api/question/fetchQuePertag/${tagName}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions by tag');
      }

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestionsByTag(tagName);
  }, [tagName]);

  // Function to sort questions by higher votes
  const sortByVotes = async () => {
    await fetch(`http://localhost:8000/api/question/fetchQueByHigherVotesByTag/${tagName}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => setQuestions(data));
  }

  // Function to filter all the questions which are answered.
  const answeredQuestions = async () => {
    await fetch(`http://localhost:8000/api/question/answeredQueByTag/${tagName}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => setQuestions(data));
  }

  const unansweredQuestions = async () => {
    await fetch(`http://localhost:8000/api/question/unansweredQueByTag/${tagName}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => setQuestions(data));
  }

  // Pagination logic
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNum => setCurrentPage(pageNum);

  return (
    <div Style="height:100%; margin-top:13vh; z-index:1; background-color:white">
      <div className="stack-index">
        <div className="stack-index-content">
          <div className="main">
            <div className="main-container">
              <div className="main-top">
                <h2 style={{
                        fontFamily: "-apple-system,Georgia, 'Times New Roman', Times, serif",
                      }}>All Questions</h2>
                {!isAdmin && <NavLink to="/editor"><button className='btn-question'>Ask Question</button></NavLink>}
              </div>
              <div className='main-desc'>
                <p>{questions.length} Questions</p>
                <div className="main-filter">
                  <div className="main-tabs">
                    <div className="main-tab">
                      <NavLink onClick={answeredQuestions}>Answered</NavLink>
                    </div>
                    <div className="main-tab">
                      <NavLink onClick={sortByVotes}>Votes</NavLink>
                    </div>
                    <div className="main-tab">
                      <NavLink onClick={unansweredQuestions}>Unanswered</NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="questions" >
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
  );
}
