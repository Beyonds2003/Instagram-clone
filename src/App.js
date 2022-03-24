import React from "react"
import {Routes, Route, Link, useNavigate} from "react-router-dom"
import { Context } from "./Context"
const DashBord = React.lazy(() => import("./firstPage/dashbord"))
const Login = React.lazy(() => import("./firstPage/login"))
const NotFound = React.lazy(() => import("./firstPage/notFound"))
const Profile = React.lazy(() => import("./firstPage/profile"))
const SignUp = React.lazy(() => import("./firstPage/signUp"))


export default function App() {
    const {userData, active} = React.useContext(Context)
    const navigate = useNavigate()
    
     React.useEffect(() => {
       if(active === null) {
           navigate("/login")
       }
     }, [])
     
    return(
       <React.Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
                <Route exact path="/" element={<DashBord />}/>
               <Route path="/login" element={<Login />}/>  
                <Route path="/signup" element={<SignUp />}/>  
                <Route path="/profile/:id" element={<Profile />}/>  
                <Route path="/:random" element={<NotFound />}/>  
           </Routes>
        </React.Suspense>  
    )
}