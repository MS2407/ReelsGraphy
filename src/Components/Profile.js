import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import "./Profile.css";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import Comment from "./Comment";
import Loader from "./Loader";
import LinearProgress from "@mui/material/LinearProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    async function fetchData() {
      if (userData == null) {
        await database.users.doc(id).onSnapshot((snap) => {
          setUserData(snap.data());
        });
      } else if (userData != null && posts == null) {
        let parr = [];
        for (let i = 0; i < userData?.postIds?.length; i++) {
          let postData = await database.posts.doc(userData.postIds[i]).get();

          parr.push({ ...postData.data(), postId: postData.id });
        }
        setPosts(parr);
      }
    }
    fetchData();
  }, [userData, id, posts]);

  return (
    <>
      {userData == null ? (
        <Loader />
      ) : (
        <>
          <Navbar userData={userData} />
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userData.profileUrl} alt="ProfileImg"></img>
              </div>
              <div className="info">
                <Typography variant="h5">Name : {userData.fullname}</Typography>
                <Typography variant="h5">Email : {userData.email}</Typography>
                <Typography variant="h5">
                  Posts :{" "}
                  {userData && userData.postIds ? userData.postIds.length : 0}
                </Typography>
              </div>
            </div>

            {!posts && <LinearProgress color="secondary" />}
            <div className="profile-videos">
              {posts &&
                posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <div className="video-profile">
                      <video
                        src={post.pUrl}
                        onClick={() => handleClickOpen(post.pId)}
                      ></video>

                      <Dialog
                        open={open === post.pId}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                        fullWidth={true}
                        maxWidth="md"
                      >
                        <div className="modal-container">
                          <div className="video-modal">
                            <video
                              src={post.pUrl}
                              className="video-modal-styling"
                              autoPlay={true}
                              muted="muted"
                            ></video>
                          </div>
                          <div className="comment-modal">
                            <Card className="card1">
                              <Comment postData={post} />
                            </Card>
                            <div variant="outlined" className="card2">
                              <Typography
                                style={{
                                  padding: "0.2rem",
                                  fontFamily: "fantasy",
                                  color: "hotpink",
                                  font:"1.5rem",
                                  textAlign:"center"
                                }}
                              >
                                {post.likes.length === 0
                                  ? "Your Post is Liked by Nobody"
                                  : `Your Post is Liked by ${post.likes.length} users`}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </Dialog>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
