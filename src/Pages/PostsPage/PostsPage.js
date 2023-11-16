import "./PostsPage.css";
import { useState,useContext } from "react";
// Modules
import postObj from "../../modules/PostObj";
import getCurrentDate from "../../modules/Date";
// Components
import PostCard from "../../components/Postcard/Postcard";
import RecentPosts from "../../components/RecentPosts/RecentPosts";
// Context
import QuoteContext from "../../QuoteContext";

// A form where user posts quotes
const PostForm = ()=>{
    const {allPosts,setAllPosts,postComments,setPostComments} = useContext(QuoteContext);

    // form handlers
    const [postTitle,setPostTitle] = useState("");
    const [postText,setPostText] = useState("");

    const handlePostSubmit = (e)=>{
        e.preventDefault();
        // updating allPosts
        let newPostObj = new postObj(allPosts.length+1,
            "Anonymous User",
            postTitle,
            postText,
            getCurrentDate());
        allPosts.push(newPostObj);
        setAllPosts([...allPosts]);
        // initiating a filed for the post in postComments
        postComments[allPosts.length] = [];
        setPostComments({...postComments});
        // resetting the form handlers
        setPostTitle("");
        setPostText("");
    }

    return (
        <form onSubmit={handlePostSubmit}>
            <textarea name="postTitle"
                value = {postTitle}
                onChange = {(e)=>setPostTitle(e.target.value)}
                placeholder="Title"
                maxLength="50"
                required>
            </textarea>
            <textarea name="postText" 
                value = {postText}
                onChange = {(e)=>setPostText(e.target.value)}
                placeholder="Quote Text"
                required>
            </textarea>
            <button className="form-btn post-btn">Post</button>
        </form>
    )
}

function PostsPage(){
    const {allPosts} = useContext(QuoteContext);

    return (
        <div className="posts-body">
            <div className="posts">
                <PostForm/>
                <div className="all-posts">
                    {
                        [...allPosts].reverse().map(post =>{
                            return(
                                <PostCard post={post} key={post.getID()}/>
                            )
                        })
                    }
                </div>
            </div>
            <RecentPosts></RecentPosts>
        </div>
    )
}

export default PostsPage;
