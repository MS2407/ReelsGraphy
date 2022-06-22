import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import { database, storage } from '../firebase';


function UploadFile(props) {
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);

    // console.log(props);

    const handleClick = async(file)=>{
        if(file==null){
            setError('Please Upload Video first');
            setTimeout(()=>{
                setError('');
            },2000);
            return;
        }
        //bytes to MBs
        if(file.size/(1024*1024) >100){
            setError('Please Upload File less than 100MB');
            setTimeout(()=>{
                setError('');
            },2000);
            return;
        }

        setLoading(true);
        let uid = uuidv4();
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed',fn1,fn2,fn3);
        

        function fn1(snapshot){
            let progress =(snapshot.bytesTransferred/snapshot.totalBytes)*(100.00);
            setError(`Uploading: ${progress}`);
            setTimeout(()=>{
                setError('');
            },4000)
            console.log(`upload is ${progress} done`);
            
        }

        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('');
            },2000)
            setLoading(false);
            return;
        }

        function fn3(){
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    let obj={
                        likes:[],
                        comments:[],
                        pId:uid,
                        pUrl:url,
                        uName: props.user.fullname,
                        uProfile:props.user.profileUrl,
                        userId: props.user.userId,
                        createdAt: database.getTimeStamp()
                    }
                    database.posts.add(obj).then(async(ref)=>{
                        let res= await database.users.doc(props.user.userId).update({
                            postIds : props.user.postIds!=null ? [...props.user.postIds,ref.id] : [ref.id]

                        }).then(()=>{
                            setLoading(false)
                        }).catch((error)=>{
                            setError(error)
                            setTimeout(()=>{
                                setError('')
                            },2000)
                        })



                    })
                  
                }
            )
            setLoading(false);
         
        }



    }

  return (
    <div style={{marginTop:'1%'}}>
        {
            error!=''?<Alert severity="error">{error}</Alert>:
            <>
                <input type="file" accept='video/*' id='upload-input' style={{display:'none'}} onChange={(e)=>handleClick(e.target.files[0])}></input>
                <label htmlFor='upload-input'>
                    <Button component='span' disabled={loading} variant='outlined' color='secondary'>Upload Video</Button>

                </label>
                {loading && <LinearProgress color="secondary" style={{marginTop:'2%'}}/>}
            </>

        }
    </div>
  )
}

export default UploadFile