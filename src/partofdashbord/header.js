import React from "react"
import {Link, Navigate, useNavigate} from "react-router-dom"
import { Context } from "../Context"
import { firebase } from "../firebase"
import NewPost from "../popup/NewPost"

export default function Header({setPost}) {

    const {active, userData} = React.useContext(Context)


    const user = active

    const navigate = useNavigate()

    function handleHome(event) {
        navigate("/")
    }

    function handleSignOut(event) {
        event.key = firebase.auth().signOut()
        navigate("/login")
    }
    return(
        <div className="head">
            <Link to={`/`}><img className="imgs" src="https://pngimage.net/wp-content/uploads/2018/06/instagram-font-png-1.png" /></Link>
            <div className="iconContainer">
             {user ? 
              <>
               <i className="fa-solid fa-house-chimney house" onClick={handleHome}></i>
               <img src="https://static.thenounproject.com/png/809337-200.png" className="img00" onClick={() => setPost(true)}/>
               <i className="fa-solid fa-right-from-bracket house" onClick={handleSignOut}></i>
               <div style={{padding: "5px 0px"}}>
               {userData && <Link to={`/profile/${userData.username}`}><img className="imgs2" src={userData.profilePic}/></Link>}
               </div>
              </> :
              <div style={{padding: "10px"}}>
                  <button className="buts buts1"><Link to="/login" style={{color: "white"}}>Log in</Link></button>
                  <button className="buts buts2"><Link to="/signup">Sign up</Link></button>
              </div>
            }
            </div>
        </div>
    )
}