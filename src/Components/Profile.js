import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import Navbar from './Navbar';
import { CircularProgress  as CP} from '@mui/material';
import Typography from '@mui/material/Typography';
import './Profile.css'
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
import { CardActionArea } from '@mui/material';
import AddComment from './AddComment';
import Like2 from './Like2';
import Comment from './Comment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function Profile() {
    const {id} = useParams();
    console.log(id)
    const [userData,setUserData] = useState(null);
    const [posts,setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };


    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            // console.log(snap.data())
            setUserData(snap.data())
        })
    },[id])

    useEffect(()=>{

        async function fetchData(){
            if(userData!=null){
                let parr=[]
                for(let i=0;i<userData?.postIds?.length;i++){
                    let postData = await database.posts.doc(userData.postIds[i]).get();
                    // console.log(postData)
                    parr.push({...postData.data(),postId:postData.id})
                    console.log(parr)
                }
                setPosts(parr)
               }
        }
        fetchData();
       
    },[userData,posts])

  return (
    <>{
        posts==null || userData==null ?<CP/>:
        <>
            <Navbar userData={userData} />
            <div className='container'>

                <div className='upper-part'>
                    <div className='profile-img'>
                        <img src={userData.profileUrl}></img>
                    </div>
                    <div className='info'>
                    <Typography variant="h5">
                            Name : {userData.fullname}
                        </Typography>
                        <Typography variant="h5">
                            Email : {userData.email}
                        </Typography>
                        <Typography variant="h5">
                            Posts : {userData?.postIds?.length}
                        </Typography>

                    </div>
                </div>
                <hr/>

                <div className='profile-videos'>
                    {
                        posts.map((post,index)=>(
                        
                            <React.Fragment key={index}>
                                <div className='video-profile'>
                                    <video src={post.pUrl} onClick={()=>handleClickOpen(post.pId)}></video>
                                
                                    <Dialog
                                        open={open==post.pId}
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

            </div>
        </>


    }
    </>
  )
}

export default Profile