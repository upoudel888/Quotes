// css
import "./RecentPosts.css";
// icons and images
import banner from "../../assets/banner.png";
import {FaUserAstronaut} from "react-icons/fa";
// routing
import { useLocation,useNavigate } from "react-router-dom";
// context
import { useContext } from "react";
import QuoteContext from "../../QuoteContext";



function RecentPosts(){
    const {allPosts} = useContext(QuoteContext);
    
    // navigate to the desired post on post_title.click()
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const routeToComment = (post)=>{
        const desiredNavigateLink = `/comments/${post.getID()}`;
        if(pathname !== desiredNavigateLink){
            navigate(desiredNavigateLink);
        }
    }

    return (
        <div className="user-and-recents">
            <div className="user">
                <div className="banner-user">
                    <img src={banner} alt="profile-banner" className="banner-photo"/>
                    <div className="avatar-user">
                        <div className="avatar"><FaUserAstronaut/></div>
                        <div className="user-name">Anonymous User</div>
                    </div>
                </div>
                <div className="user-bio">
                    A curious mind, exploring the world of knowledge. 
                    Their identity remains a mystery, letting their ideas speak for themselves.
                </div>
            </div>

            <div className="recent-posts">
                <div className="recent-banner">Recent Posts</div>
                <div className="post-titles">
                    {
                        [...allPosts].reverse().slice(0,4).map(post =>{
                            return (
                                <div className="posts" onClick={()=>{routeToComment(post);}}>
                                    <div className="post-info">{post.title}</div>
                                    <div className="posted-by">Posted by <span className="bold">{post.userName}</span> - {post.date} </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );

}
export default RecentPosts;