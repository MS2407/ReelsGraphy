import React, { useEffect, useState } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import '../Components/Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ChatIcon from '@mui/icons-material/Chat';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import AddComment from './AddComment';
import Like2 from './Like2';
import Comment from './Comment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Posts({userData}) {
    const [posts,setPosts]=useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };


    useEffect(()=>{
        let parr=[];
        const unsub=database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
            parr=[];
            //doc is posts
            querySnapshot.forEach((doc)=>{
                // console.log(doc.data());
                let data= {...doc.data(),postId:doc.id}
                // console.log(doc.id);
                  parr.push(data);
                // console.log(posts);
            })
            setPosts(parr);
            console.log(parr)
        })
        
        return unsub;
    },[])

    const callback = (enteries)=>{
        enteries.forEach((entry)=>{
            let ele = entry.target.childNodes[0];
            // console.log(ele);
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                }
            })
        })


    }

    let observer = new IntersectionObserver(callback,{threshold:0.6});
    useEffect(()=>{
        const elements = document.querySelectorAll(".videos");
        elements.forEach((element)=>{
            observer.observe(element);
        })

        return ()=>{
            observer.disconnect();
            //remove all listerners , cleanup
        }
    },[posts])

  return (
    <React.Fragment>
        {
            posts==null||userData==null? <CircularProgress color="secondary" /> :
                <div className='video-container'>
                    {   
                        posts.map((post,index)=>(
                        
                            <React.Fragment key={index}>
                                <div className='videos' >
                                     <Video src={post.pUrl}></Video>
                                    <div className='fa'>
                                        <Avatar alt="Travis Howard" src={post.uProfile}/>
                                        <h4>{post.uName}</h4>
                                    </div>
                                    <Like userData={userData} postData={post}/>
                                    <ChatIcon className='chat-styling' onClick={()=>handleClickOpen(post.pId)}/>
                                    <Dialog
                                        open={open===post.pId}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                        fullWidth={true}
                                        maxWidth ='md'   
                                    >
                                        <div className='modal-container'>
                                            <div className='video-modal'>
                                                    <video src={post.pUrl} className='video-modal-styling' autoPlay={true} muted="muted" ></video>
                                            </div>
                                            <div className='comment-modal'>
                                                <Card className='card1'>
                                                    <Comment postData={post}/>
                                                </Card >
                                                <Card variant='outlined' className='card2'>
                                                    <Typography style={{padding:'0.2rem',fontWeight:'bold'}}>
                                                    {post.likes.length==0?'Liked by Nobody':`Liked by ${post.likes.length} users`}
                                                    </Typography>
                                                    <div style={{display:'flex'}}>
                                                         <Like2 userData={userData} postData={post}/>
                                                        <AddComment userData={userData} postData={post}/>
                                                    </div>
                                                  
                                                </Card>

                                            </div>
                                        </div>
                        
                                    </Dialog>
                                </div>
                               

                            
                            </React.Fragment>
                        ))
                        
                   }
                   
                   
                </div>
        }
    </React.Fragment>
  )
}

export default Posts