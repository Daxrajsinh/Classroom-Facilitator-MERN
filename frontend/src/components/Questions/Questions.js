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

export default function Questions() {

    // const navigate = useNavigate();
    const [questions, setQuestions] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTag, setSelectedTag] = useState(null);
    const [userTags, setUserTags] = useState([]);

    // for pagination
    const [postPerPage] = useState(4);
    const [currentPage, setcurrentPage] = useState(1);

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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAlltags();
        fetchUserTags();
        // fetchAllQuestions();
        // FindFrequencyOfAns();
        // fetchVotes();

    }, [])

    // logic to find index of posts to display questions
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = questions.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setcurrentPage(pageNum);

    return (
        <>
            <div style={{ height: "100%", marginTop: "13vh", zIndex: 1, backgroundColor: "white" }}>
        <div className="">
          <div className="stack-index">
            <div className="stack-index-content">
              <Sidebar />
              <div className="main">
                <div className="main-container">
                  <div className="main-top">
                    <h2>All Classrooms</h2>
                  </div>
                  <div className='main-desc'>
                    <div className="main-filter">
                      <div className="main-tabs">
                        {/* for admin */}
                        {/* {tags.map(tag => (
                          <div key={tag} className="main-tab">
                            <NavLink to={`/classroom/${tag}`}>{tag}</NavLink>
                          </div>
                        ))} */}

                        {/* for users */}
                        {userTags.map(tag => (
                            <div key={tag} className="main-tab">
                                <NavLink to={`/classroom/${tag}`}>{tag}</NavLink>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Pagination component */}
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