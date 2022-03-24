import React from "react"
import Skeleton from "react-loading-skeleton"
import {useNavigate, useParams} from "react-router-dom"
import { Context } from "../Context"
import { firebase } from "../firebase"
import Header from "../partofdashbord/header"
import AllImage from "../AllImage.js"
import { motion, AnimatePresence } from "framer-motion"
import FollowingBox from "../popup/FollowingBox"
import NewPost from "../popup/NewPost"

const initialState = {
    profile: null,
    photoData: [],
    checkFollow: false,
    myData: null, 
    followers: [],
}

function reducer(state, action) {
    return {
        ...state, ...action
    }
}


const Profile = () => {
    const {userData, handleClickFollow, android} = React.useContext(Context)
     const params = useParams()

     const [state, dispatch] = React.useReducer(reducer, initialState)
     const [fuck, setFuck] = React.useState(false)
     const [post, setPost] = React.useState(false)
     const [followerBut, setFollowerBut] = React.useState(false)
     const [owe, setFollowingBut] = React.useState(false)
     const [pop, setPop] = React.useState(false)
     const [getURL, setgetURL] = React.useState(null)
     const measureHeight = React.useRef(null)
     const [imgData, setImgData] = React.useState(null)
     const focusFile = React.useRef(null)
     document.body.style.overflow = "scroll"
    React.useEffect(() => {
      async function lastShot() {

       if(getURL) {
         setPop(true)
        const ChangeProfileOnNewFeed = await firebase.firestore().collection("users").doc(userData.docId).update({
          profilePic: getURL
        })
        setTimeout(() => {
          setPop(false)
        }, 3000)
       } 

        const getDataByUsername = await firebase.firestore().collection("users").where("username", "==", params.id).get()
        const takeData = await getDataByUsername.docs.map(item => ({...item.data(), docId: item.id}))
      
        const getPhotosByUsers = await firebase.firestore().collection("photos").where("userId", "==", takeData[0].userId).get()
        const takePhotos = await getPhotosByUsers.docs.map(item => ({...item.data(), docId: item.id}))
  
        const FollowUnFollow = await firebase.firestore().collection("users").where("userId", "==", userData.userId).get()
        const putting = await FollowUnFollow.docs.map(item => item.data())
        const lookOver = putting[0].following.includes(takeData[0].userId)
        
       try{
          const followers = await firebase.firestore().collection("users").where("userId", "in", takeData[0].followers).get()
          const getfollowers = await followers.docs.map(item => ({...item.data(), docId: item.id}))
          
          dispatch({profile: takeData, photoData: takePhotos, checkFollow: lookOver, myData: userData, followers: getfollowers})
        } catch(err) {
          return ( dispatch({profile: takeData, photoData: takePhotos, checkFollow: lookOver, myData: userData, followers: []})
          )
        }

       return () => dispatch({profile: takeData, photoData: takePhotos, checkFollow: lookOver, myData: userData, followers: []})
      }
          setTimeout(() => lastShot(), 1000) 
     }, [userData, fuck, android, getURL])

    function handleFile(e) {
      focusFile.current.click()
      if(e.target.files) {
        setImgData(e.target.files[0])
      } else {
        return 
      }
    }
   
    React.useEffect(async() => {
      if(imgData) {
         const storageRef = await firebase.storage().ref().child(`${userData.username}`)
         const imgURL = await storageRef.put(imgData)
         setgetURL( await storageRef.getDownloadURL())
      }

    }, [imgData])
    // https://wallpaperboat.com/wp-content/uploads/2020/10/10/56748/hoodie-cute-anime-girl-01.jpg

     const mapPhotos = state.photoData.map(data => <AllImage key={data.photoId} allPhotos ={data} checkLike={data.likes} profilePic={state.profile}/>) 
      const distinguishUser = () => {
        if(state.myData) {
          const valid = params.id === state.myData.username ? 
          <>
          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="butForEdit" onClick={handleFile}>Edit Profile</motion.button>
          <input  type="file" name="Image" accept="image/*" id="hell" ref={focusFile} onChange={handleFile} style={{display: "none"}}/>
          </> 
          : 
           state.checkFollow  ? 
          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="butForEdit " onClick={() => handleClickFollow(userData.docId, state.profile[0].userId, state.profile[0].docId, setFuck, state.checkFollow)}>UnFollow</motion.button> : 
          <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="butForEdit butFollow" onClick={() => handleClickFollow(userData.docId, state.profile[0].userId, state.profile[0].docId, setFuck, state.checkFollow)}>Follow</motion.button>
           return valid
         }
      else {
          <Skeleton />
      }
    }

    function Followers() {
      setFollowerBut(true)
    }

    function Following() {
      setFollowingBut(true)
    }
    return (
        <div>
            <Header setPost={setPost}/>
            {state.profile ?
             <div className="js">
              <div className="jd">
                <div className="profileCon">
                   <img src={state.profile[0].profilePic} className="img23" />
                </div>
                <div className="dataDetail">
                   <div className="first">
                       <div style={{fontSize: 24, opacity:0.8}}>{state.profile[0].username}</div>
                       {distinguishUser()}
                   </div>
                   <div className="second">
                       <div className="user">{state.photoData.length} post</div>
                       <div className="user f8" ref={measureHeight} onClick={Followers}>{state.profile[0].followers.length} followers</div>
                       <div className="user f8" onClick={Following}>{state.profile[0].following.length} following</div>
                   </div>
                   <div className="third">{state.profile[0].fullName}</div>
                </div>
              </div>
              <div className="allposts">
                {mapPhotos.length > 0 ? mapPhotos : <h1 className="okkk">No Post Here</h1>}
              </div>
              <AnimatePresence>
              {pop && <motion.div 
              initial={{y: "150vh"}}
              animate={{y: 0}}
              transition={{duration: 1, type: "tween"}}
              exit={{duration: 1, y: "150vh", type: "tween"}}
              className="popUp">Successfully Added Profile Picture</motion.div>}
              </AnimatePresence>
            </div> :
             null
            }
            {followerBut && 
            <AnimatePresence>
            <FollowingBox unset={setFollowerBut} info={followerBut} data={state.profile[0]} followers = {state.followers}  owe= {owe} set={setFollowingBut}  />
            </AnimatePresence>
            }
            {owe && 
            <AnimatePresence>
            <FollowingBox unset={setFollowerBut} info={followerBut} data={state.profile[0]} followers = {state.followers}  owe= {owe} set={setFollowingBut} />
            </AnimatePresence>
            }
            {post && <NewPost setPost={setPost} post={post}/>}
        </div>
    )
}

export default React.memo(Profile)