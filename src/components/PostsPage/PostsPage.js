import { useState } from "react";
import "./PostsPage.css";

// Modules
import postObj from "../../modules/PostObj";
import getCurrentDate from "../../modules/Date";

// Components
import PostCard from "../Postcard/Postcard";
import RecentPosts from "../RecentPosts/RecentPosts";

const PostForm = ({allPosts,setAllPosts,postComments,setPostComments})=>{

    // form handlers
    const [postTitle,setPostTitle] = useState("");
    const [postText,setPostText] = useState("");

    const handlePostSubmit = (e)=>{
        e.preventDefault();
        // updating all posts
        let newPostObj = new postObj(allPosts.length+1,
            "Anonymous User",
            postTitle,
            postText,
            getCurrentDate());
        allPosts.push(newPostObj);
        setAllPosts([...allPosts]);
        // updating postComments
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

function PostsPage({allPosts,setAllPosts,postComments,setPostComments}){

    return (
        <div className="posts-body">
            <div className="posts">
                <PostForm allPosts={allPosts}
                         setAllPosts={setAllPosts}
                         postComments={postComments}
                         setPostComments={setPostComments}
                ></PostForm>

                <div className="all-posts">
                    {
                        [...allPosts].reverse().map(post =>{
                            return(
                                <PostCard 
                                    post={post} 
                                    key={post.getID()} 
                                    allPosts = {allPosts}
                                    setAllPosts={setAllPosts}
                                ></PostCard>
                            )
                        })
                    }
                </div>
            </div>
            <RecentPosts allPosts={allPosts}></RecentPosts>
        </div>
    )
}

export default PostsPage;

// function Post({posts,postComments,setPostComments,commentCount}){


//     const post = postObj.getPost();
//     console.log(post)
//     const [votes,setVotes] = useState(postObj.getVoteCount());
//     const handleUpvote = ()=>{
//         setVotes(votes+1);
//         post.setVoteCount(votes)
//     }
//     const handleDownvote = ()=>{
//         setVotes(votes-1)
//         post.setVoteCount(votes)
//     }

//     // for creating the handeled form
//     const [userComment,setUserComment] = useState("");
//     const handleCommentSubmit = (e)=>{
//         e.preventDefault();
        
//         let id = postComments.length + 1;
//         let avatarUrl = "hello.jpg";
//         let name = "Anonymous user";
//         let date = "Today";
//         let text = userComment;

//         let newComment = new CommentObj(id,avatarUrl,name,text,date);
//         setPostComments([...postComments,newComment]);
//         setUserComment("");
        
//     }
//     return(

//         <div className="post-card">
//             <div className="upvote-downvote">
//                 <div className="upvote-btn" onClick={()=>{handleUpvote();}}><BiUpvote/></div>
//                 <div className="vote-count">{votes}</div>
//                 <div className="downvote-btn" onClick= {()=>{handleDownvote();}}><BiDownvote/></div>
//             </div>
//             <div className="user-and-post">
//                 <div className="user-info">
//                     <div className="posted-by">Posted by <span className="bold">{post.name}</span></div>
//                     <div className="post-date"> {post.date} </div> 
//                 </div>
//                 <div className="post-title">{post.title}</div>
//                 <div className="post-text"> 
//                     "{post.text}"
//                 </div>

//                 <div className="user-options">
//                     <div className="btn comment-count"><span className="icon"><AiOutlineComment/></span> {post.commentCount} Comments</div>
//                     <div className="btn share-btn"><span className="icon"><PiShareFat/></span> Share </div>
//                     <div className="btn save-btn"><span className="icon"> <FiBookmark/> </span>Save</div>
//                 </div>

//                 <form className="comment-form" onSubmit = {handleCommentSubmit}>

//                 <textarea name="comment" id="hello"
//                 value = {userComment}
//                 onChange = {(e)=>setUserComment(e.target.value)}
//                 placeholder="What are your thoughts ?"
//                 required>
//                 </textarea>
//                 <button className="form-btn">Comment</button>
//                 </form>
//             </div>
//         </div>
//     )          
// }

// export default Post;