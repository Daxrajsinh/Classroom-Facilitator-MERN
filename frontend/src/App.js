import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Questions from './components/Questions/Questions';
import Content from './components/Questions/Content';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/MyProfile/Profile/Profile';
import UserQuestionContent from './components/MyProfile/Profile/Content';
import MyQuestions from './components/MyProfile/MyQuestions/MyQuestions';
import MyAnswers from './components/MyProfile/MyAnswers/MyAnswers';
import Search from './components/Questions/Search';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path = "/" element = {<Homepage/>}/>
     
        <Route path = "/editor" element = {<Editor/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path="/questions" element = {<Questions />}></Route>
        <Route path="/question/:type" element = {<Content />}></Route>
        <Route path="/answer/:type" element = {<UserQuestionContent />}></Route>

        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/myquestions' element={<MyQuestions />}></Route>
        <Route path='/myanswers' element={<MyAnswers />}></Route>

        
        <Route path='/myquestions' element={<MyQuestions />}></Route>
        <Route path='/myanswers' element={<MyAnswers />}></Route>

        <Route path = "/search" element={<Search/>}></Route>
        
        
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;