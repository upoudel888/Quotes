import './App.css';

import {PostsPage,CommentPage} from './components';
import { React,useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";

import logo from './assets/logo.svg';
import postObj from './modules/PostObj';



const Navbar = ()=>{
  return (
    <nav>
        <div className="logo">
          <img className="scale-in-hor-left " src={logo} alt="logo" />
          <div className="quotes rotate-in-2-ccw">&#10078;</div>
        </div>
      </nav>
  )
}

function App() {

  // Some Default Posts
  const newPost = new postObj(1,
      "Ujjwal Paudel",
      "A quote by Enstein",
      "I have no special talent,\n I am only passionately curious.",
      "Today");
  const newPost1 = new postObj(2,
      "Smriti Paudel",
      "A quote by Painstain",
      "I have no special talent,\n I am only passionately curious.",
      "Today");
          
  const [allPosts,setAllPosts] = useState([newPost,newPost1]);
  // All comments
  const [postComments,setPostComments] = useState({1:[],2:[]});
  // Replys Repository
  const [allReplies,setAllReplies] = useState([]);

  return (
    <>
      <Navbar></Navbar>

      <Router>
        <Routes>
          <Route path = "/" exact element={
            <PostsPage allPosts={allPosts} 
                  setAllPosts={setAllPosts}
                  postComments={postComments}
                  setPostComments={setPostComments}
                  allReplies={allReplies}
                  setAllReplies={setAllReplies}
            ></PostsPage> 
          }/>
          <Route path = "/comments/:id"  exact element={
            <>
              <CommentPage allPosts={allPosts} 
                  setAllPosts={setAllPosts}
                  postComments={postComments}
                  setPostComments={setPostComments}
                  allReplies={allReplies}
                  setAllReplies={setAllReplies}
            ></CommentPage> 
            </>
          }/>
        </Routes>

      </Router>

    </>
    
  );
}

export default App;
