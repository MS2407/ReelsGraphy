import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Video from "./Video";
import "../Components/Posts.css";
import Avatar from "@mui/material/Avatar";
import Like from "./Like.js";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import ChatIcon from "@mui/icons-material/Chat";
import Typography from "@mui/material/Typography";
import AddComment from "./AddComment";
import Like2 from "./Like2";
import Comment from "./Comment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Posts({ userData }) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const callback = (enteries) => {
    enteries.forEach((entry) => {
      let ele = entry.target.childNodes[0];

      ele
        .play()
        .then(() => {
          if (!ele.paused && !entry.isIntersecting) {
            ele.pause();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  let observer = new IntersectionObserver(callback, { threshold: 0.6 });
  useEffect(() => {
    const elements = document.querySelectorAll(".videos");
    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      //remove all listerners , cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  useEffect(() => {
    if (database.posts) {
      let parr = [];
      database.posts
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          parr = [];
          querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), postId: doc.id };

            parr.push(data);
          });
          setPosts(parr);
        });
    }
  }, []);

  return (
    <React.Fragment>
      {posts == null || userData == null ? (
        <CircularProgress color="secondary" style={{ marginTop: 10 }} />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.pUrl} open={open}></Video>
                <div className="fa">
                  <Avatar src={post.uProfile} alt="User" />
                  <h4>{post.uName}</h4>
                </div>
                <Like userData={userData} postData={post} />
                <ChatIcon
                  className="chat-styling"
                  onClick={() => handleClickOpen(post.pId)}
                />
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
                        loop
                      ></video>
                    </div>
                    <div className="comment-modal">
                      <div className="card1">
                        <Comment postData={post} />
                      </div>
                      <div variant="outlined" className="card2">
                        <Typography
                          style={{
                            padding: "0.2rem",
                            fontFamily: "fantasy",
                            color: "hotpink",
                          }}
                        >
                          {post.likes.length === 0
                            ? "Liked by Nobody"
                            : `Liked by ${post.likes.length} users`}
                        </Typography>
                        <div className="inputContainer">
                          <Like2 userData={userData} postData={post} />
                          <AddComment userData={userData} postData={post} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default Posts;
