class CommentObj{
    constructor(id,url,name,text,date){
      this.id = id;
      this.avatarUrl = url;
      this.name = name;
      this.text = text;
      this.date = date;
      this.childReplyID = [];
    }
  
    getComment(){
      return {
        "avatarUrl": this.avatarUrl,
        "name": this.name,
        "text": this.text,
        "date": this.date
      }
    }
  
    hasNesetedReplies(){
      return Boolean(this.childReplyID.length);
    }
  
    addChildReply(id){
      this.childReplyID.push(id);
    }
  
    getNestedRepliesId(){
      return this.childReplyID;
    }

    getId(){
        return this.id;
    }
  
}

export default CommentObj;


  