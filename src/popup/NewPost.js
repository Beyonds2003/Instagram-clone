import React from 'react'
import { Context } from '../Context'
import { firebase } from '../firebase'
import Picker from 'emoji-picker-react';

function NewPost({setPost, post}) {

    const focusPost = React.useRef(null)

    const {userData} = React.useContext(Context)

    const [imgPost, setImgPost] = React.useState(null)
    const [test, setTest] = React.useState(null)
    const [word, setWord] = React.useState("")
    const [emoji, setEmoji] = React.useState(false)
    const [location, setLocation] = React.useState("")

    function checkLetter(e) {
        setWord(e.target.value)
    }
    function scroll() {
        if(post) {
            document.body.style.overflow = "hidden"
        }
    }
scroll()
    async function Share() {
        const result = await firebase.firestore().collection("photos").add({
            photoId: 0,
            userId: `${userData.userId}`,
            imageSrc: `${imgPost}`,
            caption: `${word}`,
            likes: [],
            comments:  [],
            userLatitude: `${location}`,
            userLongitude: '74.0060°',
            dateCreated: Date.now()
        })
        setPost(false)
    }

     function handlePost(e) {
      focusPost.current.click()
      if(e.target.files) {
          setTest(e.target.files[0])
      }
     }

     function onEmojiClick(event, emojiObject)  {
        setWord(pres => pres + emojiObject.emoji);
        setEmoji(false)
      };

     function Eemoji() {
        setEmoji(pres => !pres)
      }
     React.useEffect(async() => {
          if(test) {
            const result = await firebase.storage().ref().child(`${test.name} Post`)
            const storageRef = await result.put(test)
            setImgPost(await result.getDownloadURL())
          }
     }, [test])
     
     const check = imgPost === null || word === ""
    return (
        <div className='yoyo ms'>
            <i className="fa-solid fa-xmark wrong" onClick={() => setPost(false)}></i>
            <div className='createPost'>
                <div className='firstss'>
                  <i className="fa-solid fa-angle-left f4 " onClick={() => setPost(false)}></i>
                   <div>Create New Post</div>
                   <button className='butForSug ' disabled={check} onClick={Share}>Share</button>
                </div>
                <div className='secPost'>
                   {imgPost ? 
                    <div className='dynamic'>
                        <img src={imgPost} style={{width: "100%", height: "100%"}}/>
                    </div>
                    :
                    <div className='dynamic'>
                    <div className='idoit'>
                     <img src='https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png' style={{width: "100%", height: "100%"}}/>
                     </div>
                     <div style={{textAlign: "center"}}>
                     <div className='ffff'>Add Photos here</div>
                     <button className='butForEdit f4f4' onClick={handlePost}>Select from file</button>
                     <input type="file" accept='image/*' onChange={handlePost} ref={focusPost} style={{display: "none"}}/>
                     </div>
                    </div>
                         }
                         <div className='cappt'>
                             <div className='tt'>
                                 <img src={userData.profilePic} className="imgForSug"/>
                                 <div className='tt' style={{fontWeight: "bold"}}>{userData.username}</div>
                             </div>
                             <div className='capp capps'>
                                 <textarea type="text" placeholder='Write a caption...' value={word} className='capp' maxLength={500} onChange={checkLetter}/>
                            </div>
                            <div className='hello'>
                                 <i className="fa-regular fa-face-smile sms" onClick={Eemoji}></i>
                                 <div> {word.length} / 500</div>
                            </div>
                            {emoji &&  <Picker  onEmojiClick={onEmojiClick} pickerStyle={{height: 400}}/>}
                            <div style={{overflow: "hidden"}}><textarea placeholder='Add location' className='local' onChange={(e) => setLocation(e.target.value)}/></div>
                         </div>
                </div>
            </div>
        </div>
    )
}

export default NewPost
