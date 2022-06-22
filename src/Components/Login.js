import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Link } from '@mui/material';
import '../Components/Login.css'
import logo from '../Assets/Logo1.png'
import { createUseStyles } from 'react-jss';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { width } from '@mui/system';
import { Link as Link2, useNavigate } from 'react-router-dom'
import BackLeft from '../Assets/BackLeft.png'
import { AuthContext } from '../Context/AuthContext';
import { async } from '@firebase/util';
import { useNavigate as useNavigate1 } from 'react-router-dom';


export default function Login() {
    const store=useContext(AuthContext);
    // console.log(store);

    const useStyles= createUseStyles({
        text1:{
            color:'grey',
            textAlign:'center'
        },
        text2:{
            textAlign:'center',
            color:'blueviolet'
        }
    });

    const classes = useStyles();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate1();
    const {login} = useContext(AuthContext);

    const handleClick = async()=>{
        try{
            setError('');
            setLoading(true);
            let res = await login(email,password);
            setLoading(false);
            navigate('/')

        }
        catch(error){
            setError(error);
            setTimeout(
                setError('')
            ,2000);
            setLoading(false);

        }

    }



  return (
      <div className='loginWrapper'>
          <div className='leftPart'>
            <img src={BackLeft}></img>
          </div>
          {/* <img src={BackLeft}></img> */}
         
          <div className='loginCard'>
                <Card  variant="outlined">
                        <div className='card-logo'>
                        <img src={logo}></img>
                        </div>
                        <CardContent>
                           
                            {error!=='' && <Alert severity="error">{error}</Alert>}
                            <TextField id="outlined-basic" label="Email" variant="outlined" margin='dense' size='small' fullWidth={true} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <TextField id="outlined-basic" label="Password" variant="outlined" margin='dense' size='small' fullWidth={true} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <Typography className={classes.text2} variant='subtitle1'>
                                Forgot Password? <Link to="/Signup" style={{textDecoration:'none'}}></Link>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" variant='contained' fullWidth={true} disabled={loading} onClick={handleClick}>
                            login
                            </Button>
                        </CardActions>
                

                        <Card>
                            <Typography className={classes.text1} variant='subtitle1'>
                                Don't Have an account? <Link2 to="/Signup" style={{textDecoration:'none'}}>SignUp</Link2>
                            </Typography>
                        </Card>
            </Card>
          </div>
      </div>


   
  );
}
