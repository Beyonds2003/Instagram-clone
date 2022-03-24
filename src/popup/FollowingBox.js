import React from 'react'
import {AnimatePresence, motion, useDeprecatedAnimatedState} from "framer-motion"
import {Link, useNavigate, useLocation} from "react-router-dom"
import OwnBox from './OwnBox'
import NewBox from './NewBox'
import {firebase} from "../firebase"
import { Context } from '../Context'

const initialState = {
  following: []
}

function reducer(state, action) {
  return {
    ...state, ...action
  }
}

function FollowingBox( {unset, info, data, followers, owe, set} ) {
    const variants = {
      initial : {
       scale: 1.2,
      },
      open : {
        scale : 1,
        transition: {duration: 0.2}
      },
      closes : {
        scale : 0,
        transition: {duration: 0.2}
      }
    } 

    const [state, dispatch] = React.useReducer(reducer, initialState)
    const {userData, Unfollow} = React.useContext(Context)

    function scroll() {
      if(unset) {
       document.body.style.overflow = "hidden"
      } else {
       document.body.style.overflow = "scroll"
      }
  }
    scroll()
    React.useEffect(async() => {
      try {
        const followings = await firebase.firestore().collection("users").where("userId", "in", data.following).get()
        const getfollowing =  followings.docs.map(item => ({...item.data(), docId: item.id}))
        
        dispatch({following : getfollowing})
      } catch(err) {
        return dispatch({following : []})
      }

      return () => dispatch({following : []})
}, [userData, data, Unfollow])

    const mapDatas = followers.map(data => {
        return(
          <OwnBox data={data} key={data.userId} unset={unset}/>
        )
    })

    const mapData2 = state.following.map(dada => 
      <NewBox data={dada} issue = {data} key={dada.docId} owe={owe} set={set}/>
      )

    function closeTap() {
      unset(false)
      set(false)
    }

    const followersBox = 
         <>
          {followers.length > 0 ?
          <>
           {mapDatas}
          </>
    :
         <div className='forFlex'>
           <div className='motherOFtwo'>
            <div className='too'>
             <img src='https://static.thenounproject.com/png/682465-200.png' className='img89'/>
            </div>
           </div>
           <div className='cb'>Followers</div>
           <div>You'll see all the people who follow this person here.</div>
         </div>
         }
          </>

    const followingBox = 
    <>
    {data.following.length > 0 ?
    <>
     {mapData2}
    </>
:
   <div className='forFlex'>
     <div className='motherOFtwo'>
      <div className='too'>
       <img src='https://static.thenounproject.com/png/682465-200.png' className='img89'/>
      </div>
     </div>
     <div className='cb'>No Following</div>
   </div>
   }
    </>
    return (
        <div className='ms yoyo'>
        <motion.div className='followBoxs'
          variants={variants}
          animate={info || owe ? "open" : "closes"}
          initial="initial"
        >
            <div className='heads'>
              <i className="fa-solid fa-angle-left f4 f5" ></i>  
              {info && <div className='title'>Followers</div>}
              {owe && <div className='title'>Following</div>}
              <i className="fa-solid fa-xmark f4" onClick={closeTap}></i>
            </div>
             {info ? followersBox : followingBox}
        </motion.div>
        </div>
    )
}

export default FollowingBox
