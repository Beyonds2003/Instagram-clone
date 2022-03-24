import React from "react"
import {Link, Navigate, useNavigate} from "react-router-dom"
import {Context} from "../Context"

export default function SignUp() {
    
     const [email, setEmail] = React.useState("")
     const [password, setPassword] = React.useState("")
     const [username, setUsername] = React.useState("")
     const [fullnmae, setFullname] = React.useState("")
     const [error, setError] = React.useState("")

     const navigate = useNavigate()
     const {firebase} = React.useContext(Context)

     function handleEmail(event) {
         setEmail(event.target.value.toLowerCase())
     }
     function handleFullname(event) {
        setFullname(event.target.value)
    }
    function handleUsername(event) {
        setUsername(event.target.value.toLowerCase())
    }
    function handlePassword(event) {
        setPassword(event.target.value)
    }

    const doesUserExit = async(us) => {
          const result = await firebase.firestore().collection("users").where("username", "==", us).get()
          return result.docs.map(user => user.data().length > 0).length
    }

    React.useEffect(() => {
        document.title = "Sign Up-Instagram"
    }, [])

    const handleFinish = async(event) => {
          event.preventDefault()
          const UserExit = await doesUserExit(username)
          if(UserExit === 0) {
            try {
                const createdUserInfo = await firebase.auth().createUserWithEmailAndPassword(email, password)
                
                createdUserInfo.user.updateProfile({
                    displayName: fullnmae
                })
                
                firebase.firestore().collection("users").add({
                 userId: createdUserInfo.user.uid,
                 username: username.toLocaleLowerCase(),
                 fullName: fullnmae,
                 emailAddress: email.toLowerCase(),
                 following: [],
                 followers: [],
                 dateCreated: Date.now(),
                 password: password,
                 profilePic: "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                })
                navigate("/")
               } catch(errors) {
                   setError(errors.message)
               }
          } else {
              setError("That UserName is already taken. Please try again")
              setUsername("")
              setFullname("")
          }
    }

    const checkDisable = email === "" || password === "" || username === "" || fullnmae === ""
 
    return (
        <div className="mother">
            <div className="secMom">
               <div >
               <img className="inlineCss" src="https://www.pngitem.com/pimgs/m/132-1327993_instagram-logo-word-png-transparent-png.png" />
               </div>
               <form onSubmit={handleFinish}>
                   <span className="error">{error}</span>
               <div className="inputContainer">
               <input type={"text"} placeholder="Email" value={email} className="email" onChange={handleEmail}></input>
               <input type={"text"} placeholder="Username" value={username} className="email" onChange={handleUsername}></input>
               <input type={"text"} placeholder="Full Name" value={fullnmae} className="email" onChange={handleFullname}></input>
               <input type={"password"} placeholder="Password" value={password} className="password" onChange={handlePassword}></input>
               </div>
               <button disabled={checkDisable} className="bot">Sign Up</button>
               <div className="div">
                <div className="bottomText">Have an account? {" "} <Link to="/login" className="nextTosign">Login</Link></div>
               </div>
               </form>
            </div> 
        </div>
    )
}