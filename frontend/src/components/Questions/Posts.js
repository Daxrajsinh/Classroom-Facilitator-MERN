import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";
// import Sidebar from '../Sidebar/Sidebar';
import "./questions.css";
// import { FilterList } from '@mui/icons-material';
import "../Header/header.css";
import { FaTrash } from 'react-icons/fa';
import { Padding } from "@mui/icons-material";

export default function Posts({ posts }) {
  const [noOfAns, setnoOfAns] = useState({});
  const [vote, setVotes] = useState({});
  const [answers, setAnswer] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const username = localStorage.getItem("username");

  // This function will find the count of No. of answer for a perticular Question
  const FindFrequencyOfAns = async () => {
    const response = await fetch(
      `http://localhost:8000/api/answer/fetchanswer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    setnoOfAns(json);
    console.log("No of ans", noOfAns);
  };

  const fetchAnswers = async (id) => {
    await fetch(`http://localhost:8000/api/answer/fetchanswer/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAnswer(data);
      });
  };

  const fetchVotes = async () => {
    const response = await fetch(
      `http://localhost:8000/api/question/fetchallVotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let json = await response.json();
    setVotes(json);
  };

  // Function to delete a question
  // const deleteQuestion = async (id) => {
  //   // Add your logic to delete the question here
  //   console.log("Deleting question with ID:", id);
  // };
  const deleteQuestion = async (id) => {
    console.log("Deleting question with ID:", id);

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this answer?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/question/deleteque/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      if (json.status === "deleted") {
        console.log("Question successfully deleted !");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      // Handle error
    }
  };

  // Function to update a question
  // const updateQuestion = async (id) => {
  //   // Add your logic to update the question here
  //   console.log("Updating question with ID:", id);
  // };

  const updateQuestion = async (id) => {
    console.log("Updating question with ID:", id);

    const newTitle = window.prompt("Enter the update question's title:");
    const newQuestion = window.prompt("Enter the new question to be updated:");

    const confirmUpdate = window.confirm(
      "Are you sure you want to update this question?"
    );
    if (!confirmUpdate) return;

    // Check if newTitle or newQuestion is null or empty
    if (!newTitle || !newQuestion) {
      console.log("Please enter valid inputs to update the question.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/question/updateque/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle, question: newQuestion }),
        }
      );

      const json = await response.json();

      if (json.status === "updated") {
        // Update the UI or take necessary actions upon successful update
        console.log("Question successfully updated !");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating question:", error);
      // Handle error
    }
  };

  useEffect(() => {
    // fetchAllQuestions();
    FindFrequencyOfAns();
    fetchVotes();
  }, []);

  return (
    <>
      <ul>
        {posts.map((question) => (
          <div className="all-questions">
            <div className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options">
                  <div className="all-option">
                    <p>{vote[question._id]}</p>
                    <span>votes</span>
                  </div>
                  <div className="all-option">
                    {/* <small>0 views</small> */}
                  </div>
                </div>
              </div>

              <div className="question-answer">
                <NavLink
                  to={{ pathname: `/question/${question._id}` }}
                  className="card-title"
                  Style="text-decoration:none;color:black"
                >
                  <h4>{question.title}</h4>
                </NavLink>
                <div style={{ width: "90%" }}  >
                  <small Style="font-size:1px;">
                    {parse(question.question)[0]}
                  </small>
                </div>

                <div className="mt-3">
                  {question.tags.split(" ").map((tag) => (
                    <NavLink
                      className="question-tags"
                      Style="color:hsl(120,47%,42%); background-color: hsl(120,46%,92%); border-radius:5px;"
                      // Style="color:hsl(205,47%,42%); background-color: hsl(205,46%,92%); border-radius:5px;"
                    >
                      {tag}
                    </NavLink>
                  ))}
                </div>
                <div className="author">
                  {/* <small> asked {question.date.slice(0, 10)} at {question.date.slice(12, 16)} </small>
                                                                        <div className="author-details">
                                                                          
                                                                            <p>{question.postedBy}</p>
                                                                        </div> */}
                  <small
                    className="d-flex flex-row-reverse"
                    style={{ fontSize: "16px" }}
                  >
                    asked {question.date.slice(0, 10)} at{" "}
                    {question.date.slice(12, 16)}{" "}
                    <p Style="color:rgb(2, 113, 2)">{question.postedBy} &nbsp;</p>
                    {(isAdmin || question.postedBy === username) && (
                      <div>
                        <div >
                          <button
                            onClick={() => deleteQuestion(question._id)}
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "grey",
                            }}
                          >
                            <FaTrash/>
                          </button>
                          <button
                            onClick={() => updateQuestion(question._id)}
                            style={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "grey",
                            }}
                          >
                            ✎
                          </button>
                        </div>
                      </div>
                    )}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
