import React from 'react'
import {Link, useNavigate, useLocation} from "react-router-dom"
import {Context} from "../Context"
import { FieldValue, firebase } from '../firebase'
import {motion} from "framer-motion"


function NewBox({data, owe, issue, set}) {
    const [values, setValues] = React.useState(false)
    const {userData, followUser, Unfollow} = React.useContext(Context)
    const alreadyFollowing = !userData.following.includes(data.userId) && data.userId !== userData.userId

    return (
        <>
        {values === false ?
        <div className="mainSug pet" >
        <div className="suggest suggest2">
          <img src={data.profilePic} className="imgForSug"/>
         <div className='mile'>
          <Link to={`/profile/${data.username}`}><div className="pad pads padding" onClick={() => set(false)}>{data.username}</div></Link>
          <div className='pads padd padding'>{data.fullName}</div>
         </div>
        </div>
        <div className="pad">
          {userData.userId === issue.userId ? 
          <motion.button whileHover={{scale:1.1}} whileTap={{scale: 0.9}} className='burForUnfollow' onClick={() => Unfollow(data.userId, data.docId, setValues)}>UnFollow</motion.button> : 
          <>{alreadyFollowing && <motion.button whileHover={{scale:1.1}} whileTap={{scale: 0.9}} className="butForSug ands" onClick={() => followUser(setValues, data)}>Follow</motion.button>}</>}
        </div>
        </div> :
           null}
        </>
    )
}

export default NewBox
