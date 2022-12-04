import * as React from "react";
import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import "../Components/Login.css";
import logo from "../Assets/Logo1.png";
import { createUseStyles } from "react-jss";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import BackLeft from "../Assets/BackLeft.png";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const useStyles = createUseStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    text2: {
      textAlign: "center",
      color: "blueviolet",
    },
  });

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleClick = async () => {
    setError("");
    setLoading(true);
    await login(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });

    setTimeout(() => {
      setError("");
    }, 2000);
    setLoading(false);
  };

  return (
    <div className="loginWrapper">
      {error && (
        <Alert
          variant="filled"
          severity="warning"
          style={{ position: "absolute", top: 4 }}
        >
          {error}
        </Alert>
      )}

      <div className="leftPart">
        <img src={BackLeft} alt="leftImg"></img>
      </div>
      <div className="loginCard">
        <Card variant="outlined">
          <div className="card-logo">
            <img src={logo} alt="logoImg"></img>
          </div>
          <CardContent>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography className={classes.text2} variant="subtitle1">
              <Link
                to="/forgot"
                style={{ textDecoration: "none", color: "blue" }}
              >
                {" "}
                Forgot Password?
              </Link>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              fullWidth={true}
              disabled={loading}
              onClick={handleClick}
            >
              login
            </Button>
          </CardActions>

          <Card>
            <Typography className={classes.text1} variant="subtitle1">
              Don't Have an account?{" "}
              <Link
                to="/Signup"
                style={{ textDecoration: "none", color: "blue" }}
              >
                SignUp
              </Link>
            </Typography>
          </Card>
        </Card>
      </div>
      <h3 style={{ position: "absolute", bottom: 0, color: "white" }}>
        ©ReelsGraphy™
      </h3>
    </div>
  );
}
