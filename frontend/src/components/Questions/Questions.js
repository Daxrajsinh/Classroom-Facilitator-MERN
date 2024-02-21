import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
// import parse from 'html-react-parser';
import Sidebar from '../Sidebar/Sidebar';
import './questions.css';
import { FilterList } from '@mui/icons-material';
import '../Header/header.css';
import Posts from './Posts';
import Pagination from './Pagination';
import Classroom from './Classroom';
import { fontGrid } from '@mui/material/styles/cssUtils';

export default function Questions() {

    // const navigate = useNavigate();
    const [questions, setQuestions] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTag, setSelectedTag] = useState(null);
    const [userTags, setUserTags] = useState([]);

    // for pagination
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    //for pop-up of filter...
    // const [showFilter, setShowFilter] = useState(false);

    // fetch all the questions
    const fetchAllQuestions = async () => {
        await fetch("http://localhost:8000/api/question/fetchquestions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }




    // Function to sort questions by higher votes question displays first
    const sortByVotes = async () => {
        await fetch("http://localhost:8000/api/question/fetchQueByHigherVotes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    // Function to filter all the questions which are answered.

    const answeredQuestions = async()=>{
        await fetch("http://localhost:8000/api/question/answeredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    const unansweredQuestions = async() => {
        await fetch("http://localhost:8000/api/question/unansweredQue", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data))
    }

    const fetchAlltags = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/question/usedtags", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }
            
            const data = await response.json();
            setTags(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchQuestionsByTag = async (tagName) => {
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
            setSelectedTag(tagName);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchUserTags = async () => {
        try {
            const username = localStorage.getItem('username');
            // Fetch tags based on user's activity (answered or asked questions)
            const response = await fetch(`http://localhost:8000/api/question/usedtags/${username}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user tags');
            }
    
            const data = await response.json();
            setUserTags(data);
            // console.log(data.length)
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
      // isAdmin = localStorage.getItem('isAdmin') === 'true';
      
      if (isAdmin) {
          fetchAlltags();
      } else {
          fetchUserTags();
      }
  }, []);

    // logic to find index of posts to display questions
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <div
        style={{
          height: "100%",
          marginTop: "13vh",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <div className="">
          <div className="stack-index">
            <div className="stack-index-content">
            {isAdmin ?  '': <Sidebar/> }
              <div className="main">
                <div className="main-container">
                  <div className="main-top">
                    {isAdmin ? <h2>All Classrooms</h2> : <h2>Your Classrooms</h2> }                                 
                  </div>
                  <div className="main-desc">
                      <div className="main-filter">
                          <div className="main-tabs">
                              {isAdmin ? (
                                  tags.length === 0 ? (
                                      <>      
                                          <p style={{ fontSize: "1.5rem", color: "grey", fontStyle: "italic" }}>
                                              You currently don't have any available classrooms for enrollment. Please consider asking questions to create one.
                                          </p>
                                          <div style={{ textAlign: "center" , marginLeft: "400px"}}>
                                              <img src="https://e7.pngegg.com/pngimages/48/293/png-clipart-painted-3d-3d-3d-villain-doubt-cartoon-creative-3d.png" style={{ width: "250px", height: "250px" }} />
                                          </div>
                                          <div style={{marginTop: "40px", marginLeft: "470px"}}>
                                              <NavLink to="/editor"><button>Ask Question</button></NavLink>
                                          </div>
                                      </>
                                  ) : (
                                      tags.map((tag) => (
                                          <div className="classroom-box" key={tag}>
                                              <div className="classroom-header">
                                                  <div className="class-box">
                                                      <div className="blue-band">
                                                          <NavLink to={`/classroom/${tag}`} >
                                                              {tag}
                                                          </NavLink>
                                                          <div className="classroom-icons">
                                                              <i className="material-icons">people</i>
                                                              <i className="material-icons">notifications</i>
                                                              <i className="material-icons">settings</i>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      ))
                                  )
                              ) : (
                                  userTags.length === 0 ? (
                                      <>      
                                          <p style={{ fontSize: "1.5rem", color: "grey", fontStyle: "italic" }}>
                                              You currently don't have any available classrooms for enrollment. Please consider asking questions to create one.
                                          </p>
                                          <div style={{ textAlign: "center" , marginLeft: "400px"}}>
                                              <img src="https://e7.pngegg.com/pngimages/48/293/png-clipart-painted-3d-3d-3d-villain-doubt-cartoon-creative-3d.png" style={{ width: "250px", height: "250px" }} />
                                          </div>
                                          <div style={{marginTop: "40px", marginLeft: "470px"}}>
                                              <NavLink to="/editor"><button>Ask Question</button></NavLink>
                                          </div>
                                      </>
                                  ) : (
                                      userTags.map((tag) => (
                                          <div className="classroom-box" key={tag}>
                                              <div className="classroom-header">
                                                  <div className="class-box">
                                                      <div className="blue-band">
                                                          <NavLink to={`/classroom/${tag}`} >
                                                              {tag}
                                                          </NavLink>
                                                          <div className="classroom-icons">
                                                              <i className="material-icons">people</i>
                                                              <i className="material-icons">notifications</i>
                                                              <i className="material-icons">settings</i>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      ))
                                  )
                              )}
                          </div>
                      </div>
                  </div>

                  {/* Pagination component */}
                  <div className="container">
                    <Pagination
                      postsPerPage={postPerPage}
                      totalPosts={questions.length}
                      paginate={paginate}
                    />
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