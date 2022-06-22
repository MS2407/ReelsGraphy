import React,{useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/AuthContext'
import { database } from '../firebase';
import UploadFile from './UploadFile';
import Posts from './Posts';
import '../Components/Feed.css'
import back1 from '../Assets/Back1.png'
import Navbar from '../Components/Navbar'

function Feed() {
  const {logout,user}= useContext(AuthContext);
  const [userData,setUserData] = useState('');

  useEffect(()=>{
    const unsub= database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUserData(snapshot.data())
      // console.log(userData);
      // console.log(user);
    })
    return ()=>{
      unsub()
    }
    
  },[user])

  return (
    <div>
      <Navbar userData={userData}/>
    
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <UploadFile user={userData}/>
        <Posts userData={userData}/>
      </div>
    </div>

  )
}

export default Feed


{/* <div className='header'>
        <h1 className='h1Style'>Welcome To Feed</h1>
           <div className='sub-header'>
               <button onClick={logout} className='logout-cursor'>Logout</button>
              
            </div>
      </div> */}