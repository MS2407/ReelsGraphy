import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from "../firebase";

function AddComment({ userData, postData }) {
  const [text, setText] = useState("");

  const handleClick = () => {
    if (text === "") {
      return;
    }

    let obj = {
      text: text,
      uProfileImage: userData.profileUrl,
      uName: userData.fullname,
      uId: userData.userId,
    };

    database.comments.add(obj).then((doc) => {
      database.posts.doc(postData.postId).update({
        comments: [...postData.comments, doc.id],
      });
    });
    setText("");
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <TextField
        id="outlined-basic"
        size="small"
        label="Add Comment..."
        sx={{ width: "60%" }}
        variant="filled"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        style={{ marginRight: 10 }}
      >
        Comment
      </Button>
    </div>
  );
}

export default AddComment;
