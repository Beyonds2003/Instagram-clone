import propTypes from "prop-types"
import React from "react"
import {firebase, FieldValue} from "./firebase"
import {useNavigate} from "react-router-dom"
import { act } from "@testing-library/react"

const Context = React.createContext()


const ThemeContext = (props) => {

  const navigate = useNavigate()
   
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [active, setActive] = React.useState(JSON.parse(localStorage.getItem("authInfo")))
  const [userData, setUser] = React.useState(null)
  const [photo, setPhoto] = React.useState([])
  const [change, setChange] = React.useState(false)
  const [trackCom, setTrack] = React.useState(false)
  const [update, setUpdate] = React.useState(false)
  const [android, setAndroid] = React.useState(false)
  
  

  function handleEmail(event) {
    setEmail(event.target.value)
  }

  function handlePassword(event) {
    setPassword(event.target.value)
  }

  const checkData = async (event) => {
    event.preventDefault()
    try {
     await firebase.auth().signInWithEmailAndPassword(email, password)
      navigate("/")
    } catch(errors) {
      setError(errors.message)
      setEmail("")
      setPassword("")
    }
    setEmail("")
    setPassword("")
}

React.useEffect(() => {
  const UserData = firebase.auth().onAuthStateChanged(auths => {
    if(auths) {
      localStorage.setItem("authInfo", JSON.stringify(auths))
      setActive(auths)
    } else {
      localStorage.removeItem("authInfo")
      setActive(null)
    }
  })

 return () => UserData()
}, [firebase])


const getfirestoreData = async(id) => {
  const userdatafromFirestore = await firebase.firestore().collection("users").where("userId", "==", id).get()
  return userdatafromFirestore.docs.map(items => setUser({...items.data(), docId: items.id}))
}
React.useEffect(() => {

  if(active) {
    getfirestoreData(active.uid)
  }
}, [active, navigate, change])

const getUserFollowedPhoto = async (followUserData) => {
   try {
    const result = await firebase.firestore().collection("photos").where("userId", "in", followUserData).get()
    const dataFromFollower = await result.docs.map(item => ({...item.data(), docId: item.id}))
    
    const myPost = await firebase.firestore().collection("photos").where("userId", "==", userData.userId).get()
    const myPostes = await myPost.docs.map(item => ({...item.data(), docId: item.id}))
    const combine = await myPostes.concat(dataFromFollower)

    const controlLike = await Promise.all(
      combine.map(async(photo) => {
        let checkLike = false
        if(photo.likes.includes(userData.userId)) {
          checkLike = true
        }
      const getFollowerName = async(id) => {
        let result = await firebase.firestore().collection("users").where("userId", "==", id).get()
        const gg =  result.docs.map(item => item.data())
        return gg
      }
        
        const user = await getFollowerName(photo.userId)
        const profilePic = await user[0].profilePic
        const username = await user[0].username
        
        return {username, photo: {...photo}, checkLike, profilePic}
      })
    )
  
  return controlLike
   } catch(error) {
     return 
   }
}

React.useEffect(async () => {
  let emptyArray = []
  
 if (userData) {
   emptyArray = await  getUserFollowedPhoto(userData.following)
 }
try {
  const sortData = emptyArray.sort((a,b) => b.photo.dateCreated - a.photo.dateCreated)
 setPhoto(sortData)
} catch(e) {
return
}

}, [userData, navigate, trackCom, android])


async function handleClickFollow(first, second, third, forth, fifh) {
  forth(pres => !pres)
  
    const putFollowing = await firebase.firestore().collection("users").doc(first).update({
      following: fifh ? FieldValue.arrayRemove(second) : FieldValue.arrayUnion(second)
    })
    const putFollower = await firebase.firestore().collection("users").doc(third).update({
      followers:fifh ? FieldValue.arrayRemove(userData.userId) : FieldValue.arrayUnion(userData.userId)
   })
}

async function followUser(dada, sec) {
  dada(pres => !pres)
  const putFollowingToUser = await firebase.firestore().collection("users").doc(userData.docId).update({
    following: FieldValue.arrayUnion(sec.userId)
  })
  const putFollowers = await firebase.firestore().collection("users").doc(sec.docId).update({
    followers: FieldValue.arrayUnion(userData.userId)
  })
  setChange(pres => !pres)
}

async function Unfollow(first, second, third) {
  const result = await firebase.firestore().collection("users").doc(userData.docId).update({
    following: FieldValue.arrayRemove(first)
  })
  
  const final = await firebase.firestore().collection("users").doc(second).update({
    followers: FieldValue.arrayRemove(userData.userId)
  })
  third(true)
  setChange(pres => !pres)
}

  const checkInput = email === "" || password === ""

    return (
        <Context.Provider value={{firebase, followUser, Unfollow, FieldValue, email, password, handleEmail, handlePassword, checkInput, checkData, error, active, userData, photo, handleClickFollow, setTrack, setUpdate, android, setAndroid}}>
          {props.children}  
        </Context.Provider>
    )
}

export {ThemeContext, Context}