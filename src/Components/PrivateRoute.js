import React, { useContext } from 'react';
import { Route, Outlet, Navigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Feed from './Feed';


const PrivateRoute=() =>{
    const {user}= useContext(AuthContext);
    return user?<Feed/>: <Navigate to="/login" replace/>
}

export default PrivateRoute