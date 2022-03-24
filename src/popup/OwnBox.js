import React from 'react'
import {Link, useNavigate, useLocation, Routes, Route} from "react-router-dom"
import { Context } from '../Context'
import {motion} from "framer-motion"


function OwnBox({data, unset}) {

    const location = useLocation()
    function extra(name) {
        unset(false)
    }

    const {userData, followUser} = React.useContext(Context)

    const [values, setValues] = React.useState(false)

    const alreadyFollow = userData.following.includes(data.userId)

    return (
    <>
    <div className="mainSug pet" >
    <div className="suggest suggest2">
      <img src={data.profilePic} className="imgForSug"/>
     <div className='mile'>
      <Link to={`/profile/${data.username}`}><div className="pad pads" onClick={() => extra(data.username)}>{data.username}</div></Link>
      <div className='pads padd padding'>{data.fullName}</div>
     </div>
    </div>
    <div className="pad">
      {userData.userId !== data.userId && !alreadyFollow && <motion.button whileHover={{scale: 1.1}} whileTap={{scale:0.9}} className="butForSug ands" onClick={() => followUser(setValues, data)}>Follow</motion.button>}
    </div>
    </div> 
    </>
    )
}

export default OwnBox
