import * as React from 'react';
import { useState,useEffect,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Link } from '@mui/material';
import '../Components/Signup.css'
import logo from '../Assets/Logo1.png'
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { width } from '@mui/system';
import { Link as Link1,useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { async } from '@firebase/util';
import { database, storage } from '../firebase';
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function MultiActionAreaCard() {

    const useStyles= createUseStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        }
       
    });

    const classes = useStyles();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const {signup} = useContext(AuthContext);


    const handleClick = async()=>{
        if(file == null){
            setError("Please upload Profile Image First");
            setTimeout(()=>{
                setError('');
            },2000)
            return;
        }
        try{
            setLoading(true);
            setError('');
            let userObj = await signup(email,password);
            let uid = userObj.user.uid;
            // console.log(uid);

            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
             uploadTask.on('state_changed',fn1,fn2,fn3);
        

        function fn1(snapshot){
            let progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
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
            uploadTask.snapshot.ref.getDownloadURL().then(
                (url)=>{
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl:url,
                        postIds:null,
                        createdAt:database.getTimeStamp()
                    })
                }
            )
            setLoading(false);
            navigate('/');
        }


        }
        catch(err){
            setError(err);
            setTimeout(()=>{
                setError('');
            },2000)

        }
    }


  return (
      <div className='signupWrapper'>
          <div className='bgImg'>
              <div className='moveImg'>
                  <Carousel width={240} showStatus={false} interval={2000} autoPlay={true} showIndicators={false} infiniteLoop={true} showThumbs={false} showArrows={false} > 
                        <img src={img1}></img>
                        <img src={img2}></img>
                        <img src={img3}></img>
                        <img src={img4}></img>
                  </Carousel>

              </div>
          </div>
          <div className='signupCard'>
                <Card  variant="outlined">
                        <div className='card-logo'>
                        <img src={logo}></img>
                        </div>
                        <CardContent>
                            <Typography className={classes.text1} variant='subtitle1'>
                                Sign up to see photos and videos from your friends
                            </Typography>
                            {error!=='' && <Alert severity="error">{error}</Alert>}
                            <TextField id="outlined-basic 1" label="Email" variant="outlined" margin='dense' size='small' fullWidth={true} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField id="outlined-basic 2" label="Password" variant="outlined" margin='dense' size='small' fullWidth={true} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <TextField id="outlined-basic 3" label="Full Name" variant="outlined" margin='dense' size='small' fullWidth={true} value={name} onChange={(e)=>setName(e.target.value)}/>
                            <Button size="small" color="secondary" fullWidth={true} component='label' variant='outlined'>
                                Upload Profile Image
                                <input type="file" accept='image/*' hidden onChange={(e)=>setFile(e.target.files[0])}></input>
                                {/* <input type="file" accept='image/*' onChange={(e)=>setFile(e.target.files[0])}></input> */}

                            </Button>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" variant='contained' fullWidth={true} disabled={loading} onClick={handleClick}>
                            Signup
                            </Button>
                        </CardActions>
                        <CardContent>
                            <Typography className={classes.text1} variant='subtitle1' fullWidth={true}>
                                By Signing up , You agree to our Terms, Conditions and Cookies Policy.
                            </Typography>
                        </CardContent>

                        <Card>
                            <Typography className={classes.text1} variant='subtitle1'>
                                Have an account? <Link1 to="/login" style={{textDecoration:'none'}}>LogIn</Link1>
                            </Typography>
                        </Card>
            </Card>
          </div>
      </div>
   
  );
}
