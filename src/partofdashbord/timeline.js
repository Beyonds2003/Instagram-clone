import React from "react"
import {Context} from "../Context"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import SuggestionList from "../SuggestionList"

export default function TimeLine() {

    const {userData} = React.useContext(Context)
    return(
        <div className="timeLine">
          {!userData ? 
          <Skeleton />
          : 
          <div className="pro">
           <div style={{display: "flex"}}>
             <img src={userData.profilePic} className="imgForProfile"/>
             <div className="ggs">
              <Link to={`/profile/${userData.username}`}><div>{userData.username}</div></Link>
              <div className="gg4">{userData.fullName}</div>
             </div>
            </div>
           <div className="suggests">Suggestions For You</div>
           <SuggestionList />
         </div> 
        }
        </div>
    )
}