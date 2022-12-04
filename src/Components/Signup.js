import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Button, CardActions } from "@mui/material";
import "../Components/Signup.css";
import logo from "../Assets/Logo1.png";
import { createUseStyles } from "react-jss";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { database, storage } from "../firebase";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LinearProgress from "@mui/material/LinearProgress";

export default function MultiActionAreaCard() {
  const useStyles = createUseStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (file === "") {
      setError("Please upload Profile Image First");
      setTimeout(() => {
        setError("");
      }, 2000);

      return;
    }

    setLoading(true);
    setError("");
    await signup(email, password)
      .then((userObj) => {
        let uid = userObj.user.uid;
        const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (uploadError) => {
            setError(uploadError);
          },
          () => {
            //Upload Succesfull
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              database.users.doc(uid).set({
                email: email,
                userId: uid,
                fullname: name,
                profileUrl: url,
                postIds: null,
                createdAt: database.getTimeStamp(),
              });
            });
            setLoading(false);
            navigate(`/profile/${uid}`);
          }
        );
      })
      .catch((error) => {
        setError(error.message);
      });

    setInterval(() => {
      setError("");
    }, 3000);
  };

  return (
    <div className="signupWrapper">
      {error && (
        <Alert
          variant="filled"
          severity="warning"
          style={{ position: "absolute", top: 4 }}
        >
          {error}
        </Alert>
      )}

      {loading && (
        <div style={{ width: 100, position: "absolute" }}>
          <LinearProgress color="secondary" />
        </div>
      )}
      <div className="leftPortion">
        <div className="bgImg">
          <div className="moveImg">
            <Carousel
              width={240}
              showStatus={false}
              interval={1000}
              autoPlay={true}
              showIndicators={false}
              infiniteLoop={true}
              showThumbs={false}
              showArrows={false}
              stopOnHover={false}
            >
              <img src={img1} alt="Img"></img>
              <img src={img2} alt="Img"></img>
              <img src={img3} alt="Img"></img>
              <img src={img4} alt="Img"></img>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="signupCard">
        <Card variant="outlined">
          <div className="card-logo">
            <img src={logo} alt="Logo"></img>
          </div>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Sign up to see photos and videos from your friends
            </Typography>

            <TextField
              id="outlined-basic 1"
              label="Email"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic 2"
              label="Password"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic 3"
              label="Full Name"
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              size="small"
              color="secondary"
              fullWidth={true}
              component="label"
              variant="outlined"
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </Button>
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
              Signup
            </Button>
          </CardActions>
          <CardContent>
            <Typography
              className={classes.text1}
              variant="subtitle1"
              fullWidth={true}
            >
              By Signing up,You agree to our Terms,Conditions and Cookies
              Policy.
            </Typography>
          </CardContent>

          <Card>
            <Typography className={classes.text1} variant="subtitle1">
              Have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "blue" }}
              >
                LogIn
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
