class postObj{
    constructor(id,userName,title,text,date){
      this.id = id;
      this.userName = userName;
      this.title = title;
      this.text = text;
      this.date = date;
      this.commentCount = 0;
      this.voteCount = 0;
    }

    setVoteCount(num){
        this.voteCount = num;
    }

    increaseCommentCount(){
        this.commentCount += 1;
    }
    
    getID(){
        return this.id;
    }
  
}

export default postObj;
