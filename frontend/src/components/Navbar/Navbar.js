
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
// import NotificationBox from './NotificationBox'
import { useState, useEffect } from 'react'
import './Navbar.css'

// let nodemailer = require("nodemailer");
// var well = {
  // boxShadow: "0px 0px 10px 0px #f0f0f0"
// }
var iconstyle = {
  marginleft: "10px",
  textDecoration: "none"
}
var title = {
  color: "#0D6EFD",
}
export default function Navbar() {
  
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
//   const [show, setShow] = useState(false);

  const isLoggedin = () => {
    if (localStorage.getItem('username') !== null) {

      setLoginStatus(true);
    }
  }

  const logout = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('since');
    localStorage.removeItem('Usertype');

    setLoginStatus(false);

    window.location.reload(true);

    navigate("/");
  }

  const searchQuestion = async (e) => {

    e.preventDefault();
    const que = document.getElementById('searchQue').value;

    
    await fetch(`http://localhost:8000/api/question/search?keyword=${que}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(questions => {

      navigate("/search", { state: questions });
      // setQuestions(data);
    })

  }

  useEffect(() => {
    isLoggedin();
  }, [loginStatus])

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light" Style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; position:fixed;top:0; z-index:9999; width:100%;">
        <div className="container-fluid">
          <div className="navbar-brand d-flex" style={{ fontWeight: "500", color: 'black', paddingTop: "10px" }}>
            <NavLink to="/" style={iconstyle}>
              &nbsp;<i style={title}>Mate</i><b>s</b>
            </NavLink>
          </div>


          {localStorage.getItem("Usertype") === 'user' && (
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsSscrollHheight: "100px" }}>
            <li className="nav-item dropdown" >
              <NavLink className="nav-link dropdown-toggle" to="/" id="navbarScrollingDropdown" role="button" aria-expanded="false" style={{ color: 'black' }}>
                Products
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown" style={{ color: 'black' }}>
                <li><NavLink className="dropdown-item" to="/questions">Questions</NavLink></li>
                <li><NavLink className="dropdown-item" to="/editor">Code Editor</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
              </ul>
            </li>
          </ul>)}

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarScroll" >
            <form className="d-flex" style={{ width: 500 }} onSubmit={searchQuestion}>
              <input className="form-control me-2" id="searchQue" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit">Search</button>

            </form>
            <div className="searchbar">

            </div>
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" Style={{ bsSscrollHheight: "100px" }}>
                <li class="nav-item">
            {localStorage.getItem("Usertype") === 'user' && (
                  <NavLink className="nav-link mr" to="/editor" style={{ color: 'black' }}><button className='btn btn-outline dark'>&lt;/&gt;</button></NavLink>
                  )}
                </li>

              </ul>

            {loginStatus && (localStorage.getItem("Usertype") === 'user') && (<NavLink to='/profile' className='btn btn-white mr-2'>Hey, {localStorage.getItem("username")} !</NavLink>)}
            {/* <button className='btn btn-white mr-2'><i className="fa fa-home"></i></button> */}

            {/* <button className='btn btn-white  mr-2' onClick={() => setShow(!show)}><i className="fas fa-bell"></i></button> */}

            {/* <button className='btn btn-white  mr-2'><i className="fa fa-question" aria-hidden="true"></i></button> */}
            {/* <button className='btn btn-white mr-2'><i className="fa fa-trophy"></i></button> */}

            <ul className="navbar-nav " Style={{ bsSscrollHheight: "100px" }}>

              {loginStatus === true

                ?
                (
                  <li class="nav-item">
                    <button className='btn btn-outline-primary' onClick={logout}>Logout</button>
                  </li>
                )
                :
                (<><li class="nav-item">
                  <NavLink className="nav-link" to="/login" style={{ color: 'black' }}><button className='btn btn-outline-primary'>Login</button></NavLink>
                </li>
                  <li class="nav-item">
                    <NavLink className="nav-link" to="/register" style={{ color: 'black' }}><button className='btn btn-primary'>Register</button></NavLink>
                  </li></>)
              }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}