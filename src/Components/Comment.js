import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { database } from '../firebase';



function Comment({postData}) {
    const [comments,setComments] = useState(null)
    // console.log(postData)

    useEffect(()=>{
        async function fetchData(){
            let arr=[]
            for(let i=0;i<postData.comments.length;i++){
                let data = await database.comments.doc(postData.comments[i]).get()
                arr.push(data.data())
            }
            setComments(arr)
            // console.log(arr)

        }
        fetchData()
    },[postData])

  return (
    <div>
        {
            comments==null?<CircularProgress color="secondary" />:
            <>
            {   
                comments.map((comment,index)=>(
                    <div style={{display:'flex',border:'1px solid purple'}} >
                        <Avatar src={comment.uProfileImage} style={{marginTop:'7px',marginLeft:'2px'}}/>
                        <p>&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp;<span>{comment.text}</span></p>
                    </div>
                ))

            }
       
            </>
        
        }
        </div>
    
  )
}

export default Comment