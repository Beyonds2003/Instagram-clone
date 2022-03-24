import { func } from "prop-types"
import React from "react"
import { firebase, FieldValue } from "./firebase"
import {Context} from "./Context"
import {Link} from "react-router-dom"
import { formatDistance } from "date-fns"
import CommentBox from "./popup/CommentBox"
import Skeleton from "react-loading-skeleton"

 const ShowData = ({ photos }) => {
    const [heart, setHeart] = React.useState(photos.checkLike)
    const [likeLength, setLikeLength] = React.useState(0)
    const [com, setCom] = React.useState("")
    const [spam, setSpam] = React.useState(0)
    const [changeCom, setChangeCom] = React.useState(photos.photo.comments)
    const dataFromphotos = photos.photo
    const focusOnCom = React.useRef(null)
    const [hide, setHide] = React.useState(false)

    const {userData, setTrack} = React.useContext(Context)

    async function handleLike() {
       const like = await firebase.firestore().collection("photos").doc(photos.photo.docId).update({
         likes: heart ? FieldValue.arrayRemove(userData.userId) : FieldValue.arrayUnion(userData.userId)
       })
       setHeart(pres => !pres)
       setTrack(pres => !pres)
    } 

    async function getLengths() {
      const getLength = await firebase.firestore().collection("photos").doc(photos.photo.docId).get()
      setLikeLength(getLength.data().likes.length)
    }
    getLengths()

    const changeHeart = heart ? "fa-solid fa-heart heartReaction useless0" : "fa-regular fa-heart heartReaction"

      function handleCom() {
        focusOnCom.current.focus()
      }

      async function comBox(event) {
        setCom(event.target.value)
      }

      async function post(event) {
        event.preventDefault()
         const postCom = await firebase.firestore().collection("photos").doc(dataFromphotos.docId).update({
           comments: FieldValue.arrayUnion({comment: com, date: Date.now(), displayName: userData.username, profile: userData.profilePic})
         })    
         const getLength = await firebase.firestore().collection("photos").doc(photos.photo.docId).get()
         const sortCom = getLength.data().comments.length - 1
         setChangeCom(pres => [getLength.data().comments[sortCom], ...pres])    
         setCom("")
         setTrack(pres => !pres)
       }
      
      const allComments = changeCom.slice(0 , 3).map(data => 
        <div className="no" key={data.displayName && data.comment}>
         <Link to={`/profile/${data.displayName}`}><span>{data.displayName}</span></Link>
         <span className="com">{data.comment}</span>
        </div>
       )

       function commentbox() {
         setHide(pres => !pres)
       }

      const checkDis = com === "" ? true : false

    return (
      <>
        <div className="data">
          <div className="postHeader">
            <div className="profileimg">
            <img src={photos.profilePic} className="imgFrompost"/>
            </div>
            <Link to={`/profile/${photos.username}`}><span style={{padding: "3px 4px"}}>{photos.username}</span></Link>    
          </div>
          <div className="post">
           <img src={photos.photo.imageSrc} className="postimg" />    
          </div>
          <div className="reaction">
            <i className={changeHeart} onClick={handleLike}></i>
            <i className="fa-regular fa-comment commentBox" onClick={handleCom}></i>
          </div>
          <div className="like">{likeLength > 0 ? `${likeLength} likes` : "0 like"}</div>
          <div>
              <Link to={`/profile/${photos.username}`}><span  className="caption">{photos.username}</span></Link>
              <span>{dataFromphotos.caption}</span>
          </div>
          {changeCom.length >= 3 && 
          <div className="allcomment okk" onClick={commentbox}>
            View all {changeCom.length} comments
          </div>
          }
          <div className="comment">
             {allComments}
          </div>
          <div className="date">{formatDistance(dataFromphotos.dateCreated, new Date())} Ago</div>
          <form onSubmit={post}>
          <div className="box">
            <input type="text" className="commentbox" value={com} placeholder="Add a comment" ref={focusOnCom} onChange={comBox}/>
            <button className="posts" disabled={checkDis}>Post</button>
          </div>
          </form>
        </div>
        {hide && <CommentBox photos={photos} hide={hide} setHide={setHide} likeLength={likeLength} heart={heart} setHeart={setHeart}/>}
        </>
    ) 
}

export default React.memo(ShowData)