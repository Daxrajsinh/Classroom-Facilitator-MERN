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

    useEffect(() => {
        fetchAlltags();
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
                        {tags.map(tag => (
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
                    {/* 
                    <div class="d-flex flex-column flex-shrink-0 p-3 col-md-7" Style="background-color:white;">
                        <div className="d-flex d-flex-row align-items-center">
                            <h1 className='mx-4'>see here All Questions</h1>

                            <button className="btn btn-primary mx-4" Style="position:absolute; right:0px;" onClick={askQue}>See Here Ask Question</button>
                        </div>


                        {questions.length > 0 && (
                            <ul>

                                {questions.map(question => (

                                    <div class="card mt-1">

                                        <div class="card-body">
                                            <div className="d-flex flex-row">

                                                <div class="d-flex flex-column flex-shrink-0 col-md-2 mt-4 mx-0">

                                                    <div>0 votes</div>
                                                    {(
                                                        () => {
                                                            if (question._id in noOfAns) {
                                                                return (<div>{noOfAns[question._id]} Answers</div>);
                                                            }
                                                            else {
                                                                return (<>0 Answers</>);
                                                            }
                                                        }
                                                    )()}



                                                </div>

                                                <div class="d-flex flex-column flex-shrink-0 col-md-10">
                                                    <NavLink to={{ pathname: `/question/${question._id}` }} className="card-title" Style="text-decoration:none;color:#0074CC"><h4>{question.title}</h4></NavLink>
                                                    <small Style="font-size:1px;">{parse(question.question)[0]}</small>
                                                 
                                                    <div className='mt-3'>{question.tags.split(" ").map(tag => <small className='mx-2 px-2 py-1' Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px;">{tag}</small>)}</div>
                                                    <small className='d-flex flex-row-reverse'> asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} <p Style="color:#0074CC">{question.postedBy}&nbsp;</p></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </ul>
                        )}



                    </div> */}
        </>

    )
}