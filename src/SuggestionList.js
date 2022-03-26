import React from "react"
import {firebase, FieldValue} from "./firebase"
import { Context } from "./Context"
import SuggestPeople from "./SuggestPeople"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import ShowMore from "./popup/ShowMore"

const SuggestionList = () => {
       const {userData} = React.useContext(Context)
       
       const [sugData, setSugData] = React.useState([])
       const [show, setShow] = React.useState(false)
     
       React.useEffect(async() => {
        const alluserData = await firebase.firestore().collection("users").get()
        const dd = await alluserData.docs.map(item => ({...item.data(), docId: item.id}))

        const filterData = await dd.filter(gg => gg.userId !== userData.userId && !userData.following.includes(gg.userId))
            setSugData(filterData)
       }, [userData])
       const mapData = sugData.slice(0, 5).map(data => <SuggestPeople key={data.docId} sugData={data} userData={userData}/>)
       document.body.style.overflow = "scroll"
    return (
         <>
          {mapData}
          {sugData.length > 5 && <div className="showMore" onClick={() => setShow(true)}>Show more</div>}
          {show && <ShowMore show={show} setShow={setShow} sugData={sugData}/>}
         </>
    )
}

export default React.memo(SuggestionList)