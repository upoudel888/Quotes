import "./Postcard.css"
// icons
import {BiUpvote,BiDownvote} from "react-icons/bi";
import {AiOutlineComment} from "react-icons/ai";
import {FiBookmark} from "react-icons/fi";
import {PiShareFat} from "react-icons/pi";
// routing 
import {useNavigate,useLocation} from "react-router-dom";

const PostCard = ({post,allPosts,setAllPosts})=>{

    // updating the postObj in allPosts repository
    const handleUpvote = ()=>{
        post.setVoteCount(post.voteCount+1);
        setAllPosts([...allPosts]);
    }
    const handleDownvote = ()=>{
        post.setVoteCount(post.voteCount-1);
        setAllPosts([...allPosts]);
    }

    // route to comment page of the respective post when comment_button or postCard is clicked
    const navigate = useNavigate();
    const {pathname} = useLocation();

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