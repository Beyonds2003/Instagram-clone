import React from "react"
import {Link} from "react-router-dom"
import { Context } from "../Context"

export default function Login() {


    const {email, password, handleEmail, handlePassword, checkInput, checkData, error} = React.useContext(Context)

    return (
        <div className="mother">
            <div className="imgContainer">
                <img className="ads" src="https://newsfeed.org/wp-content/uploads/Instagram-Ads-In-Explore-Tab.png"/>
            </div>
            <div className="secMom">
               <div >
               <img className="inlineCss" src="https://www.pngitem.com/pimgs/m/132-1327993_instagram-logo-word-png-transparent-png.png" />
               </div>
               <form onSubmit={checkData}>
                   <span className="error">{error}</span>
               <div className="inputContainer">
               <input type={"text"} placeholder="Enter your email" className="email" value={email} onChange={handleEmail}></input>
               <input type={"password"} placeholder="Enter your password" className="password" value={password} onChange={handlePassword}></input>
               </div>
               <button disabled={checkInput} className="bot">Login</button>
               <div className="div">
                <div className="bottomText">Don't have an account? {" "} <Link to="/signup" className="nextTosign">Sign up</Link></div>
               </div>
               </form>
            </div>
        </div>
    )
}