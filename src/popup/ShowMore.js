import React from 'react'
import { motion } from 'framer-motion'
import {Link} from "react-router-dom"
import { Context } from '../Context'
import SuggestPeople from '../SuggestPeople'

function ShowMore({show, setShow, sugData}) {
    const variants = {
        initial : {
         scale: 1.2,
        },
        open : {
          scale : 1,
          transition: {duration: 0.2}
        },
        closes : {
          scale : 0,
          transition: {duration: 0.2}
        }
      } 

      const {userData} = React.useContext(Context)


    const mapDada = sugData.map(sugDatas => 
         <SuggestPeople key={sugDatas.userId} sugData={sugDatas}/>
        )

        function scroll() {
          if(show) {
              document.body.style.overflow = "hidden"
          }
      }
  scroll()

    return (
        <div className=' yoyo ms'>
        <motion.div className='followBoxs'
          variants={variants}
          animate={show ? "open" : "closes"}
          initial="initial"
        >
            <div className='heads'>
              <i className="fa-solid fa-angle-left f4 f5" ></i>  
              <div style={{marginLeft: "125px"}}>Suggest people list</div>
              <i className="fa-solid fa-xmark f4" onClick={() => setShow(false)}></i>
            </div>
             {mapDada}
        </motion.div>
        </div>
    )
}

export default ShowMore
