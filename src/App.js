import "./App.css";
import Signup from "./Components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import Feed from "./Components/Feed";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<Feed />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
