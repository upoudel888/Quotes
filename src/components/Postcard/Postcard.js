import "./Postcard.css"
import { useState } from "react";
// the icons
import {BiUpvote,BiDownvote} from "react-icons/bi";
import {AiOutlineComment} from "react-icons/ai";
import {FiBookmark} from "react-icons/fi";
import {PiShareFat} from "react-icons/pi";

import {useNavigate,useLocation} from "react-router-dom";

const PostCard = ({post,allPosts,setAllPosts})=>{

    const handleUpvote = ()=>{
        post.setVoteCount(post.voteCount+1);
        setAllPosts([...allPosts]);
    }
    const handleDownvote = ()=>{
        post.setVoteCount(post.voteCount-1);
        // allPosts[post.getID()-1] = post;
        setAllPosts([...allPosts]);
    }

    const navigate = useNavigate();
    const {hash,pathname,search} = useLocation();

    const routeToComment = ()=>{
        const desiredNavigateLink = `/comments/${post.getID()}`;
        if(pathname !== desiredNavigateLink){
            navigate(desiredNavigateLink);
        }
    }


    return (
        <div className="post-card" onClick={routeToComment}>
            <div className="upvote-downvote">
                <div className="upvote-btn" onClick={(e)=>{e.stopPropagation(); handleUpvote();}}><BiUpvote/></div>
                <div className="vote-count">{post.voteCount}</div>
                <div className="downvote-btn" onClick= {(e)=>{e.stopPropagation(); handleDownvote();}}><BiDownvote/></div>
            </div>
            <div className="user-and-post">
                <div className="user-info">
                    <div className="posted-by">Posted by <span className="bold">{post.userName}</span></div>
                    <div className="post-date"> {post.date} </div> 
                </div>
                <div className="post-title">{post.title}</div>
                <div className="post-text"> 
                    "{post.text}"
                </div>

                <div className="user-options">
                    <div className="btn comment-count" onClick={routeToComment}>
                        <span className="icon"><AiOutlineComment/> {post.commentCount} Comments </span>
                    </div>
                    <div className="btn share-btn"><span className="icon"><PiShareFat/></span> Share </div>
                    <div className="btn save-btn"><span className="icon"> <FiBookmark/> </span>Save</div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;