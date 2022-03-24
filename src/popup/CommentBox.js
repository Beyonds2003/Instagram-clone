import { func } from 'prop-types'
import React from 'react'
import { Context } from '../Context'
import {Link} from "react-router-dom"
import {firebase, FieldValue} from "../firebase"
import Skeleton from "react-loading-skeleton"
import {formatDistance} from "date-fns"

function CommentBox({photos, hide, setHide, likeLength, heart, setHeart}) {

    const { userData, setAndroid } = React.useContext(Context)
     const [com, setCom] = React.useState("")
     const [comment, setComment] = React.useState(photos.photo.comments)

     function scroll() {
      if(hide) {
       document.body.style.overflow = "hidden"
      } else {
       document.body.style.overflow = "scroll"
      }
  }
  
    React.useEffect(async() => {
      const filterOtherUserData = comment.filter(item => item.displayName !== userData.username)
      const filterMyData = comment.filter(item => item.displayName === userData.username)
      const changeData = filterMyData.map(item => ({...item, profile: userData.profilePic}))
      setComment(filterOtherUserData.concat(changeData))
      console.log("hi")
        const result = await firebase.firestore().collection("photos").doc(photos.photo.docId).update({
        comments: filterOtherUserData.concat(changeData)
         })
      scroll()
    }, [])
    async function comBox(event) {
      setCom(event.target.value)
    }
    const styles = {
      fontWeight: "normal",
      fontSize: 14,
      opacity: 0.5
    }

    const mapCom = comment.sort((a,b) => b.date - a.date).map(data => { 
        return (
            <div  key={data.displayName && data.comment} className="forTimeLine ff">
            <div><img  src={data.profile} className='imgForSug'/></div>
            <div className="no pad no99">
            <Link to={`/profile/${data.displayName}`}><span>{data.displayName}</span></Link>
            <span className="com">{data.comment}</span>
            <div style={styles}>{formatDistance(data.date, new Date())} ago</div>
           </div>
           </div>
        )
    })

    async function handleLike() {
      const like = await firebase.firestore().collection("photos").doc(photos.photo.docId).update({
        likes: heart ? FieldValue.arrayRemove(userData.userId) : FieldValue.arrayUnion(userData.userId)
      })
      setHeart(pres => !pres)
      setAndroid(pres => !pres)
   }

    const focusCom = React.useRef(null)

    function handleCom() {
      focusCom.current.focus()
    }

    async function post(event) {
      event.preventDefault()
       const postCom = await firebase.firestore().collection("photos").doc(photos.photo.docId).update({
         comments: FieldValue.arrayUnion({comment: com,date: Date.now(), displayName: userData.username, profile: userData.profilePic})
       })    
       const getLength = await firebase.firestore().collection("photos").doc(photos.photo.docId).get()
       const sortCom = getLength.data().comments.length - 1
        setComment(pres => [getLength.data().comments[sortCom], ...pres])    
        setCom("")
        setAndroid(pres => !pres)
     }

     function changes() {
      document.body.style.overflow = "scroll"
      setHide(false)
      setAndroid(pres => !pres)
     }
    const checkDis = com === "" ? true : false

    const changeHeart = heart ? "fa-solid fa-heart heartReaction useless0" : "fa-regular fa-heart heartReaction"

    return (
            <div className='yoyo ms'>
                <i className="fa-solid fa-xmark wrong" onClick={changes}></i>
              <div className='when'>
              <div className='img66'>
                    <img src={photos.photo.imageSrc} className="ads"/>
                </div>
                <div className='allComs'>
                 {/* mobile div  */}
                  <div className='comDiv'>
                      <div className='firCom'>
                        <i className="fa-solid fa-angle-left f4 " onClick={changes}></i>
                        <div className='hii'>Comments</div>
                        <div>
                        <i className={`${changeHeart} heartReactionss`} onClick={handleLike}></i>
                        <div className="like likess">{likeLength > 0 ? `${likeLength} likes` : "0 like"}</div>
                        </div>
                      </div>
                       <div style={{background: "#d4d4d4"}}>
                       <div className='tt'>
                          <img src={userData.profilePic} className="imgForSug"/>
                          <form onSubmit={post}>
                          <div className='flitter'>
                              <input type="text" className='commentbox commentbox2' placeholder="Add a comment" onChange={comBox}/>
                              <button className='posts poster' disabled={checkDis}>Post</button>
                          </div>
                          </form>
                      </div>
                       </div>
                  </div>
                  <div className='pc'>
                  <div className='forTimeLine comment'>
                    <div><img src={photos.profilePic} className="imgForSug"/></div>
                     <div className='extra'>
                     <Link to={`/profile/${photos.username}`}><span  className="petss">{photos.username}</span></Link>
                    <span>{photos.photo.caption}</span>
                     </div>
                  </div>
                     <div className='messup'>
                     <div className='comment'>
                         {mapCom}
                     </div>
                     </div>
                     <div className='by'>
                     <div className="reaction">
                      <i className={changeHeart} onClick={handleLike}></i>
                      <i className="fa-regular fa-comment commentBox" onClick={handleCom}></i>
                    </div>
                    <div className="like">{likeLength > 0 ? `${likeLength} likes` : "0 like"}</div>
                    <div className="date">{formatDistance(photos.photo.dateCreated, new Date())} Ago</div>
                    <form onSubmit={post}>
                    <div className="box">
                      <input type="text" className="commentbox" ref={focusCom} value={com}  placeholder="Add a comment" onChange={comBox}/>
                      <button className="posts" disabled={checkDis}>Post</button>
                    </div>
                    </form>
                     </div>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default React.memo(CommentBox)
