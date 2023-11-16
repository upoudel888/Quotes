// hooks
import { createContext,useState } from "react";
// modules
import postObj from "./modules/PostObj";
import getCurrentDate from "./modules/Date";

const QuoteContext = createContext();

export function QuoteProvider({children}){

    // Some Default Posts
    const newPost = new postObj(1,
        "Anonymous User2",
        "Curiosity Driven",
        "I have no special talent,\n I am only passionately curious.",
        getCurrentDate());
    const newPost1 = new postObj(2,
        "Anonymous User1",
        "Patience",
        "You can have it all.\n You just can't have it all at once.",
        getCurrentDate());

    // Repository of all the posts by the user    
    const [allPosts,setAllPosts] = useState([newPost,newPost1]);
    // All comments
    const [postComments,setPostComments] = useState({1:[],2:[]});
    // Repository of all the replies to the comments
    const [allReplies,setAllReplies] = useState([]);

    return (
        <QuoteContext.Provider value = {{
            allPosts,
            setAllPosts,
            postComments,
            setPostComments,
            allReplies,
            setAllReplies
        }}>
            {children}
        </QuoteContext.Provider>
    );
}

export default QuoteContext;

