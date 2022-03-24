import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { firebase, FieldValue } from "./firebase"
import { Link } from "react-router-dom"
import { Context } from "./Context"

const SuggestPeople = ({sugData, userData}) => {
    const [follow, setFollow] = React.useState(false)

    const {followUser} = React.useContext(Context)
      
     const animateDiv = {
         exit: {
            opacity: 0,
             transition: {
                 duration: 0.5, ease: "easeInOut"
             }
         }
     }
    return (
       <>
        <AnimatePresence>
        {follow === false && 
         <motion.div className="mainSug forMobile"
         variants={animateDiv}
         exit="exit"
        >
         <div className="suggest">
           <img src={sugData.profilePic} className="imgForSug"/>
           <Link to={`/profile/${sugData.username}`}><div className="pad">{sugData.username}</div></Link>
         </div>
         <div className="pad">
           <button className="butForSug" onClick={() => followUser(setFollow, sugData)}>Follow</button>
         </div>
         </motion.div>
         }
        </AnimatePresence>
       </>
    )
}

export default React.memo(SuggestPeople)