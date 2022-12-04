import React from 'react';
import Navbar from './Navbar';
import "./Loader.css";
import LinearProgress from '@mui/material/LinearProgress';

const Loader = () => {
  return (
    <div>
        <Navbar/>
        <div className='loader'>
        <LinearProgress color="secondary" />
        <h3>Please Wait...</h3>
        </div>
    </div>
  )
}

export default Loader