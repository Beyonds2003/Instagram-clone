import React from "react"
import { Context } from "../Context"
import Header from "../partofdashbord/header"
import Post from  "../partofdashbord/post"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import NewPost from "../popup/NewPost"

export default function DashBord() {
    const {userData, photo} = React.useContext(Context)
    const [post, setPost] = React.useState(false)

    document.body.style.overflow = "scroll"
    return (
       <div>    
          {userData === null ?
                      <div className="skemom">
                      <div className="sketop">
                         <div className="skeleton">
                         <div className="avator">
                         <Skeleton circle className="postd"/>
                         </div>
                         <div className="skeTitle"><Skeleton className="postd"/></div>
                         </div>
                         <div className="skeImg">
                           <Skeleton className="postd"/>
                         </div>
                         <div className="skeTitle oma"><Skeleton className="postd"/></div>
                         <div className="skeTitle oma"><Skeleton className="postd"/></div>
                         <div className="skeTitle oma"><Skeleton className="postd"/></div>
                      </div>
                      <div className="sketop skeletop2">
                         <div className="skeleton skeletons">
                         <div className="avator avator2">
                         <Skeleton circle className="postd"/>
                         </div>
                         <div className="skeTitle skeTitle2"><Skeleton className="postd"/></div>
                         </div>
                         <div className="skeTitle oma2"><Skeleton className="postd"/></div>
                         <div className="skeTitle oma2"><Skeleton className="postd"/></div>
                         <div className="skeTitle oma2"><Skeleton className="postd"/></div>
                         <div className="skeTitle oma2"><Skeleton className="postd"/></div>
                         <div className="skeTitle oma2"><Skeleton className="postd"/></div>
                      </div>
                   </div>
             :
            <>
            <Header setPost={setPost}/>
            <div className="motherOFtwo">
            <Post />
            {post && <NewPost setPost={setPost} post={post}/>}
            </div>
            </>
            }
       </div>
    )
}