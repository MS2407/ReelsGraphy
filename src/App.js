import logo from './logo.svg';
import './App.css';
import Button from './Components/Button';
import Signup from './Components/Signup'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Login'
import {AuthProvider} from './Context/AuthContext'
import Feed from './Components/Feed'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';

function App() {
  
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/" element={<PrivateRoute><Feed/></PrivateRoute>}/>
        
        
      </Routes>
    </AuthProvider>
   
    </BrowserRouter>
  );
}

export default App;
