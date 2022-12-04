import React from "react";
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
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { forgotPassword } = useContext(AuthContext);
  const handleClick = async () => {
    setError("");
    setLoading(true);
    await forgotPassword(email)
      .then(() => {
        setError("Email Sent Successfully");
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

      <div className="forgotCard">
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
              Send Link
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
};

export default ForgotPassword;
