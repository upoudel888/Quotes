// css
import "./CommentPage.css"
// hooks
import { useState } from "react";
import {useParams,useNavigate} from "react-router-dom";
// Components
import PostCard from "../../components/Postcard/Postcard";
import Comment from "../../components/Comment/Comment";
import RecentPosts from "../../components/RecentPosts/RecentPosts";
import {IoIosArrowBack} from "react-icons/io";
// modules
import getCurrentDate from "../../modules/Date";
import CommentObj from "../../modules/CommentObj";


// form where user comments to a posts
const CommentForm = ({id,allPosts,setAllPosts,postComments,setPostComments})=>{

    // form handler
    const [userComment,setUserComment] = useState("");

    const handleCommentSubmit = (e)=>{
        e.preventDefault();
        
        let id1 = postComments[id].length + 1;
        let avatarUrl = "hello.jpg";
        let name = "Anonymous user";
        let date = getCurrentDate();
        let text = userComment;

        // updating the comment repository
        let newComment = new CommentObj(id1,avatarUrl,name,text,date);
        postComments[id].push(newComment);
        setPostComments({...postComments});

        // modifying the post repository to update comment count
        allPosts[id-1].increaseCommentCount();
        setAllPosts([...allPosts]);

        // resetting form handlers
        setUserComment("");
    }

    return (
        <form className="comment-form" onSubmit = {handleCommentSubmit}>
            <textarea name="comment"
            value = {userComment}
            onChange = {(e)=>setUserComment(e.target.value)}
            placeholder="What are your thoughts ?"
            required>
            </textarea>
            <button className="form-btn">Comment</button>
        </form>
    )  
}


function CommentPage({allPosts,setAllPosts,postComments,setPostComments,allReplies,setAllReplies}){

    // to route back button to home page
    const navigate = useNavigate();
    const routeToHome = ()=>{
        navigate("/");    
    }
    const {id} = useParams();


    return (
        <div className="comment-hero">
        <div className="btn-container">
            <button className="btn form-btn back-btn" onClick = {routeToHome}><IoIosArrowBack></IoIosArrowBack>Back</button>
        </div>
        <div className="comment-body">
            <div className="posts">
                <PostCard post={allPosts[id-1]}                                  
                        allPosts = {allPosts}
                        setAllPosts={setAllPosts}
                ></PostCard>
                <CommentForm id={id} 
                            postComments = {postComments} 
                            setPostComments={setPostComments}
                            allPosts = {allPosts}
                            setAllPosts = {setAllPosts}
                ></CommentForm>
                <div className="allComments">
                    {
                        postComments[id].map(comment =>{
                            return (
                                <Comment 
                                id = {id}
                                allPosts = {allPosts}
                                setAllPosts={setAllPosts}
                                commentObj = {comment} 
                                allReplies = {allReplies} 
                                setAllReplies = {setAllReplies}
                                key = {comment.getId()}/>
                            )
                        })
                    }
                </div>
            </div>
            <RecentPosts allPosts={allPosts}></RecentPosts>
        </div>
        </div>
    );
}

export default CommentPage;

