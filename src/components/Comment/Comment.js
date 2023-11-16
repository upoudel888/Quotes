import { useState } from "react";
import "./Comment.css";
import {AiOutlineComment} from "react-icons/ai";
import {FaUserAstronaut} from "react-icons/fa";
import CommentObj from "../../modules/CommentObj";

import getCurrentDate from "../../modules/Date";

function Comment({id,allPosts,setAllPosts,commentObj,allReplies,setAllReplies}) {
    // helper variables
    const comment = commentObj.getComment();
    const isNested = commentObj.hasNesetedReplies();
    const replyIDs= commentObj.getNestedRepliesId();

    // to toggle reply button on and off
    const [replyBtnStatus,setReplyBtnStatus] = useState(false);
    const handleReplyClick = ()=>{
      setReplyBtnStatus(!replyBtnStatus)
    }

    // creating the handeled form
    const [userReply,setUserReply] = useState("");
    const handleSubmit = (e)=>{
      e.preventDefault();
      setReplyBtnStatus(false);

      let  reply_id = allReplies.length + 1;
      let avatarUrl = "hello.jpg";
      let name = "Anonymous User";
      let date = getCurrentDate();
      let text = userReply;
      
      // modifying the reply repository hook
      let newReply = new CommentObj(reply_id,avatarUrl,name,text,date);
      commentObj.addChildReply(reply_id);
      allReplies.push(newReply);
      setAllReplies([...allReplies]);

      // modifying the post repository hook to update comment count
      allPosts[id-1].increaseCommentCount();
      setAllPosts([...allPosts]);

      setUserReply("");
    }

    return (
      <div className="comment">
        <div className="user-info">
          {/* <img className="avatar" src={comment.avatarUrl} alt={comment.name}/> */}
          <div className="avatar"><FaUserAstronaut/></div>
          <div className="user-name bold"> {comment.name}</div>
          <div className="comment-date">{comment.date}</div>
        </div>
        <div className="comment-reply">
          <div className="comment-text"> {comment.text}</div>

          {/* Display reply form only when reply button is pressed */}
          <div className="btn reply-btn" onClick = {()=>{handleReplyClick();}}>
          <span className="icon"> <AiOutlineComment/> </span> Reply</div>
          {replyBtnStatus && 
            // Reply form starts here
            <form onSubmit={handleSubmit}>
              <textarea name="reply" 
              value = {userReply}
              onChange = {(e)=>setUserReply(e.target.value)}
              placeholder="Leave a comment"
              required>
              </textarea>
              <button className="form-btn" >Reply</button>
            </form>
          }

          {/* Recursively displaying the nested Replys here*/}
          { isNested &&   
            replyIDs.map(reply_id=>{

              return (
                <Comment 
                id = {id}
                allPosts = {allPosts}
                setAllPosts= {setAllPosts}
                commentObj = {allReplies[reply_id-1]} 
                allReplies = {allReplies} 
                setAllReplies = {setAllReplies}
                key = {`${id}-${reply_id}`}
                />
              )
            })
          }
        </div>
      </div>
    );
}

export default Comment;