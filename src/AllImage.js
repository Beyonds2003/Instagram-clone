import React from 'react'
import {Context} from "./Context"
import CommentBox from './popup/CommentBox'
import { AnimateSharedLayout } from 'framer-motion'
import { motion } from 'framer-motion'

function AllImage({allPhotos, checkLike, profilePic}) {
    
    const [check, setCheck] = React.useState(false)
    const [hide, setHide] = React.useState(false)

    const {userData} = React.useContext(Context)
    
    const checking = checkLike.includes(userData.userId)

    const [heart, setHeart] = React.useState(checking)
    const changeHeart = heart ? "fa-solid fa-heart heartReaction useless9" : "fa-solid fa-heart heartReaction useless2"

    function change() {
        setHide(true)
    }
    return (
       <>
        <div className='img44' onClick={change}>
            <img src={allPhotos.imageSrc} className="img34"
             onMouseEnter={() => setCheck(true)}
            />
            { check ?
            <div className='black'
            onMouseEnter={() => setCheck(true)}
            onMouseLeave={() => setCheck(false)}
             onClick={change}
            >
             <div className='container'> 
              <div>
              <i className={changeHeart} ></i>
              <span className='sp'>{allPhotos.likes.length}</span>
              </div>
                <div>
                <i className="fa-solid fa-comment commentBox useless6"></i>
                <span className='sp'>{allPhotos.comments.length}</span>
                </div>
             </div> 
            </div> : null
            }
        </div>
             {hide && 
             <CommentBox photos={{photo : allPhotos, profilePic: profilePic[0].profilePic}} hide={hide} setHide={setHide} likeLength={checkLike.length} heart={heart} setHeart={setHeart}/>
             }        
       </>
    )
}

export default AllImage
