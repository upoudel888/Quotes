// css
import "./CommentPage.css"
// hooks
import { useContext, useState } from "react";
import {useParams,useNavigate} from "react-router-dom";
// Components
import PostCard from "../../components/Postcard/Postcard";
import Comment from "../../components/Comment/Comment";
// components
import RecentPosts from "../../components/RecentPosts/RecentPosts";
// modules
import getCurrentDate from "../../modules/Date";
import CommentObj from "../../modules/CommentObj";
// context
import QuoteContext from "../../QuoteContext";
// icons
import {IoIosArrowBack} from "react-icons/io";

// form where user comments to a posts
const CommentForm = ({id})=>{
    const {allPosts,setAllPosts,postComments,setPostComments}  = useContext(QuoteContext);

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


function CommentPage(){
    const {allPosts,postComments} = useContext(QuoteContext);

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
                <PostCard post={allPosts[id-1]}/>
                <CommentForm id={id}></CommentForm>
                <div className="allComments">
                    {
                        postComments[id].map(comment =>{
                            return (
                                <Comment id = {id} commentObj = {comment} key = {comment.getId()}/>
                            )
                        })
                    }
                </div>
            </div>
            <RecentPosts></RecentPosts>
        </div>
        </div>
    );
}

export default CommentPage;

