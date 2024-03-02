import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import parse from "html-react-parser";
import JoditEditor from "jodit-react";
import { useNavigate } from 'react-router-dom';
import OpenAI from "openai";
import '../Questions/questions.css';
import { FaTrash } from 'react-icons/fa';

export default function Content(props) {


    const navigate = useNavigate();
    const editor = useRef(null);
    const params = useParams();
    const [value, setValue] = useState("");
    const [question, setQuestion] = useState([])
    const [html, setHtml] = useState("");
    const [state, setState] = useState(false);
    const [answers, setAnswer] = useState([]);
    const [vote, setVotes] = useState({});
    const [voteStatus, setVoteStatus] = useState({});
    const [loginstatus, setloginstatus] = useState(false);
    const [quevoteStatus, setqueVoteStatus] = useState({});
    const [queVote, setQueVote] = useState();
    const [generatedAnswer, setGeneratedAnswer] = useState("");

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const username = localStorage.getItem('username');

    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
      });


    // to show the comment box
    const [show, setShow] = useState(false);


    // to add a new comment
    const [comment, setComment] = useState({});
    const [commentState, setCommentState] = useState(false);


    const config = useMemo(() => ({
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);




    const isLoggedIn = () => {
        if (localStorage.getItem('username') !== null) {
            setloginstatus(true);
        }
    }
    const fetchQuestion = async (id) => {


        await fetch(`http://localhost:8000/api/question/fetchQueById/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then((data) => {
            setQuestion(data);
            setHtml(parse(data.question));
        })








    }


    const fetchAnswers = async (id) => {
        await fetch(`http://localhost:8000/api/answer/fetchanswer/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then((data) => {
            setAnswer(data);
        })
    }


    const getValue = (newvalue) => {
        setValue(newvalue);
    };

    const fetchGeneratedAnswer = async (questionText) => {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "user",
                        "content": questionText
                    }
                ],
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
    
            if (response.choices && response.choices.length > 0) {
                return response.choices[0].message.content;
            } else {
                console.error('Invalid response format:', response);
                return 'Failed to generate answer';
            }
        } catch (error) {
            console.error('Error fetching answer:', error);
            return 'Failed to generate answer';
        }
    };
    
    


    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/answer/addanswer/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer: value }),
        });
    
        const json = await response.json();
    
        if (json["status"] === true) {
            // Update state to indicate that the question has been answered
            setState(true);
            setValue("");
    
            // Trigger a refetch of answers to update the UI
            fetchAnswers(id);
    
            // Scroll to the top of the page
            window.scrollTo(0, 0);
        }
    }
    


    const upvoteQue = async (e, id) => {


        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            document.getElementById("quedownvotbtn").disabled = false;
            document.getElementById("queupvotebtn").disabled = true;


            const response = await fetch(`http://localhost:8000/api/question/upvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            let json = await response.json();
            setqueVoteStatus(json);
        }
        else {
            navigate("/login");
        }
    }


    const downvoteQue = async (e, id) => {




        if (localStorage.getItem("username") !== null) {
            e.preventDefault();
            document.getElementById("quedownvotbtn").disabled = true;
            document.getElementById("queupvotebtn").disabled = false;


            const response = await fetch(`http://localhost:8000/api/question/downvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            let json = await response.json();


            setqueVoteStatus(json);
        }
        else {
            navigate("/login");
        }
    }


    const upvote = async (e, id) => {


        if (localStorage.getItem("username") !== null) {


            e.preventDefault();
            document.getElementById("ansdownvotebtn"+id).disabled = false;
            document.getElementById("ansupvotebtn"+id).disabled = true;


            const response = await fetch(`http://localhost:8000/api/answer/upvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            let json = await response.json();


            setVoteStatus(json);
        }
        else {
            navigate("/login");
        }


    }


    const downvote = async (e, id) => {


        if (localStorage.getItem("username") !== null) {
            e.preventDefault();


            document.getElementById("ansdownvotebtn" + id).disabled = true;
            document.getElementById("ansupvotebtn" + id).disabled = false;


            const response = await fetch(`http://localhost:8000/api/answer/downvote/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });


            let json = await response.json();


            setVoteStatus(json);
        }
        else {
            navigate("/login");
        }


    }


    const fetchVotes = async () => {


        const response = await fetch(`http://localhost:8000/api/answer/fetchVotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });


        let json = await response.json();


        setVotes(json);






    }


    const fetchQueVotes = async (id) => {




        const response = await fetch(`http://localhost:8000/api/question/fetchVotes/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });


        let json = await response.json();


        setQueVote(json);
    }


    const onChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value })
    }


    const addComment = async (e, id) => {
        e.preventDefault();


        const response = await fetch(`http://localhost:8000/api/comment/addcomment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: comment.comment, qid: question._id }),
        });


        const json = await response.json();


        if (json["status"] === true) {
            setCommentState(true);
            window.scrollTo(0, 0);
        }


    }


    const fetchComments = async (id) => {
        await fetch(`http://localhost:8000/api/comment/fetchComments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({ qid: question._id, ansid: id })
        }).then(response => response.json()).then(data => setComment(data))
    }

    // const fetchQuestionAndAnswer = async (id) => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/question/fetchQueById/${id}`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const data = await response.json();
    //         setQuestion(data);
    //         setHtml(parse(data.question));

    //         // Fetch AI-generated answer
    //         const generatedAns = await fetchGeneratedAnswer(data.title); // Assuming data.title contains the question text
    //         setGeneratedAnswer(generatedAns);

    //         // Fetch answers
    //         fetchAnswers(id);
    //     } catch (error) {
    //         console.error('Error fetching question and answer:', error);
    //     }
    // };
      // Function to delete a question
    // const deleteAnswer = async (id) => {
    //     // Add your logic to delete the question here
    //     console.log("Deleting answer with ID:", id);
    // };
    const deleteAnswer = async (id) => {
        console.log("Deleting answer with ID:", id);

        const confirmDelete = window.confirm("Are you sure you want to delete this answer?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8000/api/answer/deleteans/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const json = await response.json();
    
            if (json.status === "deleted") {
                // Update the UI or take necessary actions upon successful deletion
                console.log("Answer successfully deleted !")
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting answer:', error);
            // Handle error
        }
    };
    

    // Function to update a question
    // const updateAnswer = async (id) => {
    //     // Add your logic to update the question here
    //     console.log("Updating answer with ID:", id);
    // };

    const updateAnswer = async (id) => {
        console.log("Updating answer with ID:", id);
        
        const updatedAnswer = window.prompt("Enter the updated answer:");
        const confirmUpdate = window.confirm("Are you sure you want to update this answer?");
        if (!confirmUpdate) return;

        // Check if updatedAnswer is null or empty
        if (!updatedAnswer) {
            console.log("Please enter a valid input to update the answer.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/answer/updateans/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ updatedAnswer }),
            });
    
            const json = await response.json();
    
            if (json.status === "updated") {
                // Update the UI or take necessary actions upon successful update
                console.log("Answer successfully updated !");
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating answer:', error);
            // Handle error
        }
    };
    
    

    useEffect(() => {
        isLoggedIn();
        fetchQuestion(params.type);
        fetchAnswers(params.type);
        // fetchQuestionAndAnswer(params.type);
        fetchVotes();
        fetchQueVotes(params.type);
        // convertToHTML();
    }, [state, voteStatus, quevoteStatus, question])

    useEffect(()=> {
        // Fetch AI-generated answer when the component mounts
        if(isAdmin) {
            const fetchAIAnswer = async () => {
                try {
                    // Assuming question.title contains the question text
                    const generatedAns = await fetchGeneratedAnswer(question.title);
                    setGeneratedAnswer(generatedAns);
                } catch (error) {
                    console.error('Error fetching AI-generated answer:', error);
                }
            };
            fetchAIAnswer();
        }
    }, [])

    //######################################
    const sortByVotes = (a, b) => {
    const votesA = vote[a._id] || 0;
    const votesB = vote[b._id] || 0;
     
        // Sort in descending order (from highest to lowest votes)
        return votesB - votesA;
      };
     
      // Sort answers by votes
      const sortedAnswers = answers.sort(sortByVotes);
     


    //#####################################


    return (
        <div Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
            {(
                () => {
                    if (state === true) {


                        return (<>
                            <div className="alert alert-success alert-dismissible" role="alert">
                                Your Answer is Posted <strong>Successfully</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </>)


                    }
                }
            )()}


            {(
                () => {
                    if (commentState === true) {


                        return (<>
                            <div className="alert alert-success alert-dismissible" role="alert">
                                Your Comment is Posted <strong>Successfully</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </>)


                    }
                }
            )()}
           
            <div className="container" Style="height:100vh;width:70%;display:block; margin:auto;">


                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-md-0 mt-0 mx-0">
                       
                    <button className='btn btn-white' id="queupvotebtn" onClick={(e) => upvoteQue(e, question._id)} style={{ width: '30px', height: '30px', backgroundColor: 'transparent', border: 'none', color: 'grey' }}>
                    &#9650;
                    </button>
                        <center><div className='mx-3'>{queVote}</div></center>
                        <button className='btn btn-white' id="quedownvotbtn" onClick={(e) => downvoteQue(e, question._id)} style={{ width: '30px', height: '30px', backgroundColor: 'transparent', border: 'none', color: 'grey' }}>
                        &#9660;
                        </button>  



                    </div>
                    <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                        <h1>{question.title}</h1>
                        <div className='mt-5'>{html}</div>
                    </div>
                </div>
                <hr Style={{
                    background: "black",
                    height: "2px",
                    border: "none",
                }}
                /><hr />

                {!isAdmin && generatedAnswer && (
                    <div className="generated-answer">
                        <h4>AI Generated Answer:</h4>
                        <p>{generatedAnswer}</p>
                    </div>
                )}

                <br></br>
                <h4>{answers.length}  Answers</h4>
                {answers.length > 0 && (
                    <div className='mt-5'>


{sortedAnswers.map(ans => (
  <div className="" key={ans._id}>
    {/* Existing code for rendering each answer... */}


    <div className="">
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column col-md-0 mt-0 mx-0">
                                    <button className='btn btn-black' id={"ansupvotebtn" + ans._id} onClick={(e) => upvote(e, ans._id)} style={{ width: '30px', height: '30px', backgroundColor: 'transparent', border: 'none', color: 'grey' }}>
                                    &#9650;
                                    </button>
                                    <div className='mx-3'>{vote[ans._id]}</div>
                                    <button className='btn btn-black' id={"ansdownvotebtn" + ans._id} onClick={(e) => downvote(e, ans._id)} style={{ width: '30px', height: '30px', backgroundColor: 'transparent', border: 'none', color: 'grey' }}>
                                    &#9660;
                                    </button>
                                    {ans.status === "Accepted" && (
                                    <button className='btn btn-white'>
                                        <i className="fa fa-check" style={{ fontSize: '25px', color: 'lightgreen' }}></i>
                                    </button>
                                    )}
                        
                                    </div>
                                    <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                                        <p>{parse(ans.answer)}</p>


                                        <small className='d-flex flex-row-reverse'>Posted By : {ans.postedBy}
                                        
                                        {(isAdmin || ans.postedBy === username) && (
                                            <div>
                                                <div>
                                                <button
                                                    onClick={() => deleteAnswer(ans._id)}
                                                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', color: 'grey' }}
                                                >
                                                    <FaTrash/>
                                                </button>
                                                <button
                                                    onClick={() => updateAnswer(ans._id)}
                                                    style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', color: 'grey' }}
                                                >
                                                    ✎
                                                </button>
                                                </div>
                                            </div>
                                        )}
                                        </small>


                                        <div className="comments" Style="display:relative; bottom:0px;">
                                            <div className="comment">


                                                {/* <p>This is comment..
                                                    <span>username</span>
                                                    <small>Timestamp</small>
                                                </p> */}
                                            </div>
                                            {/* <p onClick={() => setShow(!show)}>Add a comment</p> */}
                                            {
                                                show && (
                                                    <div className="title">
                                                        <form method="POST" onSubmit={(e) => addComment(e, ans._id)}>
                                                            <textarea type="text" placeholder="Add Your comment.." rows={5} cols={100} name="comment" onChange={onChange}></textarea><br></br>
                                                            <button type="submit" className='btn btn-primary'>Add comment</button>
                                                        </form>
                                                    </div>
                                                )
                                            }
                                        </div>




                                    </div>
                                </div>


                                {/* <p className="card-text">You’re ready to ask a programming-related question and this form will help guide you through the process.</p> */}


                                <hr Style={{
                                    background: "#959595",
                                    height: "2px",
                                    border: "none",
                                }}
                                /><hr />


                            </div>
  </div>
))}

                    </div>
                )}
                
                {!isAdmin && 
                <h4>Your Answer</h4> &&
                <form onSubmit={(e) => handleSubmit(e, question._id)} method='POST'>
                    <JoditEditor
                        ref={editor}
                        config={config}
                        tabIndex={1}
                        value={value}
                        // onBlur={(newContent) => getValue(newContent)}
                        onChange={(newContent) => getValue(newContent)}


                    />




                    {
                        loginstatus === true ? (<button type='submit' className="btn-answer" style={{marginTop:"10px"}}>Post Your Answer</button>) : <></>
                    }


                   


                </form>}
            </div>
        </div>
    )
}