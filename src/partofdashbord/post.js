import React, {Suspense} from "react"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton"
import {Context} from "../Context"
import ShowData from "../ShowData"
import TimeLine from "../partofdashbord/timeline"
import CommentBox from "../popup/CommentBox"
import SuggestionList from "../SuggestionList"

export default function Post() {
   
    const { photo } = React.useContext(Context)
    const considerShowOrNot = photo

    const mapPhoto = photo.map(data => <ShowData key={data.photo.docId} photos={data}/>)
    return(
        <>
        <div className="postContainer">
             <div className="forM">Suggestions For You</div>
             <div className="sugs">
                 <SuggestionList />
             </div> 
            {considerShowOrNot ?
             <Suspense fallback={<h1>Loading...</h1>}>
                <div className="forTimeLine">
                {photo.length === 0 ? <h3 className="f3">Follow people to see their posts</h3> :<div className="showData">
                 {mapPhoto}    
                </div>}            
                <TimeLine />
                </div>
             </Suspense>
            : 
             <Skeleton />
            }
        </div>
        </>
    )
}